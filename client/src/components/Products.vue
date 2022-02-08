<template>
    <div v-if="product != ''">
        <div class="card-img">
            <img :src="product.photo" :alt="product.title">
        </div><br><br>
        <div class="card-content">
            <ul>
                <li>Product: {{ product.title }}</li>
                <li>Desc: {{ product.description }}</li>
                <li>Price: ${{ product.price }}</li>
                <li>Stock Quantity: {{ product.stockQuantity }}</li>
                <!-- <li>Time: {{ product.createdAt }}</li> -->
            </ul>
        </div>
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