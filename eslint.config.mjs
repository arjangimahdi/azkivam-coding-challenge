import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  plugins: {
    prettier: require('eslint-plugin-prettier'),
  },
  rules: {
    'prettier/prettier': 'error',
  },
})
