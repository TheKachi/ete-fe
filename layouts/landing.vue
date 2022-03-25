<template>
  <div keep-alive>
    <Nav />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
import Nav from '@/layouts/landing/Nav.vue'
import Footer from '@/layouts/landing/Footer.vue'
export default {
  components: {
    Nav,
    Footer,
  },
}
</script>

<style></style>
