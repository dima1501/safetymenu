const axios = require('axios').default

const checkAuth = async (store, data) => {
  try {
    const user = await axios({
      method: 'post',
      url: '/checkauth',
      data,
    })
    if (user.data) {
      store.state.user = user.data
    }
  } catch (err) {
    console.error(err)
  }
}

const registrationAction = async (store, data) => {
  try {
    const registration = await axios({
      method: 'post',
      url: '/registration',
      data,
    })

    if (registration.data) {
      store.state.user = registration.data
      // eslint-disable-next-line no-undef
      $nuxt.$router.push({ path: `/lk` })
    } else {
      alert('Пользователь с таким e-mail уже зарегистрирован')
    }
  } catch (error) {
    console.error(error)
  }
}

const loginAction = async (store, data) => {
  try {
    const login = await axios({
      method: 'post',
      url: '/login',
      data,
    })

    if (login.data) {
      store.state.user = login.data
      // eslint-disable-next-line no-undef
      $nuxt.$router.push({ path: `/lk` })
    }
  } catch (error) {
    console.error(error)
  }
}

export default {
  registrationAction,
  checkAuth,
  loginAction,
}
