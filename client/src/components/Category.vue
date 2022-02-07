<template>
  <div v-if="category != ''">
      <h2>Category Name: {{ category.type }}</h2>
      <div v-if="products !== ''" class="product-section">
        <Products 
          v-for="product in products" 
          :key="product._id" 
          :product="product"
          class="product-card"
        />
      </div>
  </div>
  <div v-else>
      {{ statCheck.status }}
      {{ statCheck.err }}
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
      statCheck.value.err = await store.getters.productError
      products.value = await store.getters.products
    })

    return {
      statCheck,
      products
    }
  }
}
</script>