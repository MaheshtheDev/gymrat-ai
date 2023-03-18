module.exports = {
  root: true,
  env: {
    es6: true,
    jest: true,
  },
  plugins: ['@typescript-eslint', 'react-native', 'prettier', 'import'],
  parser: '@typescript-eslint/parser',
  extends: [
    '@react-native-community',
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
    'import/internal-regex': '^@components/|^@context/|',
    'import/internal-module-folders': ['@components'],
  },
  rules: {
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    semi: ['error', 'never'],
    'jsx-quotes': [2, 'prefer-single'],
    'react-native/no-inline-styles': 0,
    'prettier/prettier': 0,
    'react-hooks/exhaustive-deps': 0,
    'no-extra-semi': 0,
    'import/no-unresolved': [0, { commonjs: true, amd: true }],
    'import/namespace': 0,
    'import/default': 0,
    'import/export': 0,
    'no-undef': 'off',
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling']],
        pathGroups: [
          {
            pattern: 'react+(|-native)*',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@*/react-native*',
            group: 'builtin',
          },
          {
            pattern: '@react-native-community/*',
            group: 'builtin',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
  },
  // overrides: [
  //   {
  //     files: ['*.ts', '*.tsx'],
  //     rules: {
  //       '@typescript-eslint/explicit-function-return-type': ['error'],
  //     },
  //   },
  // ],
}
