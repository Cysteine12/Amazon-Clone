<template>
<Header header="Product"/>
<h1 class="p-1 px-2">Post new product</h1>
<StatCheck v-if="statCheck" :statCheck="statCheck" />
<div class="form-template-1">
    <div class="form-header">
        <h2 class="text-center p-2">Upload Product</h2>
    </div>
    <form @submit.prevent="formSubmit" enctype="multipart/form-data">
        <div class="form-control">
            <label for="img-file">Upload Image</label>
            <input type="file" ref="photo" required/>
        </div>
        <div class="grid">
            <div class="form-control">
                <label for="img-category">Image Category</label>
                <select v-model="form.categoryId" required>
                    <option disabled hidden selected>Select category</option>
                        <option v-for="category in categories" :key="category._id" :value="category._id">{{ category.type }}</option>
                </select>
            </div>
            <div class="form-control">
                <label for="img-price">Image Price</label>
                <div class="logo-input">
                    <div class="logo">$</div>
                    <input type="number" placeholder="Image price..." v-model="form.price" required/>
                </div>
            </div>
            <div class="form-control">
                <label for="img-title">Image Title</label>
                <input type="text" placeholder="Image title..." v-model="form.title" required/>
            </div>
            <div class="form-control">
                <label for="img-quantity">Stock Quantity</label>
                <input type="number" placeholder="Product Quantity..." v-model="form.stockQuantity" required/>
            </div>
        </div>
        <div class="form-control">
            <label for="img-description">Image Description</label>
            <textarea rows="4" placeholder="Describe The Product..." v-model="form.description" required></textarea>
        </div>
        <button type="submit" class="btn btn-outline">UPLOAD</button>
    </form>
</div>
</template>

<script>
import Header from '@/components/Header.vue'
import StatCheck from '@/components/StatCheck.vue'
import { useStore } from 'vuex'
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'

export default {
  name: 'ProductForm',
  components: {
    Header,
    StatCheck
  },
  setup() {
    const store = useStore()

    const photo = ref(null)
    const form = ref({
      categoryId: '',
      ownerId: '',
      title: '',
      description: '',
      price: '',
      stockQuantity: ''
    })
    const statCheck = ref({
      status: '',
      err: ''
    })
    const categories = ref([])

    onMounted(async () => {
      await store.dispatch('getCategories')

      statCheck.value.status = await store.getters.getCategoryState
      statCheck.value.err = await store.getters.categoryError
      categories.value = await store.getters.categories
      form.value.ownerId = await store.getters.user._id
    })

    const formSubmit = async () => {
        let formData = new FormData();
        formData.append('photo', photo.value.files[0])
        formData.append('categoryId', form.value.categoryId)
        formData.append('ownerId', form.value.ownerId)
        formData.append('title', form.value.title)
        formData.append('description', form.value.description)
        formData.append('price', form.value.price)
        formData.append('stockQuantity', form.value.stockQuantity)

        const res = await store.dispatch('postProduct', formData)

        if (res.success === true) {
            statCheck.value.status = res.msg
        } else {
            statCheck.value.status = await store.getters.authState
            statCheck.value.err = res.err
        }
    }

    return {
      form,
      photo,
      formSubmit,
      statCheck,
      categories
    }
  }
}
</script>