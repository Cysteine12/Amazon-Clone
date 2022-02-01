import { createApp } from 'vue'
import Vuex from 'vuex'
import Auth from './auth'

const app = createApp({})
app.use(Vuex)

export default new Vuex.Store({
  modules: {
    Auth
  },
  state: {
    cards: [
      { id: 1 }
    ]
  },
  getters: {

  },
  actions: {

  },
  mutations: {
      
  }
})

