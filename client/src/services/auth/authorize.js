import { ref } from '@vue/reactivity'
import axios from 'axios'

const isAuth = async (formData) => {
    const url = `api`
    const isAuth = ref(null)
    const error = ref(null)
    try {
        const res = await axios.get(`http://localhost:5000/api/auth/profile`)
        isAuth.value = res.data.success
        return isAuth
    } catch (err) {
        error.value = err.message
    }
}


export default isAuth