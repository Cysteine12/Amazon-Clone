<template>
  <div class="header">
    <div>
      {{ header }}
    </div>
    <nav>
      <li v-for="(item, itemIdx) in navigation" :key="itemIdx">
        <router-link :to="item.link">{{ item.name }}</router-link>
      </li>
      <li v-if="isLoggedIn">
          <button @click.prevent="logoutForm">
            {{ logout }}
          </button>
      </li>
    </nav>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
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
    const logout = ['Log-out']

    const open = ref(false)

    const router = useRouter()
    const store = useStore()

    const isLoggedIn = computed(() => store.getters.isLoggedIn)
    if (isLoggedIn.value) {
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
          'name': 'Dashboard',
          'link': '/dashboard'
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

    const logoutForm = async () => {
      await store.dispatch('logout')
    }

    return {
      navigation,
      logout,
      open,
      isLoggedIn,
      logoutForm
    }
  },
}
</script>

<style>

</style>
