<template>
  <div class="header">
    <div class="header-title">
      <h2>Store Bay</h2>
    </div>
    <ul class="header-profile">
      <li v-if="isLoggedIn">
        <button @click.prevent="logoutForm">
          {{ logout[0] }}
        </button> | 
      </li>
      <li v-if="user" class="header-name">
        {{ user.name }}
      </li>
      <li v-else class="header-name">
        Welcome Guest
      </li>
    </ul>
  </div>
  <nav class="navbar">
    <ul>
      <li v-for="(item, itemIdx) in navigation" :key="itemIdx">
        <router-link :to="item.link">{{ item.name }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { computed, isRef, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Header',
  props: {
      header: {
          type: String,
          default: ''
      }
  },
  setup() {
    const navigation = ref([])
    const open = ref(false)
    const logout = ['Log-out']
    const user = ref(null)
    const authCheck = ref({
      status: '',
      err: ''
    })

    const store = useStore()

    const isLoggedIn = computed(() => store.getters.isLoggedIn)
    onMounted(async () => {
      if (isLoggedIn.value) {
        await store.dispatch('getProfile')
  
        authCheck.value.status = await store.getters.authState
        user.value = await store.getters.user

        navigation.value = [
          {
            'name': 'Home',
            'link': '/'
          },
          {
            'name': 'About',
            'link': '/about'
          },
          {
            'name': 'Dashboard',
            'link': '/dashboard'
          }
        ]
      } else {
        navigation.value = [
          {
            'name': 'Home',
            'link': '/'
          },
          {
            'name': 'About',
            'link': '/about'
          },
          {
            'name':'Login',
            'link': '/login'
          },
          {
            'name':'Register',
            'link': '/register'
          }
        ]
      }
    })


    const logoutForm = async () => {
      await store.dispatch('logout')
    }

    return {
      navigation,
      logout,
      open,
      isLoggedIn,
      logoutForm,
      user
    }
  },
}
</script>

<style>

</style>
