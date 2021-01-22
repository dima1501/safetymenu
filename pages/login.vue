<template lang="pug">
  v-row(class="justify-center")
    v-col(
      cols="12"
      sm="10"
      md="8"
      lg="3")
      v-card(
        theme--light
        class="mt-15")
        v-form(
          @submit.prevent="fetchCompanyLogin"
          v-model="isCompanyLoginValid"
        )
          v-card-text
            v-text-field(
              ref="name"
              v-model="loginData.email"
              :rules="emailRules"
              label="E-mail"
              type="email"
              required)
            v-text-field(
              v-model="loginData.password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRules"
              :type="showPassword ? 'text' : 'password'"
              name="input-10-1"
              label="Пароль от личного кабинета"
              @click:append="showPassword = !showPassword")
          v-divider(class="mt-12")
          v-card-actions
            v-btn(
              text
              to="/registration"
            ) Создать аккаунт
            v-spacer
            v-btn(
              color="primary"
              text
              :disabled="!isCompanyLoginValid"
              type="submit"
            ) Войти

</template>

<script>
export default {
  data() {
    return {
      isCompanyLoginValid: true,
      email: '',
      password: '',
      loginData: {
        email: '',
        password: '',
      },
      showPassword: false,
      passwordRules: [
        (v) => !!v || 'Обязательное поле',
        (v) =>
          (v && v.length >= 5) || 'Пароль должен содержать более 5 символов',
        (v) =>
          /(?=.*[A-Z])/.test(v) ||
          'Пароль должен содержать хотя бы один символ в верхнем регистре',
        (v) =>
          /(?=.*\d)/.test(v) ||
          'Пароль должен содержать как минимум одну цифру',
      ],
      emailRules: [
        (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'Введите корректный E-mail',
      ],
    }
  },
  methods: {
    fetchCompanyLogin() {
      this.$store.dispatch('auth/loginAction', this.loginData)
    },
  },
}
</script>
