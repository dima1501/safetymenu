<template lang="pug">
  v-app
    Nuxt

</template>

<script>
export default {
  components: {},
  layout: 'default',

  data() {
    return {}
  },
  mounted() {
    this.$store.dispatch('auth/checkAuth')
  },
}
</script>

<style lang="scss">
body {
  font-family: 'Roboto', sans-serif;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px #fff inset !important;
}
</style>
