<template>
  <nuxt-link
    :to="url"
    class="bg-purple hover:bg-white text-white hover:text-purple border border-purple hover:border-purple rounded px-36 py-12"
    :class="externalClass"
  >
    <!-- bg-transparent hover:bg-white hover:text-purple border-purple
    hover:border-purple -->

    <slot></slot>
  </nuxt-link>
</template>

<script>
export default {
  name: 'LgButton',
  props: {
    externalClass: {
      type: Array,
    },
    url: {
      type: String,
    },
  },
}
</script>

<style></style>
