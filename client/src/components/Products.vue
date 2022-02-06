<template>
    <div v-if="product != ''">
        <ul>
            <li>
                <img :src="product.photo" :alt="product.title">
            </li>
            <li>Title: {{ product.title }}</li>
            <li>Description: {{ product.description }}</li>
            <li>Price: {{ product.price }}</li>
            <li>Stock Quantity: {{ product.stockQuantity }}</li>
            <li>Time: {{ product.createdAt }}</li>
        </ul>
    </div>
</template>

<script>

export default {
 name: 'Products',
  props: {
      product: {
          type: Object,
          default: ''
      }
  },
  setup() {

    return {
    }
  }
}
</script>