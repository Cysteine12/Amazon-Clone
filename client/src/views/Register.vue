<template>
<Header header=""/>
<div class="min-h-full flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register for an account
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="formSubmit">
        <div class="rounded-md shadow-sm -space-y-px">
          <div class="my-5">
            <label for="name" class="sr-only">Name</label>
            <input id="name" v-model="form.name" type="text" autocomplete="name" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Name" />
          </div>
          <div class="my-5">
            <label for="email-address" class="sr-only">Email address</label>
            <input id="email-address" v-model="form.email" type="email" autocomplete="email" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
          </div>
          <br/>
          <div class="my-5">
            <label for="password" class="sr-only">Password</label>
            <input id="password" v-model="form.password" type="password" autocomplete="current-password" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
          </div>
          <br>
          <div class="my-5">
            <label for="confirm-password" class="sr-only">Confirm Password</label>
            <input id="confirm-password" v-model="form.confirm_password" type="password" autocomplete="current-password" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Confirm Password" />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
              <!-- Forgot your password? -->
            </a>
          </div>
        </div>
        <div>
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
  <div>
    {{ authCheck.status }}
    {{ authCheck.err }}
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from '@vue/reactivity'

export default {
  components: {
    Header
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