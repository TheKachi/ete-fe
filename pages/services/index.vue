<template>
  <div>
    <h1 class="text-lg lg:text-2xl font-bold text-black">Services</h1>
    <h2 class="text-sm lg:text-base font-medium text-grey">
      Create and monitor your disbursement settlement among stakeholders
    </h2>
    <div class="h-[70vh] flex flex-col items-center justify-center">
      <svg-loader path="img/dashboard" icon="stake" />
      <p class="text-sm lg:text-base font-medium text-grey my-28">
        You do not have any service created yet
      </p>
      <LgBtn url="/services/create">Create Services</LgBtn>
    </div>
  </div>
</template>

<script>
import LgBtn from '~/components/LgBtn.vue'
import SvgLoader from '~/components/utils/SvgLoader.vue'
export default {
  layout: 'dashboard',
  components: { LgBtn, SvgLoader },
}
</script>
