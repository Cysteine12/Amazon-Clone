<template>
    <Header header="Dashboard" />
    <h1 class="p-1 px-2 d-inl-blck">My Products</h1>
    <div class="fl-r">
      <router-link :to="'/dashboard/add-new-product'">
        <div class="card p-0-5 alert-success m-auto add-product-btn">
            <span> + Add New Product</span>
        </div>
      </router-link>
    </div>
    <div v-if="user != ''">
      <OwnerCategory 
        :ownerId="user[0]._id" 
        class="category-container"
      />
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import OwnerCategory from '@/components/OwnerCategory.vue'
import { onMounted } from '@vue/runtime-core'
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
 name: 'Dashboard',
  components: {
    Header,
    OwnerCategory
  },
  setup() {
    const store = useStore()
    const user = ref([])
    const statCheck = ref({
      status: '',
      err: ''
    })


    onMounted(async () => {

      statCheck.value.status = await store.getters.authState
      user.value.push(await store.getters.user)
    })

    return {
      statCheck,
      user,
    }
  }
}
</script>