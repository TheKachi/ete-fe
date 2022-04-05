<template>
  <div>
    <!-- Greeting -->
    <div class="flex items-center gap-x-20">
      <!-- <i
        v-if="user.avatar == undefined"
        class="fas fa-user-plus rounded-full p-12 bg-medium-grey"
      ></i> -->
      <!-- <img v-else :src="user.avatarUrl" :alt="`A photo of ${user.firstname}`" /> -->
      <div class="flex flex-col gap-y-4">
        <h1 class="text-lg lg:text-2xl font-bold text-black">
          {{ username }}
        </h1>
        <!-- {{ $auth.user.firstname + ' ' + $auth.user.lastname }}  -->

        <!--  Hi, {{ $auth.user.firstname }} -->
        <h2 class="text-sm lg:text-base font-medium text-grey">
          Welcome to your dashboard
        </h2>
      </div>
    </div>

    <!-- Analytics -->
    <div
      class="flex flex-nowrap gap-x-20 my-36 overflow-x-auto overflow-y-hidden"
    >
      <div class="bg-white bg-[url('~assets/img/dashboard/stake-bg.png')] card">
        <div class="flex gap-x-20 items-center mt-32 ml-32">
          <svg-loader path="img/dashboard" icon="stake" />

          <div class="flex flex-col gap-y-4 text-black">
            <h4 class="text-base">Stakeholders</h4>
            <h5 class="font-bold text-[30px]">0</h5>
          </div>
        </div>
      </div>

      <div class="bg-white bg-[url('~assets/img/dashboard/ser-bg.png')] card">
        <div class="flex gap-x-20 items-center mt-32 ml-32">
          <svg-loader path="img/dashboard" icon="ser-icon" />

          <div class="flex flex-col gap-y-4 text-black">
            <h4 class="text-base">Services</h4>
            <h5 class="font-bold text-[30px]">0</h5>
          </div>
        </div>
      </div>

      <div
        class="bg-[#7445C7] bg-[url('~assets/img/dashboard/ellipse.svg')] card"
      >
        <div class="flex gap-x-20 items-center mt-32 ml-32">
          <div class="flex flex-col gap-y-4 text-white">
            <h4 class="text-base">Total Balance</h4>
            <h5 class="font-bold text-[30px]">₦0</h5>
          </div>
        </div>
      </div>
    </div>

    <h4 class="text-xl text-black font-medium">Todo</h4>

    <div class="py-24 px-40 mt-12 border border-light-grey">
      <div
        class="flex flex-col lg:flex-row gap-y-24 justify-between items-center"
      >
        <div class="flex flex-col gap-y-4">
          <h5 class="text-base font-bold text-black">Create Service</h5>
          <h6 class="text-sm lg:text-base font-medium text-grey">
            Begin your transaction settlement by creating a service
          </h6>
        </div>

        <LgBtn url="/services/create">Create Services</LgBtn>
      </div>
    </div>
  </div>
</template>

<script>
import SvgLoader from '~/components/utils/SvgLoader.vue'
import LgBtn from '~/components/LgBtn.vue'
export default {
  layout: 'dashboard',

  // data: () => ({
  //   user: {
  //     firstname: 'Lorem',
  //     lastname: 'Ipsum',
  //     avatarUrl:
  //       'https://res.cloudinary.com/thekachi/image/upload/v1597097618/charity-29.jpg',
  //   },
  // }),

  computed: {
    username() {
      return this.$auth.user.firstname + ' ' + this.$auth.user.lastname
    },
  },

  mounted() {
    console.log(this.$auth.user)
  },

  components: {
    SvgLoader,
    LgBtn,
  },
}
</script>

<style lang="postcss" scoped>
.card {
  @apply rounded-xl lg:w-[280px] lg:h-[130px] shadow-[0_4px_50px_rgba(0,0,0,0.1)] bg-no-repeat bg-right-top;
}
</style>
