<template>
  <div v-if="ownerId != ''">
      <h2>Your Products</h2>
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
    <StatCheck v-if="statusCheck" :statCheck="statusCheck" />
  </div>
</template>

<script>
import Products from '@/components/Products.vue'
import StatCheck from '@/components/StatCheck.vue'
import { onMounted } from '@vue/runtime-core'
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
 name: 'OwnerCategory',
  components: {
    Products,
    StatCheck
  },
  props: {
      ownerId: {
          type: String,
          default: ''
      }
  },
  setup(props) {
    const store = useStore()
    const products = ref([])
    const statusCheck = ref({
      status: '',
      err: ''
    })


    onMounted(async () => {
      await store.dispatch('getProductsByOwner', props.ownerId)
      
      statusCheck.value.status = await store.getters.getProductState
      statusCheck.value.err = await store.getters.productError
      products.value = await store.getters.products
    })

    return {
      statusCheck,
      products
    }
  }
}
</script>