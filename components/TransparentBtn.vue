<template>
  <nuxt-link
    :to="url"
    class="bg-transparent border border-purple rounded px-36 py-12"
    :class="btnColors"
  >
    <!--
    hover:border-purple -->

    <slot></slot>
  </nuxt-link>
</template>

<script>
export default {
  name: 'TransparentButton',

  props: {
    externalClass: {
      type: Array,
    },
    url: {
      type: String,
    },
  },

  computed: {
    btnColors() {
      return this.$route.path === '/'
        ? 'text-white hover:text-purple hover:bg-white '
        : 'text-dark hover:text-white hover:bg-purple'
    },
  },
}
</script>

<style></style>
