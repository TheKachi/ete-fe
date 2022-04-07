<template>
  <div>
    <div class="fixed top-[80px] z-[50]">
      <h1 class="text-lg lg:text-2xl font-bold text-black mb-36">
        {{ service.title }}
      </h1>
      <!-- Tabs  -->
      <div class="flex gap-x-16 tab">
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
          :class="[
            tab === 'setting' ? 'bg-dark text-white' : 'bg-tab text-grey',
          ]"
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
    </div>

    <div class="lg:mt-144 overflow-y-hidden">
      <!-- Transactions  -->
      <div v-if="tab === 'transaction'">
        <!-- <div v-if="service.transactions.length > 0"> -->
        <div class="grid grid-cols-3 gap-x-20 mb-40">
          <transaction-card
            :avatar="require('~/assets/img/services/amtReceived.svg')"
            title="Amount Received"
            :figure="amtReceived"
          />

          <transaction-card
            :avatar="require('~/assets/img/services/amtDisbursed.svg')"
            title="Amount Disbursed"
            :figure="amtDisbursed"
          />

          <transaction-card
            :avatar="require('~/assets/img/services/amtPending.svg')"
            title="Pending Disbursement"
            :figure="amtPending"
          />
        </div>

        <h2 class="text-xl text-black font-medium mb-24">
          Transaction History
        </h2>

        <!-- <div class="grid lg:grid-cols-12 mt-96"> -->
        <!-- <div class="col-span-12 lg:col-span-4"> -->
        <div class="flex gap-0 user-tab mb-16">
          <button
            @click.prevent="changeTxnTab('received')"
            :class="[
              txnTab === 'received'
                ? 'bg-[#ECEEFE] text-purple border-b-4 border-purple'
                : 'bg-tab text-grey',
            ]"
          >
            Received Transactions
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

        <div class="text-center mt-120">No transactions yet</div>

        <!-- <div class="table" v-if="txnTab === 'received' && service.transactions">
        <div class="thead">
          <div class="th"></div>
          <div class="th">Date</div>
          <div class="th">Transactions</div>
          <div class="th">Amount</div>
          <div class="th">Status</div>
        </div>

        <div class="tr mb-16">
          <div><svg-loader path="img/services" icon="txn" /></div>
          <div class="td">12 Jan 2021 | 12:01</div>
          <div class="td">Recieved - From flutterwave/Stephenie Glory/</div>
          <div class="td">₦500,000</div>
          <div class="td">
            <span
              class="text-[#186F3D] bg-[#EFF8F3] font-medium rounded-[20px] py-8 px-24"
              >Completed</span
            >
          </div>
        </div>
      </div>
      <div class="table" v-if="txnTab === 'disbursed'">
        <div class="thead">
          <div class="th"></div>
          <div class="th">Date</div>
          <div class="th">Transactions</div>
          <div class="th">Amount</div>
          <div class="th">Status</div>
        </div>

        <div class="tr mb-16">
          <div class="td">
            <svg-loader path="img/services" icon="disb" />
          </div>
          <div class="td">12 Jan 2021 | 12:01</div>
          <div class="td">Sent - Disbursement/stakeholder/Diamond Eneh/</div>
          <div class="td">₦500,000</div>
          <div class="td">
            <span
              class="text-[#F47417] bg-[#FFEDD8] font-medium rounded-[20px] py-8 px-24"
              >Pending</span
            >
          </div>
        </div>
      </div> -->

        <!-- </div> -->
        <!-- </div> -->

        <!-- <div v-else>
        No transactions yet
      </div> -->
      </div>

      <!-- Stakeholders  -->
      <div v-if="tab === 'stakeholder'">
        <table class="table-auto">
          <thead>
            <tr>
              <td></td>
              <th>Name</th>
              <th>Email adress</th>
              <th>Acct. number</th>
              <th>Mark-up</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody
            v-for="(holder, i) in service.stakeholders.people_pending"
            :key="i"
          >
            <tr>
              <td class="rounded-l-xl">
                <div
                  class="rounded-[50%] h-28 w-28 flex items-center justify-center bg-[#D8DDFD] text-blue text-center text-sm font-bold"
                >
                  {{ holder.name.charAt(0) }}
                </div>
              </td>
              <td>{{ holder.name }}</td>
              <td>{{ holder.email }}</td>
              <td>{{ holder.account_no }}</td>
              <td>
                <span v-if="holder.is_percentage === false">₦</span>
                {{ holder.share_formular }}
                <span v-if="holder.is_percentage === true">%</span>
              </td>
              <td class="flex gap-x-28 rounded-r-xl">
                <i class="far fa-edit text-[#219653]"></i>
                <i class="fas fa-trash text-[#FB1731]"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Settings  -->
      <div v-if="tab === 'setting'">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-y-32 gap-x-60">
          <label class="lg:col-span-4 text-lg text-left" for="service-name"
            >Service name</label
          >

          <div class="lg:col-span-6">
            <input
              type="text"
              id="service-name"
              aria-label="Service name"
              placeholder="Enter your service name"
              v-model="service.title"
              disabled
            />
          </div>

          <!-- Description  -->
          <label class="lg:col-span-4 text-lg text-left" for="desc"
            >Description</label
          >

          <div class="lg:col-span-6">
            <textarea
              rows="5"
              id="desc"
              v-model="service.description"
              disabled
            />
          </div>

          <!-- Receiving account  -->
          <label class="lg:col-span-4 text-lg text-left" for="acct">
            Receiving account
          </label>

          <div class="lg:col-span-6">
            <!-- Bank name   -->
            <div>
              <label for="bank-name" class="text-left">Bank name</label>
              <input
                type="text"
                id="bank-name"
                aria-label="Service Bank name"
                v-model="service.bank_name"
                disabled
              />
            </div>

            <!-- Account number -->
            <div class="my-24">
              <label for="acct-no" class="text-left">Account number</label>
              <input
                type="number"
                id="acct-no"
                aria-label="Account number"
                v-model="service.account_no"
                disabled
              />
            </div>

            <!-- Account name -->
            <div>
              <label for="acct-name" class="text-left">Account name</label>
              <input
                type="text"
                id="acct-name"
                aria-label="Account name"
                v-model="service.account_name"
                disabled
              />
            </div>
          </div>

          <!-- <p class="text-sm font-medium text-grey">
            Account details to receive money
          </p> -->

          <div class="lg:col-span-6 lg:col-end-12">
            <submit-btn class="float-right mt-32 lg:mt-80"> Edit </submit-btn>
          </div>
        </div>
      </div>

      <!-- API Credentials  -->
      <div v-if="tab === 'api'">
        <div class="flex gap-0 user-tab mb-32">
          <button
            @click.prevent="changeApiTab('staging')"
            :class="[
              apiTab === 'staging'
                ? 'bg-[#ECEEFE] text-purple border-b-4 border-purple'
                : 'bg-tab text-grey',
            ]"
          >
            Staging API Keys
          </button>

          <button
            @click.prevent="changeApiTab('live')"
            :class="[
              apiTab === 'live'
                ? 'bg-[#ECEEFE] text-purple border-b-4 border-purple'
                : 'bg-tab text-grey',
            ]"
          >
            Live API Keys
          </button>
        </div>

        <div class="grid grid-cols-12">
          <div class="col-span-12 lg:col-span-9">
            <div v-if="apiTab === 'staging'">
              <!-- Public key -->
              <div>
                <label for="staging-public-key" class="text-left"
                  >Public key</label
                >
                <div class="flex items-center">
                  <input
                    type="text"
                    id="staging-public-key"
                    aria-label="Staging Public key"
                    v-model="service.api_public_key_test"
                    disabled
                  />

                  <button class="rounded-xl px-24 py-8 bg-purple text-white">
                    Copy
                  </button>
                </div>
              </div>

              <!-- private key -->
              <div class="mt-32">
                <label for="staging-private-key" class="text-left"
                  >private key</label
                >
                <div class="flex items-center">
                  <input
                    type="text"
                    id="staging-private-key"
                    aria-label="Staging private key"
                    v-model="service.api_private_key_test"
                    disabled
                  />

                  <button class="rounded-xl px-24 py-8 bg-purple text-white">
                    Copy
                  </button>
                </div>
              </div>
            </div>
            <div v-else>
              <!-- Public key -->
              <div>
                <label for="live-public-key" class="text-left"
                  >Public key</label
                >
                <div class="flex items-center">
                  <input
                    type="text"
                    id="live-public-key"
                    aria-label="live Public key"
                    v-model="service.api_public_key"
                    disabled
                  />

                  <button class="rounded-xl px-24 py-8 bg-purple text-white">
                    Copy
                  </button>
                </div>
              </div>

              <!-- private key -->
              <div class="mt-32">
                <label for="live-private-key" class="text-left"
                  >private key</label
                >
                <div class="flex items-center">
                  <input
                    type="text"
                    id="live-private-key"
                    aria-label="live private key"
                    v-model="service.api_private_key"
                    disabled
                  />

                  <button class="rounded-xl px-24 py-8 bg-purple text-white">
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SvgLoader from '~/components/utils/SvgLoader'
import TransactionCard from '~/components/services/TransactionCard'

export default {
  layout: 'dashboard',
  components: {
    SvgLoader,
    TransactionCard,
  },

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
    txnTab: 'received',
    apiTab: 'staging',
  }),
  methods: {
    changeTab(tab) {
      this.tab = tab
    },
    changeTxnTab(tab) {
      this.txnTab = tab
    },
    changeApiTab(tab) {
      this.apiTab = tab
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
  },
}
</script>

<style></style>
