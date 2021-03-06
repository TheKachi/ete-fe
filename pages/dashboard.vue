<template>
  <div>
    <loader v-if="isLoading" />

    <div v-else>
      <div class="flex items-center gap-x-20">
        <!-- <i
        v-if="user.avatar == undefined"
        class="fas fa-user-plus rounded-full p-12 bg-medium-grey"
      ></i> -->
        <!-- <img v-else :src="user.avatarUrl" :alt="`A photo of ${user.firstname}`" /> -->
        <div class="flex flex-col gap-y-4">
          <h1 class="text-lg lg:text-2xl font-bold text-black">
            Hi, {{ username }}
          </h1>

          <h2 class="text-sm lg:text-base font-medium text-grey">
            Welcome to your dashboard
          </h2>
        </div>
      </div>

      <!-- Analytics -->
      <div
        class="flex flex-nowrap gap-x-20 my-36 overflow-x-auto overflow-y-hidden -mr-20 lg:mx-0 p-8"
      >
        <div
          class="bg-white bg-[url('~assets/img/dashboard/stake-bg.png')] card"
        >
          <div class="flex gap-x-20 items-center mt-32 ml-32">
            <svg-loader path="img/dashboard" icon="stake" />

            <div class="flex flex-col gap-y-4 text-black">
              <h4 class="text-base">Stakeholders</h4>
              <h5 class="font-bold text-[30px]">
                <!-- {{ allServices.length }} -->
              </h5>
            </div>
          </div>
        </div>

        <div class="bg-white bg-[url('~assets/img/dashboard/ser-bg.png')] card">
          <div class="flex gap-x-20 items-center mt-32 ml-32">
            <svg-loader path="img/dashboard" icon="ser-icon" />

            <div class="flex flex-col gap-y-4 text-black">
              <h4 class="text-base">Services</h4>
              <h5 class="font-bold text-[30px]">
                {{ merchantServices.length }}
              </h5>
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

      <div v-if="merchantServices.length > 0">
        <div class="grid grid-cols-12 gap-y-40 lg:mt-60">
          <div
            class="col-span-12 lg:col-span-7 border-[#f4f4f4] rounded-3xl lg:order-1 order-last"
          >
            <h4 class="text-xl text-black font-medium">Recent transactions</h4>
            <div class="text-center mt-120">No recent transactions</div>
          </div>

          <div
            class="col-span-12 lg:col-span-4 lg:col-end-13 order-1 lg:order-last"
          >
            <div class="flex justify-between items-center mb-28">
              <h4 class="text-xl text-black font-medium">Services</h4>
              <nuxt-link
                to="/services"
                class="text-purple text-sm underline underline-offset-4"
                >View more</nuxt-link
              >
            </div>

            <div v-for="service in merchantServices" :key="service">
              <nuxt-link :to="`/services/${service.id}`">
                <div
                  class="flex gap-x-[18px] items-center mb-12 px-24 py-16 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] rounded-[10px]"
                >
                  <span
                    class="rounded-[50%] h-28 w-28 leading-[28px] bg-[#D8DDFD] text-blue text-center text-sm font-bold"
                  >
                    {{ service.title.charAt(0) }}
                  </span>

                  <h5 class="text-base text-black font-medium">
                    {{ service.title }}
                  </h5>

                  <i
                    class="fas fa-chevron-right text-[#999] text-xs ml-auto"
                  ></i>
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
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
    </div>
    <!-- Greeting -->
  </div>
</template>

<script>
import SvgLoader from '~/components/utils/SvgLoader.vue'
import Loader from '~/components/utils/Loader.vue'
import LgBtn from '~/components/LgBtn.vue'
export default {
  layout: 'dashboard',
  components: {
    SvgLoader,
    Loader,
    LgBtn,
  },
  data: () => ({
    merchantServices: [],
    stakeholderServices: [],
    allServices: [],
    isLoading: false,
  }),

  methods: {
    async getServices() {
      try {
        this.isLoading = true
        let token = this.$auth.token
        let account = this.$auth.user._id

        let res = await this.$axios.post(
          '/services/service',
          {
            account,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        this.isLoading = false

        const merchant_services = res.data.data.merchant_services
        const stakeholder_services = res.data.data.stakeholder_services
        const all_services = [...merchant_services, ...stakeholder_services]

        this.merchantServices = merchant_services
        this.stakeholderServices = stakeholder_services
        this.allServices = all_services

        // for each particular service object in allservices array
        // get the length of stakeholders in a particular service
        // then add the length of all stakeholders
      } catch (error) {
        this.isLoading = false
        console.log({ error })
      }
    },
  },

  computed: {
    username() {
      return this.$auth.user.firstname + ' ' + this.$auth.user.lastname
    },
  },

  mounted() {
    this.getServices()
  },
}
</script>

<style lang="postcss" scoped>
.card {
  @apply rounded-xl min-w-[80vw] sm:min-w-[330px] h-[130px] shadow-[0_4px_20px_0_#0000001A] bg-no-repeat bg-right-top;
}
</style>
