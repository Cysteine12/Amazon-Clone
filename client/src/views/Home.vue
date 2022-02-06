<template>
  <Header header="Welcome To The Homepage" />
  <main>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Replace with your content -->
      <div class="px-4 py-6 sm:px-0">
        <div class="border-4 border-dashed border-gray-200 rounded-lg h-96">
          This is just an overview of the homepage
        </div>
      </div>
      <!-- /End replace -->
    </div>
    <div v-if="categories != ''">
      <Category 
        v-for="category in categories" 
        :key="category._id" 
        :category="category" 
      />
    </div>
  </main>
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
      categories.value = await store.getters.categories
    })

    return {
      statCheck,
      categories,
    }
  }
}
</script>