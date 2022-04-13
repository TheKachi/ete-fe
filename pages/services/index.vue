<template>
  <div>
    <loader v-if="isLoading" />

    <div v-else>
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-lg lg:text-2xl font-bold text-black">Services</h1>
          <h2 class="text-sm lg:text-base font-medium text-grey">
            Create and monitor your disbursement settlement among stakeholders
          </h2>
        </div>
        <LgBtn url="/services/create" v-if="merchantServices.length > 0"
          >Create Services</LgBtn
        >
      </div>

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
            <nuxt-link :to="`/services/${service.id}`">
              <div class="card">
                <div class="flex gap-x-[18px] items-center mb-24">
                  <span
                    class="rounded-[50%] h-[46px] w-[46px] leading-[46px] bg-[#D8DDFD] text-blue font-bold text-center"
                  >
                    {{ service.title.charAt(0).toUpperCase() }}
                  </span>

                  <h5 class="text-lg text-black font-medium">
                    {{ service.title }}
                  </h5>
                </div>

                <p class="text-base text-grey" v-if="service.description">
                  {{ slice(service.description) }}
                </p>

                <p class="text-base text-grey" v-else>
                  This service has no description.
                </p>

                <!-- <div class="grid grid-cols-6 float-right">
                <div
                  class="col-span-1 -mr-12 "
                  v-for="(stakeH, i) in service"
                  :key="i"
                >
                  <img :src="stakeH.userPhoto" :alt="meta" />
                </div>
                <div
                  class="col-span-1 -mr-12 bg-transparent rounded-full h-24 w-24 text-black text-xs font-medium"
                >
                  +{{ service.stakeholders.length }}
                </div>
              </div> -->
              </div>
            </nuxt-link>
          </div>
        </div>

        <div class="h-[70vh] flex flex-col items-center justify-center" v-else>
          <svg-loader path="img" icon="no-service" />
          <p class="text-sm lg:text-base font-medium text-grey my-28">
            You do not have any service created yet
          </p>
          <LgBtn url="/services/create">Create Services</LgBtn>
        </div>
      </div>
      <div v-if="tab === 'merchant'">
        <div
          class="grid lg:grid-cols-3 lg:grid-rows-1 lg:grid-flow-row gap-16 lg:gap-32 my-40"
          v-if="merchantServices.length > 0"
        >
          <div v-for="service in merchantServices" :key="service.id">
            <nuxt-link :to="`/services/${service.id}`" class="">
              <div class="card h-full">
                <div class="flex gap-x-[18px] items-center mb-24">
                  <span
                    class="rounded-[50%] h-[46px] w-[46px] leading-[46px] bg-[#D8DDFD] text-blue font-bold text-center"
                  >
                    {{ service.title.charAt(0).toUpperCase() }}
                  </span>

                  <h5 class="text-black font-medium">
                    {{ service.title }}
                  </h5>
                </div>

                <p class="text-grey" v-if="service.description">
                  {{ slice(service.description) }}
                </p>

                <!-- <div class="grid grid-cols-6 float-right">
                <div
                  class="col-span-1 -mr-12 "
                  v-for="(stakeH, i) in service"
                  :key="i"
                >
                  <img :src="stakeH.userPhoto" :alt="meta" />
                </div>
                <div
                  class="col-span-1 -mr-12 bg-transparent rounded-full h-24 w-24 text-black text-xs font-medium"
                >
                  +{{ service.stakeholders.length }}
                </div>
              </div> -->
              </div>
            </nuxt-link>
          </div>
          htt
        </div>

        <div class="h-[70vh] flex flex-col items-center justify-center" v-else>
          <svg-loader path="img" icon="no-service" />
          <p class="text-sm lg:text-base font-medium text-grey my-28">
            You do not have any service created yet
          </p>
          <LgBtn url="/services/create">Create Services</LgBtn>
        </div>
      </div>

      <div v-if="tab === 'stakeholder'">
        <div
          class="grid lg:grid-cols-3 gap-16 lg:gap-32 my-40"
          v-if="stakeholderServices.length > 0"
        >
          <div v-for="service in stakeholderServices" :key="service.id">
            <nuxt-link :to="`/services/${service.id}`">
              <div class="card">
                <div class="flex gap-x-[18px] items-center mb-24">
                  <span
                    class="rounded-[50%] h-[46px] w-[46px] leading-[46px] bg-[#D8DDFD] text-blue font-bold text-center"
                  >
                    {{ service.title.charAt(0).toUpperCase() }}
                  </span>

                  <h5 class="text-lg text-black font-medium truncate-lg">
                    {{ service.title }}
                  </h5>
                </div>

                <p
                  class="text-base text-grey truncate-sm"
                  v-if="service.description"
                >
                  {{ slice(service.description) }}
                </p>

                <p class="text-base text-grey" v-else>
                  This service has no description.
                </p>

                <!-- <div class="grid grid-cols-6 float-right">
                <div
                  class="col-span-1 -mr-12 "
                  v-for="(stakeH, i) in service"
                  :key="i"
                >
                  <img :src="stakeH.userPhoto" :alt="meta" />
                </div>
                <div
                  class="col-span-1 -mr-12 bg-transparent rounded-full h-24 w-24 text-black text-xs font-medium"
                >
                  +{{ service.stakeholders.length }}
                </div>
              </div> -->
              </div>
            </nuxt-link>
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
import SvgLoader from '~/components/utils/SvgLoader.vue'
import Loader from '~/components/utils/Loader.vue'
export default {
  layout: 'dashboard',
  components: { LgBtn, SvgLoader, Loader },

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

    slice(str) {
      if (str.length <= 100) return str
      return str.slice(0, 97) + '...'
    },
  },

  mounted() {
    this.getServices()
  },
}
</script>

<style lang="postcss" scoped>
.card {
  @apply bg-white p-20 pb-28 rounded-md shadow-[0_4px_50px_rgba(0,0,0,0.1)];
}

truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  resize: horizontal;
}

/* truncate-lg {
  @apply text-lg
width: 200px;
  font-size: 1.3rem;
} */
truncate-sm {
  @apply text-base;
  width: 200px;
  font-size: 1.3rem;
}
</style>
