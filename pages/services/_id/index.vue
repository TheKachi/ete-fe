<template>
  <div>
    <h1 class="text-lg lg:text-2xl font-bold text-black mb-36">
      {{ service.title }}
    </h1>
    <!-- Tabs  -->
    <div class="flex gap-x-16 tab fixed z-50">
      <button
        @click.prevent="changeTab('transaction')"
        :class="[
          tab === 'transaction' ? 'bg-dark text-white' : 'bg-tab text-grey',
        ]"
      >
        Transactions
      </button>

      <button
        @click.prevent="changeTab('stakeholder')"
        :class="[
          tab === 'stakeholder' ? 'bg-dark text-white' : 'bg-tab text-grey',
        ]"
      >
        Stakeholders
      </button>

      <button
        @click.prevent="changeTab('setting')"
        :class="[tab === 'setting' ? 'bg-dark text-white' : 'bg-tab text-grey']"
      >
        Settings
      </button>

      <button
        @click.prevent="changeTab('api')"
        :class="[tab === 'api' ? 'bg-dark text-white' : 'bg-tab text-grey']"
      >
        API Credentials
      </button>
    </div>

    <div class="mb-96"></div>
    <!-- Transactions  -->
    <div v-if="tab === 'transaction'" class="text-center text-black text-2xl">
      No transactions yet
    </div>

    <!-- Stakeholders  -->
    <div v-if="tab === 'stakeholder'" class="text-center text-black text-2xl">
      Stakeholders
    </div>
    <!-- Settings  -->
    <div v-if="tab === 'setting'" class="text-center text-black text-2xl">
      Settings
    </div>
    <!-- Stakeholders  -->
    <div v-if="tab === 'api'" class="text-center text-black text-2xl">
      API Credentials
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  async asyncData({ $axios, params }) {
    try {
      const res = await $axios.$post('/services/details', {
        id: params.id,
      })
      console.log(res.data)
      const service = res.data
      return { service }
    } catch (error) {
      return { error, service: {} }
    }
  },

  data: () => ({
    tab: 'transaction',
  }),
  methods: {
    changeTab(tab) {
      this.tab = tab
    },
  },
}
</script>

<style></style>
