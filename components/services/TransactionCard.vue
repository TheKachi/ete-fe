<template>
  <div class="bg-white rounded-xl shadow-[0_4px_50px_rgba(0,0,0,0.1)]">
    <div class="flex gap-x-20 items-center py-24 px-20">
      <svg-loader path="img/services" :icon="avatar" />

      <div class="flex flex-col gap-y-4 text-black">
        <h4 class="font-bold text-[30px]">₦ {{ figure }}</h4>
        <h5 class="text-base text-grey">{{ title }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['avatar', 'title', 'figure'],
}
</script>
