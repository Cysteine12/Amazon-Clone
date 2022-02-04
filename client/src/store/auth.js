import axios from 'axios'
import router from '../router'

const state = {
    token: localStorage.getItem('token') || '',
    user: {},
    status: '',
    error: ''
}

const getters = {
    isLoggedIn : state => !!state.token,
    authState: state => state.status,
    user: state => state.user
}

const actions = {
    async login({ commit }, formData) {
        commit('auth_request')
        try {
            const res = await axios.post(`http://localhost:5000/api/auth/login`, formData)
            if (res.data.success) {
                const token = res.data.token
                const user = res.data.user
                const msg = res.data.msg
                
                // Store token in localStorage
                localStorage.setItem('token', token)
                // Set axios defaults
                axios.defaults.headers.common['Authorization'] = token
                commit('auth_success', msg, token, user)

                return {
                    success: res.data.success,
                    msg: res.data.msg
                }
            } else {
                commit('auth_error', err)
                return {
                    err: res.data.err
                }
            }
        } catch (err) {
            commit('auth_error', err)
            return {
                err: err
            }
        }
    },
    async register({ commit }, formData) {
        commit('register_request')
        try {
            const res = await axios.post(`http://localhost:5000/api/auth/register`, formData)
            if (res.data.success) {
                const msg = res.data.msg
                
                commit('register_success', msg)

                return {
                    success: res.data.success,
                    msg: res.data.msg
                }
            } else {
                commit('register_error', err)
                return {
                    err: res.data.err
                }
            }
        } catch (err) {
            commit('register_error', err)
            return {
                err: err
            }
        }
    },
    async getProfile({ commit }) {
        commit('profile_request')
        const res = await axios.get(`http://localhost:5000/api/auth/profile`)
        commit('profile_success', res.data.user)
        return res.data
    },
    async logout({ commit }) {
        localStorage.removeItem('token')
        commit('logout')
        delete axios.defaults.headers.common['Authorization']
        router.push('/login')
        return
    }
}

const mutations = {
    auth_request(state) {
        state.status = 'loading..'
    },
    auth_success(state, msg, token, user) {
        state.status = msg,
        state.token = token,
        state.user = user
    },
    auth_error(state, err) {
        state.status = 'Authentication failed, Try again',
        state.error = err
    },
    register_request(state) {
        state.status = 'loading..'
    },
    register_success(state, msg) {
        state.status = msg
    },
    register_error(state, err) {
        state.status = 'Account registration failed, Try again',
        state.error = err
    },
    profile_request(state) {
        state.status = 'loading..'
    },
    profile_success(state, user) {
        state.user = user
    },
    logout(state) {
        state.status = ''
        state.token = ''
        state.user = ''
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}