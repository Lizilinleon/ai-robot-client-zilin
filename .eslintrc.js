module.exports = {
  env: {
    node: true,
    commonjs: true,
    browser: true,
    es6: true,
  },
  extends: [
    '@react-native',
    'eslint:recommended',
    'plugin:react/recommended', //使用eslint-plugin-react的推荐规则
    'prettier',
    // 'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warning' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warning' : 'off',
    'prefer-destructuring': 0,
    //要求使用 Error 对象作为 Promise 拒绝的原因
    'prefer-promise-reject-errors': 0,
    //else之前不允许有return
    'no-else-return': 0,
    'import/no-extraneous-dependencies': 0,
    // 'import/no-unresolved': [2, {ignore: ['^@/']}],
    'react/jsx-props-no-spreading': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/prop-types': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-indent': 0,
    // 'react/jsx-wrap-multilines': [
    //     'error',
    //     {
    //         declaration: false,
    //         assignment: false,
    //     },
    // ],
    'react/jsx-wrap-multilines': 0, // 缺少多行JSX周围的括号
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.tsx', '.ts'],
      },
    ],
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-has-content': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/anchor-is-valid': 0,
    //对象中的尾逗号
    // 'comma-dangle': ['error', 'always-multiline'],
    //解决“import React from 'react';”会报错问题
    'no-use-before-define': 0,
    'prefer-const': 'off', // 使用const而不是let永远不会被重新分配;
    'react/display-name': 'off', // react-forwardRefs displayName报错屏蔽
    'no-empty': 0, // 空的代码块
    // 每个小方法都要写hook太烦了，可以禁止这些
    'react-hooks/rules-of-hooks': 'off',
    'react-hooks/exhaustive-deps': 'off',
  },
};
