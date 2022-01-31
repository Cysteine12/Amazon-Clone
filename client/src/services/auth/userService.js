import { ref } from '@vue/reactivity'
import axios from 'axios'

const user = async () => {
    const url = `api`
    const user = ref(null)
    const error = ref(null)
    try {
        const res = await axios.get(`http://localhost:5000/api/auth/profile`)
        console.log(res.data);
        user.value = res.data.user
        console.log(user.value);
        return { user }
    } catch (err) {
        error.value = err.message
    }
}


export default user