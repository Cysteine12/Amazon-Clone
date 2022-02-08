<template>
<Header header="Register"/>
<h1 class="p-1 px-2">Register</h1>
<StatCheck v-if="authCheck" :statCheck="authCheck" />
<div class="form-template-1">
    <div class="form-header">
        <h2 class="text-center p-2">Register for an account</h2>
    </div>
    <form @submit.prevent="formSubmit">
        <div class="form-control">
            <label for="name">Name</label>
            <input id="name" v-model="form.name" type="text" autocomplete="name" placeholder="Name" required/>
        </div>
        <div class="form-control">
            <label for="email-address">Email address</label>
            <input id="email-address" v-model="form.email" type="email" autocomplete="email" placeholder="Email address" required/>
        </div>
        <div class="form-control">
            <label for="password">Password</label>
            <input id="password" v-model="form.password" type="password" placeholder="Password" required/>
        </div>
        <div class="form-control">
            <label for="confirm-password">Confirm password</label>
            <input id="confirm-password" v-model="form.confirm_password" type="password" placeholder="Confirm password" required/>
        </div>
        <br>
        <button type="submit" class="btn btn-outline">Register</button>
    </form>
</div>
</template>

<script>
import Header from '@/components/Header.vue'
import StatCheck from '@/components/StatCheck.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from '@vue/reactivity'

export default {
  components: {
    Header,
    StatCheck
  },
  setup() {
    const form = ref({
      name: '',
      email: '',
      password: '',
      confirm_password: ''
    })
    const authCheck = ref({
      status: '',
      err: ''
    })

    const router = useRouter()
    const store = useStore()

    const formSubmit = async () => {
      // Validate form data
      const checkForm = ref(false)
      if (form.value.password === form.value.confirm_password) {
        if (form.value.password.length > 6) {
          checkForm.value = true
        } else {
          authCheck.value.err = 'Password length must be above 6 characters'
          checkForm.value = false
        }
      } else {
        authCheck.value.err = 'Passwords do not match'
        checkForm.value = false
      }
      // Register Account
      if (checkForm.value) {
        const res = await store.dispatch('register', form.value)
  
        if (res.success === true) {
          authCheck.value.status = res.msg
          router.push({ name: 'Login'})
        } else {
          authCheck.value.status = await store.getters.authState
          authCheck.value.err = res.err
        }
      }
    }

    return {
      form,
      formSubmit,
      authCheck
    }
  }
}
</script>