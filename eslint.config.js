import js from '@eslint/js';

export default [
  js.configs.recommended, // Recommended JavaScript rules
  {
    files: ['src/**/*.js'], // Apply to JavaScript files in the src/ directory
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module', // ESM syntax
    },
    rules: {
      'semi': ['error', 'always'], // Enforce semicolons
      'quotes': ['error', 'single'], // Enforce single quotes
      'no-unused-vars': ['warn'], // Warn about unused variables
    },
  },
];
