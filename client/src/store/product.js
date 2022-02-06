import axios from 'axios'

const state = () => ({
    products: [],
    status: '',
    error: ''
})

const getters = {
    getProductState: state => state.status,
    products: state => state.products,
    error: state => state.error
}

const actions = {
    async getProducts({ commit }, categoryId) {
        commit('products_request')
        try {
            const res = await axios.get(`http://localhost:5000/api/product/category/${categoryId}`)
            if (res.data.success) {

                commit('products_success', res.data.data)
                return {
                    success: res.data.success,
                    data: res.data.data
                }
            } else {
                commit('products_error', res.data.err)
                return {
                    err: res.data.err
                }
            }
        } catch (err) {
            commit('products_error', err)
            return {
                err: err
            }
        }
    },    
    async postProduct({ commit }, formData) {
        commit('post_product_request')
        try {
            const res = await axios.post(`http://localhost:5000/api/product`, formData)
            if (res.data.success) {
                
                commit('post_product_success', res.data.msg)

                return {
                    success: res.data.success,
                    msg: res.data.msg,
                    productId: res.data.data._id
                }
            } else {
                commit('post_product_error', res.data.err)
                return {
                    err: res.data.err
                }
            }
        } catch (err) {
            commit('post_product_error', err)
            return {
                err: err
            }
        }
    },
    async getProduct({ commit }, productId) {
        commit('product_request')
        try {
            const res = await axios.get(`http://localhost:5000/api/product/${productId}`)
            if (res.data.success) {
                
                commit('product_success', res.data.data)
                return {
                    success: res.data.success,
                    data: res.data.data
                }
            } else {
                commit('product_error', res.data.err)
                return {
                    err: res.data.err
                }
            }
        } catch (err) {
            commit('product_error', err)
            return {
                err: err
            }
        }
    }
}

const mutations = {
    products_request(state) {
        state.status = 'loading..'
    },
    products_success(state, products) {
        state.status = '',
        state.products = products
    },
    products_error(state, err) {
        state.status = 'Please reload the page!',
        state.error = err
    },
    post_product_request(state) {
        state.status = 'loading..'
    },
    post_product_success(state, msg) {
        state.status = msg
    },
    post_product_error(state, err) {
        state.status = 'Product upload failed, Try again!',
        state.error = err
    },
    product_request(state) {
        state.status = 'loading..'
    },
    product_success(state, product) {
        state.status = '',
        state.products = product
    },
    product_error(state, err) {
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