<template>
  <transition name="modal">
    <div
      class="fixed z-50 overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center"
    >
      <div class="relative mx-auto w-[567px] min-h-[570px]">
        <div
          class="bg-white p-40 w-[567px] min-h-[570px] shadow-[0_4px_50px_rgba(0,0,0,0.1)]"
        >
          <div class="flex justify-between items-center">
            <slot name="header"> default header </slot>
            <button @click="$emit('close')">
              <i class="fas fa-times text-black"></i>
            </button>
          </div>

          <hr class="text-medium-grey my-24" />

          <slot name="body" />

          <slot name="footer" />
        </div>
      </div>
    </div>
    <!-- <div class="absolute inset-0 z-40 bg-black w-screen h-screen"></div> -->
  </transition>
</template>

<script>
export default {
  props: {
    // isModalActive: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  methods: {
    // close() {
    //   this.$emit('close')
    // },
  },
}
</script>

<style></style>
