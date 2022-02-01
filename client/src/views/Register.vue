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
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
            </span>
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import { PaperClipIcon } from '@heroicons/vue/solid'
import { LockClosedIcon } from '@heroicons/vue/solid'

export default {
  components: {
    LockClosedIcon,
    PaperClipIcon,
    Header
  },
  setup() {
    const form = {
      name: '',
      email: '',
      password: '',
      confirm_password: ''
    }

    const formSubmit = () => {
      console.log(form);
    }

    
    return {
      form,
      formSubmit
    }
  }
}
</script>

<style scoped>
.card {
    margin: 5px 3px;
    border: 3px solid #fff;
    padding: 3px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
}

.card:hover {
    border: 3px solid #2734a1;
}

.text-center {
    text-align: center;
}

.grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.grid-4 {
    grid-template-columns: repeat(4, 1fr);
}

</style>