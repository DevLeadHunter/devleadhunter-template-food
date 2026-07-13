// @ts-check
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginJSDoc from 'eslint-plugin-jsdoc'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports'
import eslintPluginTypeScript from '@typescript-eslint/eslint-plugin'
import withNuxt from './.playground/.nuxt/eslint.config.mjs'

/** @type {import('eslint').ESLint.Plugin} */
// @ts-expect-error -- typings mismatch between TS-ESLint and ESLint flat plugin type
const typeScriptPlugin = eslintPluginTypeScript

export default withNuxt(
  eslintPluginJSDoc.configs['flat/recommended'],
  {
    plugins: {
      'unused-imports': eslintPluginUnusedImports,
      prettier: eslintPluginPrettier,
      '@typescript-eslint': typeScriptPlugin,
    },
    rules: {
      'no-var': 'off',
      'import/first': 'off',
      'vue/valid-v-on': 'off',
      'vue/return-in-computed-property': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/typedef': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/unified-signatures': 'off',
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'vue/no-multiple-template-root': 'off',
      'vue/no-v-html': 'off',
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        { registeredComponentsOnly: false },
      ],
      'prettier/prettier': 'error',
      'jsdoc/require-jsdoc': 'off',
      // We follow the descriptive-JSDoc standard (`@param name - desc`, `@returns desc`),
      // not brace-typed tags (redundant in a strict-TS project).
      'jsdoc/require-param-type': 'off',
      'jsdoc/require-returns-type': 'off',
      'jsdoc/require-returns-check': 'off',
    },
  },
  {
    files: ['**/*.vue'],
    rules: {
      'jsdoc/require-jsdoc': 'off',
    },
  },
  eslintConfigPrettier,
)
