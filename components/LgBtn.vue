<template>
  <nuxt-link
    :to="url"
    class="bg-purple hover:bg-white text-white hover:text-purple border border-purple hover:border-purple text-sm lg:text-base rounded px-16 lg:px-36 py-8"
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
