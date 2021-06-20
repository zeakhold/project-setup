const meow = require('meow')
const execa = require('execa')
const consola = require('consola')
const pick = require('lodash/pick')
const merge = require('lodash/merge')
const read = require('@commitlint/read')
const lint = require('@commitlint/lint')
const { hasPkgProp, hasFile } = require('about-this-app')
const CommitLintConfig = require('../../.commitlintrc')

const configuration = {
    string: ['cwd', 'edit', 'config'],
    alias: {
        d: 'cwd',
        e: 'edit',
        g: 'config'
    },
    description: {
        cwd: 'directory to execute in',
        config: 'path to the config file',
        edit:
            'read last commit message from the specified file or fallbacks to ./.git/COMMIT_EDITMSG'
    },
    default: {
        cwd: process.cwd(),
        config: null,
        edit: false
    }
}

const cli = meow({}, configuration)

main(cli).catch(err => {
    throw err
})

function main (options) {
    return new Promise((resolve, reject) => {
        const flags = normalizeFlags(options.flags)
        const range = pick(flags, 'edit')

        return Promise.resolve(read(range, { cwd: flags.cwd })).then(input => {
            const messages = (Array.isArray(input) ? input : [input])
                .filter(function (message) {
                    return typeof message === 'string'
                })
                .filter(Boolean)
            const message = (messages.length && messages[0]) || ''

            commitlint(message)
                .then(() => {
                    customLint()
                })
        })
    })
}

function customLint () {
    const useBuiltinConfig =
        !hasFile('.lintstagedrc') &&
        !hasFile('lint-staged.config.js') &&
        !hasPkgProp('lint-staged')
    const args = useBuiltinConfig
        ? ['-c', require.resolve('../lint-staged.config')]
        : []

    execa
        .shell('lint-staged', args)
        .catch(({ stdout, stderr }) => {
            consola.fatal(stdout)
            consola.error(stderr)
            process.exit(1)
        })
}