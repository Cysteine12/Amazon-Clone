import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import store from './store'
import axios from 'axios'

const app = createApp({})

app.config.productionTip = false

app.config.globalProperties.$http = axios

const token = localStorage.getItem("token")
if (token) {
    app.config.globalProperties.$http.defaults.headers.common['Authorization'] = token
}

createApp(App).use(router).mount('#app')