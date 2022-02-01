import { createStore } from 'vuex'
import Auth from './auth'

const store = createStore({
  modules: {
    Auth
  },
  state () {
    return {
      cards: [
        { id: 1 }
      ]
    }
  },
  getters: {

  },
  actions: {

  },
  mutations: {
      
  }
})

export default store
