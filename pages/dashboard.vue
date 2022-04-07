<template>
  <div>
    <!-- Greeting -->
    <div class="flex items-center gap-x-20 mt-60 lg:mt-0">
      <!-- <i
        v-if="user.avatar == undefined"
        class="fas fa-user-plus rounded-full p-12 bg-medium-grey"
      ></i> -->
      <!-- <img v-else :src="user.avatarUrl" :alt="`A photo of ${user.firstname}`" /> -->
      <div class="flex flex-col gap-y-4">
        <h1 class="text-lg lg:text-2xl font-bold text-black">
          <!-- {{ username }} -->
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
            <!-- <h5 class="font-bold text-[30px]">{{ merchantServices.length }}</h5> -->
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

    <!-- <div v-if="merchantServices.length > 0"> -->
    <div class="grid grid-cols-12">
      <div class="col-span-7 border-[#f4f4f4] rounded-3xl">
        <h4 class="text-xl text-black font-medium">Recent transactions</h4>
        <div class="text-center mt-120">No recent transactions</div>
      </div>

      <div class="col-span-4 col-end-13">
        <div class="flex justify-between items-center mb-28">
          <h4 class="text-xl text-black font-medium">Services</h4>
          <nuxt-link
            to="/services"
            class="text-purple text-sm underline underline-offset-8"
            >View more</nuxt-link
          >
        </div>

        <div v-for="service in merchantServices" :key="service">
          <div
            class="flex gap-x-[18px] items-center mb-12 px-24 py-8 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-[10px]"
          >
            <span
              class="rounded-[50%] h-28 w-28 leading-[28px] bg-[#D8DDFD] text-blue text-center text-sm font-bold"
            >
              {{ service.title.charAt(0) }}
            </span>

            <h5 class="text-base text-black font-medium">
              {{ service.title }}
            </h5>

            <nuxt-link :to="`/services/${service.id}`" class="ml-auto">
              <i class="fas fa-chevron-right text-[#999] text-xs"></i>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->

    <!-- <div v-else> -->
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
  <!-- </div> -->
</template>

<script>
import SvgLoader from '~/components/utils/SvgLoader.vue'
import Loader from '~/components/utils/Loader.vue'
import LgBtn from '~/components/LgBtn.vue'
export default {
  layout: 'dashboard',

  // data: () => ({
  //   merchantServices: [],
  // }),

  // methods: {
  //   async getServices() {
  //     try {
  //       let token = this.$auth.token

  //       let res = await this.$axios.post('/services/service', {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       this.merchantServices = res.data.data.merchant_services
  //       // this.stakeholderServices = res.data.data.stakeholder_services
  //       console.log(res.data.data)
  //     } catch (error) {
  //       console.log({ error })
  //     }
  //   },
  // },

  // computed: {
  //   username() {
  //     return this.$auth.user.firstname + ' ' + this.$auth.user.lastname
  //   },
  // },

  // mounted() {
  //   this.getServices()
  // },

  components: {
    SvgLoader,
    Loader,
    LgBtn,
  },
}
</script>

<style lang="postcss" scoped>
.card {
  @apply rounded-xl lg:w-[280px] lg:h-[130px] shadow-[0_4px_50px_rgba(0,0,0,0.1)] bg-no-repeat bg-right-top;
}
</style>
