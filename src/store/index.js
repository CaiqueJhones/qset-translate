import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import judge from './judge'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    judge
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV
})
