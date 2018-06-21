module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    // https://standardjs.com/readme-zhcn.html
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'vuefix',
        // 'html'
    ],
    // add your custom rules here
    'rules': {
        'no-undef':0,
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2: 0
    }
}