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
        'newline-per-chained-call': 'off',
        'eqeqeq': 'off',
        'indent': ['error', 4, { SwitchCase: 1 }],
        'prefer-rest-params': 'off',
        'prefer-template': 'off',
        'no-else-return': 'off',
        'no-nested-ternary': 'off',
        'brace-style': 'off',
        'semi': 'off',
        'camelcase': ['off', { properties: 'never' }], // ESLint 配置问题，暂时不强制所有变量名都用驼峰式命名
        'array-callback-return': 'off', // 暂时关闭
        'prefer-const': 'warn',
        'no-mixed-operators': 'off',
        'callback-return': 'warn',
        'class-methods-use-this': 'warn',

        // 强制使用ES6 module，便于treeshaking
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
                message: 'Please use this.$setTimeout instead. see the link: https://cf.jd.com/pages/viewpage.action?pageId=219096628'
            },
        ],
        'no-debugger': 0
    },
}