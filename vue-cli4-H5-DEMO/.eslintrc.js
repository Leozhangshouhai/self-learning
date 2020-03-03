module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': 0,
    'consistent-return': 0,
    'global-require': 0,
    'prefer-rest-params': 0,
    'object-shorthand': 0, // 强制对象字面量缩写语法
    'object-curly-spacing': 0, // 对象开始必须空格
    'space-before-blocks': 0, // 代码块开始必须空格
    'no-unused-vars': [2, {
      // 允许声明未使用变量
      'vars': 'local',
      // 参数不检查
      'args': 'none',
    }],
    'linebreak-style': 0,
    'import/no-unresolved': 0, // 使用alias
    'import/extensions': 0, // 使用alias时，禁用检查引入文件类型
    'import/prefer-default-export': 0,
    'semi': [0], // 关闭语句强制分号结尾
    'no-control-regex': 0, // 禁止在正则表达式中使用控制字符
    'no-useless-escape': 0, // 禁用不必要的转义字符
    'no-trailing-spaces': 0, // 一行结束后面不要有空格
    'no-extend-native': 0, // 禁止扩展native对象
    'prefer-arrow-callback': 0, // 要求使用箭头函数作为回调
    'no-underscore-dangle': 0, // 禁止标识符中有悬空下划线_bar
    'no-bitwise': 0, // 禁止使用按位预算符
    'no-unused-expressions': 0, // 禁止无用的表达式
    'no-redeclare': 0, // 禁止重复声明变量
    'no-shadow': 0, // 外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
    'no-mixed-operators': 0,
    'no-undef': 0, // 不能有未定义的变量
    'no-case-declarations': 0,
    'no-restricted-syntax': 0, // 遍历对象
    'function-paren-newline': 0, // 方法前后{}
    'prefer-destructuring': 0, // 优先使用对象结构
    'no-sequences': 0, // 禁止使用逗号运算符
    'quote-props': 0, // 对象字面量中的属性名是否强制双引号
    'object-curly-newline': 0,
    'space-in-parens': 0,
    'import/no-extraneous-dependencies': 0,
    'no-inner-declarations': 0,
    'comma-dangle': 0,
    'arrow-parens': 0
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
