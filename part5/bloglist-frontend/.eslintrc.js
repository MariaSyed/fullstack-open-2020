module.exports = {
  env: {
    browser: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
     "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
  },
  parser: 'babel-eslint'
};
