import { createStore } from 'vuex'
import Auth from './modules/auth'
import Product from './modules/product'
import Category from './modules/category'
import Owner from './modules/owner'

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
    Category,
    Owner
  }
})