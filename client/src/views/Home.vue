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
  </main>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'Home',
  components: {
    Header
  },
  setup() {
    return {
    }
  }
}
</script>