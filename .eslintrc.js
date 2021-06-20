//https://www.npmjs.com/package/eslint-config-o2team-wx
module.exports = {
    'extends': 'o2team-wx',
    'plugins': [
        'html',
        'import'
    ],
    'settings': {
        'html/html-extensions': ['.wxml']
    },
    'rules': {
        'indent': ['error', 4, { SwitchCase: 1 }],
        'semi': 'off',
        'camelcase': ['off', { properties: 'never' }],

        // 强制使用ES6 module
        'import/no-commonjs': 'error',
        'import/no-amd': 'error',

        // 不能直接使用以下 api
        'no-restricted-properties': [2, {
            'object': 'wx',
            'property': 'navigateTo',
            'message': 'Please use this.$goto!!!'
        }],
        'no-restricted-syntax': [
            'error', {
                selector: 'CallExpression[callee.name=/(create|set)Timeout/]',
                message: 'Please use this.$setTimeout instead. see the link: https://xxx.com'
            },
        ],
        'no-debugger': 0
    },
}
