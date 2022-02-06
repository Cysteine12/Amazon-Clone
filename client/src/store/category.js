import axios from 'axios'

const state = () => ({
    categories: [],
    status: '',
    error: ''
})

const getters = {
    getCategoryState: state => state.status,
    categories: state => state.categories,
    error: state => state.error
}

const actions = {
    async getCategories({ commit }) {
        commit('categories_request')
        try {
            const res = await axios.get(`http://localhost:5000/api/category`)
            if (res.data.success) {

                commit('categories_success', res.data.data)
                return {
                    success: res.data.success,
                    data: res.data.data
                }
            } else {
                commit('categories_error', res.data.err)
                return {
                    err: res.data.err
                }
            }
        } catch (err) {
            commit('categories_error', err)
            return {
                err: err
            }
        }
    },    
    async postCategories({ commit }, formData) {
        commit('post_category_request')
        try {
            const res = await axios.post(`http://localhost:5000/api/category`, formData)
            if (res.data.success) {
                
                commit('post_category_success', res.data.msg)

                return {
                    success: res.data.success,
                    msg: res.data.msg,
                    categoryId: res.data.data._id
                }
            } else {
                commit('post_category_error', res.data.err)
                return {
                    err: res.data.err
                }
            }
        } catch (err) {
            commit('post_category_error', err)
            return {
                err: err
            }
        }
    },
    async getCategory({ commit }, categoryId) {
        commit('category_request')
        try {
            const res = await axios.get(`http://localhost:5000/api/category/${categoryId}`)
            if (res.data.success) {
                
                commit('category_success', res.data.data)
                return {
                    success: res.data.success,
                    data: res.data.data
                }
            } else {
                commit('category_error', res.data.err)
                return {
                    err: res.data.err
                }
            }
        } catch (err) {
            commit('category_error', err)
            return {
                err: err
            }
        }
    }
}

const mutations = {
    categories_request(state) {
        state.status = 'loading..'
    },
    categories_success(state, categories) {
        state.status = '',
        state.categories = categories
    },
    categories_error(state, err) {
        state.status = 'Please reload the page!',
        state.error = err
    },
    post_category_request(state) {
        state.status = 'loading..'
    },
    post_category_success(state, msg) {
        state.status = msg
    },
    post_category_error(state, err) {
        state.status = 'Category upload failed, Try again!',
        state.error = err
    },
    category_request(state) {
        state.status = 'loading..'
    },
    category_success(state, category) {
        state.status = '',
        state.categories = category
    },
    category_error(state, err) {
        state.status = 'Please reload the page!',
        state.error = err
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}