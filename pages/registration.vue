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
          @submit.prevent="fetchCompanyRegistration"
          v-model="isCompanyRegistrationValid")
          v-card-text
            v-text-field(
              ref="name"
              v-model="registrationData.name"
              :rules="nameRules"
              label="Название компании (латинскими символами)"
              required)
            v-text-field(
              ref="email"
              v-model="registrationData.email"
              :rules="emailRules"
              label="E-mail")
            v-text-field(
              v-model="registrationData.password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRules"
              :type="showPassword ? 'text' : 'password'"
              label="Пароль"
              @click:append="showPassword = !showPassword")
          v-divider(class="mt-12")
          v-card-actions
            v-btn(
              text
              to="/login"
            ) Войти
            v-spacer
            v-btn(
              color="primary"
              :disabled="!isCompanyRegistrationValid"
              text
              type="submit"
            ) Создать аккаунт

</template>

<script>
export default {
  data() {
    return {
      isCompanyRegistrationValid: true,
      showPassword: false,
      registrationData: {
        name: '',
        password: '',
        email: '',
        goods: [],
      },
      nameRules: [
        (v) => !!v || 'Введите название компании',
        (v) => !v || /^[a-zA-Z]+$/.test(v) || 'Введите латиницей',
      ],
      emailRules: [
        (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'Введите корректный E-mail',
      ],
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
    }
  },
  methods: {
    fetchCompanyRegistration() {
      this.$store.dispatch('auth/registrationAction', this.registrationData)
    },
  },
}
</script>
