<template>
  <button type="button" class="click-btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'SubmitBtn',
}
</script>

<style lang="postcss">
.click-btn {
  @apply bg-purple hover:bg-white text-white hover:text-purple border border-purple hover:border-purple rounded text-sm lg:text-base px-16 lg:px-36 py-8;
}
</style>
