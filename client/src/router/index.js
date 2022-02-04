import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      ensureAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      ensureGuest: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
      ensureGuest: true
    }
  },
  {
    path: '/dashboard/user/:id',
    name: 'User',
    component: () => import('../views/User.vue'),
    props: true,
    meta: {
      ensureAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.ensureAuth)) {
    if (!store.getters.isLoggedIn) {
      next('/login')
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.ensureGuest)) {
    if (store.getters.isLoggedIn) {
      next('/dashboard')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router