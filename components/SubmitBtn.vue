<template>
  <button
    type="Submit"
    class="bg-purple hover:bg-white text-white hover:text-purple border border-purple hover:border-purple rounded px-36 py-12"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'SubmitBtn',
}
</script>

<style></style>
