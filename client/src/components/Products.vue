<template>
    <div v-if="product != ''">
        <ul>
            <li>
                <img :src="product[0].photo" :alt="product[0].title">
            </li>
            <li>Title: {{ product[0].title }}</li>
            <li>Description: {{ product[0].description }}</li>
            <li>Price: {{ product[0].price }}</li>
            <li>Stock Quantity: {{ product[0].stockQuantity }}</li>
            <li>Time: {{ product[0].createdAt }}</li>
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