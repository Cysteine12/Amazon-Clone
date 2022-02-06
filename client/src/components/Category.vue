<template>
  <div v-if="category != ''">
      <h1>Category Name: {{ category.type }}</h1>
      <div v-if="products !== ''">
        <Products 
          v-for="product in products" 
          :key="product._id" 
          :product="product" 
        />
      </div>
  </div>
</template>

<script>
import Products from '@/components/Products.vue'
import { onMounted } from '@vue/runtime-core'
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
 name: 'Category',
  components: {
    Products
  },
  props: {
      category: {
          type: Object,
          default: ''
      }
  },
  setup(props) {
    const store = useStore()
    const products = ref([])
    const statCheck = ref({
      status: '',
      err: ''
    })


    onMounted(async () => {
      await store.dispatch('getProducts', props.category._id)

      statCheck.value.status = await store.getters.getProductState
      products.value.push(await store.getters.products)
    })

    return {
      statCheck,
      products
    }
  }
}
</script>