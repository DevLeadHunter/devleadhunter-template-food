/** @type {import('prettier').Config} */
export default {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  endOfLine: 'auto',
  printWidth: 100,
  tabWidth: 2,
  singleAttributePerLine: true,
  bracketSameLine: true,
  plugins: ['prettier-plugin-tailwindcss'],
}
