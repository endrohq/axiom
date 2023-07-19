module.exports = {
  extends: [
    `@hallarhq/eslint-config`,
    'plugin:@next/next/recommended',
    // 'plugin:@typescript-eslint/recommended', TODO: these rules provide stricter linting for the application and should be activated at some point
    // 'plugin:@typescript-eslint/eslint-recommended',
  ],
  plugins: ['tailwindcss', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['**/*.cy.ts'],
  settings: {
    react: {
      version: `detect`,
    },
  },
  overrides: [
    {
      files: ['*.tsx', '*.ts'],
      rules: {
        'no-undef': 'off',
        'tailwindcss/classnames-order': 'warn',
        'tailwindcss/enforces-negative-arbitrary-values': 'warn',
        'tailwindcss/enforces-shorthand': 'warn',
        'tailwindcss/migration-from-tailwind-2': 'warn',
        'tailwindcss/no-arbitrary-value': 'off',
        'tailwindcss/no-custom-classname': 'off',
        'tailwindcss/no-contradicting-classname': 'error',
        '@typescript-eslint/naming-convention': 'off',
      },
    },
  ],
};
