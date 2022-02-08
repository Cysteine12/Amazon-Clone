<template>
<Header header="Login"/>
<h1 class="p-1 px-2">Login</h1>
<StatCheck v-if="authCheck" :statCheck="authCheck" />
<div class="form-template-1">
    <div class="form-header">
        <h2 class="text-center p-2">Sign in to your account</h2>
    </div>
    <form @submit.prevent="formSubmit">
        <div class="form-control">
            <label for="email-address">Email address</label>
            <input id="email-address" v-model="form.email" type="email" autocomplete="email" placeholder="Email address" required/>
        </div>
        <div class="form-control">
            <label for="password">Password</label>
            <input id="password" v-model="form.password" type="password" autocomplete="password" placeholder="Password" required/>
        </div>
        <br>
        <button type="submit" class="btn btn-outline">Login</button>
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
      email: '',
      password: ''
    })
    const authCheck = ref({
      status: '',
      err: ''
    })

    const router = useRouter()
    const store = useStore()

    const formSubmit = async () => {
      const res = await store.dispatch('login', form.value)

      if (res.success === true) {
        authCheck.value.status = res.msg
        router.push({ name: 'Dashboard'})
      } else {
        authCheck.value.status = await store.getters.authState
        authCheck.value.err = res.err
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