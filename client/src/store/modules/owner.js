import axios from 'axios'

const state = () => ({
    owners: [],
    status: '',
    error: ''
})

const getters = {
    getOwnerState: state => state.status,
    owners: state => state.owners,
    ownerError: state => state.error
}

const actions = {
    async getOwners({ commit }) {
        commit('owners_request')
        try {
            const res = await axios.get(`http://localhost:5000/api/owner`)
            if (res.data.success) {

                commit('owners_success', res.data.data)
                return {
                    success: res.data.success,
                    data: res.data.data
                }
            } else {
                commit('owners_error', res.data.err)
                return {
                    err: res.data.err
                }
            }
        } catch (err) {
            commit('owners_error', err)
            return {
                err: err
            }
        }
    },    
    async postOwners({ commit }, formData) {
        commit('post_owner_request')
        try {
            const res = await axios.post(`http://localhost:5000/api/owner`, formData)
            if (res.data.success) {
                
                commit('post_owner_success', res.data.msg)

                return {
                    success: res.data.success,
                    msg: res.data.msg,
                    ownerId: res.data.data._id
                }
            } else {
                commit('post_owner_error', res.data.err)
                return {
                    err: res.data.err
                }
            }
        } catch (err) {
            commit('post_owner_error', err)
            return {
                err: err
            }
        }
    },
    async getOwner({ commit }, ownerId) {
        commit('owner_request')
        try {
            const res = await axios.get(`http://localhost:5000/api/owner/${ownerId}`)
            if (res.data.success) {
                
                commit('owner_success', res.data.data)
                return {
                    success: res.data.success,
                    data: res.data.data
                }
            } else {
                commit('owner_error', res.data.err)
                return {
                    err: res.data.err
                }
            }
        } catch (err) {
            commit('owner_error', err)
            return {
                err: err
            }
        }
    }
}

const mutations = {
    owners_request(state) {
        state.status = 'loading..'
    },
    owners_success(state, owner) {
        state.status = '',
        state.owners = owner
    },
    owners_error(state, err) {
        state.status = 'Please reload the page!',
        state.error = err
    },
    post_owner_request(state) {
        state.status = 'loading..'
    },
    post_owner_success(state, msg) {
        state.status = msg
    },
    post_owner_error(state, err) {
        state.status = 'Owner upload failed, Try again!',
        state.error = err
    },
    owner_request(state) {
        state.status = 'loading..'
    },
    owner_success(state, owner) {
        state.status = '',
        state.owners = owner
    },
    owner_error(state, err) {
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