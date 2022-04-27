<template>
  <div>
    <loader v-if="isLoading" />

    <div v-else>
      <div class="flex justify-between items-center">
        <h1 class="col-span-2 text-lg lg:text-2xl font-bold text-black">
          Services
        </h1>
        <LgBtn url="/services/create" v-if="merchantServices.length > 0"
          >Create Services</LgBtn
        >
      </div>
      <h2 class="col-span-12 text-base lg:text-base text-grey mt-16 lg:mt-4">
        Create and monitor your disbursement settlement among stakeholders
      </h2>

      <!-- Tabs  -->
      <div class="flex gap-x-24 tab mt-32">
        <button
          @click.prevent="changeTab('all')"
          :class="[tab === 'all' ? 'bg-dark text-white' : 'bg-tab text-grey']"
        >
          All
        </button>

        <button
          @click.prevent="changeTab('merchant')"
          :class="[
            tab === 'merchant' ? 'bg-dark text-white' : 'bg-tab text-grey',
          ]"
        >
          Merchant
        </button>

        <button
          @click.prevent="changeTab('stakeholder')"
          :class="[
            tab === 'stakeholder' ? 'bg-dark text-white' : 'bg-tab text-grey',
          ]"
        >
          Stakeholder
        </button>
      </div>

      <div v-if="tab === 'all'">
        <div
          class="grid lg:grid-cols-3 lg:grid-rows-1 gap-16 lg:gap-32 my-40"
          v-if="allServices.length > 0"
        >
          <div v-for="service in allServices" :key="service.id">
            <service-card :service="service" />
          </div>
        </div>

        <div class="h-[70vh] flex flex-col items-center justify-center" v-else>
          <svg-loader path="img" icon="no-service" />
          <p class="text-sm lg:text-base font-medium text-grey my-28">
            You do not have any service yet.
          </p>
          <LgBtn url="/services/create">Create Service</LgBtn>
        </div>
      </div>
      <div v-if="tab === 'merchant'">
        <div
          class="grid lg:grid-cols-3 lg:grid-rows-1 lg:grid-flow-row gap-16 lg:gap-32 my-40"
          v-if="merchantServices.length > 0"
        >
          <div v-for="service in merchantServices" :key="service.id">
            <service-card :service="service" />
          </div>
        </div>

        <div class="h-[70vh] flex flex-col items-center justify-center" v-else>
          <svg-loader path="img" icon="no-service" />
          <p class="text-sm lg:text-base font-medium text-grey my-28">
            You do not have any service created yet
          </p>
          <LgBtn url="/services/create">Create Service</LgBtn>
        </div>
      </div>

      <div v-if="tab === 'stakeholder'">
        <div
          class="grid lg:grid-cols-3 gap-16 lg:gap-32 my-40"
          v-if="stakeholderServices.length > 0"
        >
          <div v-for="service in stakeholderServices" :key="service.id">
            <service-card :service="service" />
          </div>
        </div>

        <div class="h-[70vh] flex flex-col items-center justify-center" v-else>
          <svg-loader path="img" icon="no-service" />
          <p class="text-sm lg:text-base font-medium text-grey my-28">
            You do not have any stakeholder services
          </p>
        </div>
      </div>
    </div>

    <notifications position="top right" classes="notif" />
  </div>
</template>

<script>
import LgBtn from '~/components/LgBtn.vue'
import ServiceCard from '~/components/services/ServiceCard.vue'
import SvgLoader from '~/components/utils/SvgLoader.vue'
import Loader from '~/components/utils/Loader.vue'
export default {
  layout: 'dashboard',
  components: { ServiceCard, LgBtn, SvgLoader, Loader },

  data: () => ({
    merchantServices: [],
    stakeholderServices: [],
    allServices: [],
    tab: 'all',
    isLoading: false,
  }),

  methods: {
    changeTab(tab) {
      this.tab = tab
    },

    async getServices() {
      try {
        let token = this.$auth.token
        let account = this.$auth.user._id
        this.isLoading = true
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

        console.log(res.data.data)
      } catch (error) {
        this.isLoading = false

        console.log({ error })
      }
    },
  },

  mounted() {
    this.getServices()
  },
}
</script>
