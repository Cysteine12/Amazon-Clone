import { ref } from '@vue/reactivity'
import axios from 'axios'


const login = async (formData) => {
    const url = `api`
    const msg = ref(null)
    const error = ref(null)
    try {
        const res = await axios.post(`http://localhost:5000/api/auth/login`, formData)
        if (res.data.success) {
            msg.value = res.data.msg
            console.log(res.data);
            return true
        } else {
            error.value = res.data.msg
            return false
        }
    } catch (err) {
        error.value = err.message
        return false
    }
}


export default login