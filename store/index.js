import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import menu from './modules/menu'

Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    modules: {
      auth,
      menu,
    },
  })

export default store
