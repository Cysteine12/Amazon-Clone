import { createStore } from 'vuex'
import Auth from './auth'
import Product from './product'
import Category from './category'

export default createStore({
  state() {
    return {
      
    }
  },
  mutations: {

  },
  actions: {

  },
  modules: {
    Auth,
    Product,
    Category
  }
})