<template>
<div>
  <Header header="Home" />
  <main class="body-bg-color">
    <h1 class="p-1 px-2">Home</h1>
    <div v-if="categories != ''">
      <Category 
        v-for="category in categories" 
        :key="category._id" 
        :category="category" 
        class="category-container"
      />
    </div>
    <div v-else>
      {{ statCheck.status }}
      {{ statCheck.err }}
    </div>
  </main>
</div>
</template>

<script>
import Header from '@/components/Header.vue'
import Category from '@/components/Category.vue'
import { onMounted } from '@vue/runtime-core'
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
 name: 'Home',
  components: {
    Header,
    Category
  },
  setup() {
    const store = useStore()
    const categories = ref([])
    const statCheck = ref({
      status: '',
      err: ''
    })

    onMounted(async () => {
      await store.dispatch('getCategories')

      statCheck.value.status = await store.getters.getCategoryState
      statCheck.value.err = await store.getters.categoryError
      categories.value = await store.getters.categories
    })

    return {
      statCheck,
      categories
    }
  }
}
</script>