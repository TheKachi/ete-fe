<template>
  <div
    class="fixed top-60 z-[100] inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex items-end justify-center min-h-screen lg:pt-24 lg:px-24 lg:pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0" aria-hidden="true"></div>
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-[0_4px_50px_rgba(0,0,0,0.1)] transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <div class="bg-white px-16 pt-20 pb-24 sm:p-24 sm:pb-16">
          <!-- close button  -->
          <button @click="$emit('close')" class="float-right">
            <i class="fas fa-times text-black"></i>
          </button>
          <!-- Header  -->
          <slot name="header"> default header </slot>

          <hr class="text-medium-grey my-24" />

          <!-- Body  -->
          <slot name="body" />

          <div class="flex flex-row-reverse">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
