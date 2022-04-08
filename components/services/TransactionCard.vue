<template>
  <div class="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
    <div class="flex gap-x-20 items-center py-24 px-20">
      <img :src="avatar" alt="" />

      <div class="flex flex-col text-black">
        <h4 class="font-bold text-[30px]">₦ {{ figure }}</h4>
        <h5 class="text-base">{{ title }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['avatar', 'title', 'figure'],
}
</script>
