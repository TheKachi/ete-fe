<template>
  <div>
    <h1 class="text-lg lg:text-2xl font-bold text-black mb-36">
      <!-- {{ service.title }} -->
      {{ serviceName }}
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

    <div class="mb-120"></div>
    <!-- Transactions  -->
    <div v-if="tab === 'transaction'">
      <!-- <div v-if="service.transactions.length > 0"> -->
      <div class="grid grid-cols-3 gap-x-20 mb-40">
        <transaction-card
          avatar="amtReceived"
          title="Amount Received"
          :figure="amtReceived"
        />

        <transaction-card
          avatar="amountDisbursed"
          title="Amount Disbursed"
          :figure="amtDisbursed"
        />

        <transaction-card
          avatar="amtPending"
          title="Pending Disbursement"
          :figure="amtPending"
        />
      </div>

      <h2 class="text-xl text-black font-medium mb-24">Transaction History</h2>

      <!-- <div class="grid lg:grid-cols-12 mt-96"> -->
      <!-- <div class="col-span-12 lg:col-span-4"> -->
      <div class="flex gap-0">
        <button
          @click.prevent="changeTxnTab('received')"
          :class="[
            txnTab === 'received'
              ? 'bg-[#ECEEFE] text-purple border-b-4 border-purple'
              : 'bg-tab text-grey',
          ]"
        >
          Recieved Transactions
        </button>

        <button
          @click.prevent="changeTxnTab('disbursed')"
          :class="[
            txnTab === 'disbursed'
              ? 'bg-[#ECEEFE] text-purple border-b-4 border-purple'
              : 'bg-tab text-grey',
          ]"
        >
          Disbursed Transactions
        </button>
      </div>

      <!-- </div> -->
      <!-- </div> -->

      <!-- <div v-else class="text-center text-black text-2xl">
        No transactions yet
      </div> -->
    </div>

    <!-- Stakeholders  -->
    <div v-if="tab === 'stakeholder'" class="text-center text-black text-2xl">
      Stakeholders
    </div>

    <!-- Settings  -->
    <div v-if="tab === 'setting'" class="grid-cols-12 lg:grid-cols-9">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-y-32 gap-x-60 mt-96">
        <h1 class="lg:col-span-4 text-lg lg:text-2xl font-bold text-black">
          Service name
        </h1>

        <div class="lg:col-span-6 lg:col-end-12">
          <!-- Service name  -->
          <div class="mb-24">
            <label for="service-name">Service name</label>
            <input
              type="text"
              id="service-name"
              aria-label="Service name"
              placeholder="Enter your service name"
              :v-model="serviceName"
            />
          </div>
        </div>

        <div class="lg:col-span-5"></div>

        <div class="lg:col-span-6 lg:col-end-12">
          <submit-btn @click="create" class="float-right mt-32 lg:mt-80">
            Save Changes
          </submit-btn>
        </div>
      </div>
    </div>
    <!-- Stakeholders  -->
    <div v-if="tab === 'api'" class="text-center text-black text-2xl">
      API Credentials
    </div>
  </div>
</template>

<script>
import TransactionCard from '~/components/services/TransactionCard'
export default {
  layout: 'dashboard',

  components: {
    TransactionCard,
  },

  // async asyncData({ $axios, params }) {
  //   try {
  //     const res = await $axios.$post('/services/details', {
  //       id: params.id,
  //     })
  //     console.log(res.data)
  //     const service = res.data
  //     return { service }
  //   } catch (error) {
  //     return { error, service: {} }
  //   }
  // },

  data: () => ({
    tab: 'transaction',
    txnTab: 'Received Transactions',
  }),

  methods: {
    changeTab(tab) {
      this.tab = tab
    },
    changeTxnTab(tab) {
      this.txnTab = tab
    },
  },

  computed: {
    amtReceived() {
      return '0'
    },
    amtDisbursed() {
      return '0'
    },
    amtPending() {
      return '0'
    },

    serviceName() {
      return 'Service Name'
    },
  },
}
</script>

<style></style>
