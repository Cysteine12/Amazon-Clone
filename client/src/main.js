import Vue from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$http = axios

const token = localStorage.getItem("token")
if (token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.createApp(App).use(router).mount('#app')