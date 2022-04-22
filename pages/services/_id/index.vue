<template>
  <div>
    <!-- Edit stakeholder  modal  -->
    <modal v-if="editStakeholderModal" @close="editStakeholderModal = false">
      <div slot="header">
        <div class="flex justify-between items-start pr-28">
          <h5 class="text-lg lg:text-2xl font-bold text-black">
            Edit Stakeholder Details
          </h5>
        </div>
      </div>

      <div slot="body">
        <!-- Full name and Role - Individual  -->
        <div
          class="grid grid-cols-2 gap-x-16 mb-16"
          v-if="holder.type === 'individual'"
        >
          <!-- Full Name -->
          <div
            :class="{
              'form-group--error': $v.holder.name.$error,
            }"
          >
            <label for="stakeholder-name">Full name</label>
            <input
              id="stakeholder-name"
              type="text"
              v-model.trim="holder.name"
            />

            <field-errors
              v-if="$v.holder.name.$error"
              :field="$v.holder.name"
              alt="Please enter this stakeholder's Full Name"
            />
          </div>

          <!--Role - Individual -->
          <div>
            <label for="role">Role</label>
            <select id="role" name="role" v-model="holder.role">
              <option value="stakeholder">Stakeholder</option>
            </select>
          </div>
        </div>

        <!-- Group Name -->
        <div
          v-if="holder.type === 'group'"
          class="mb-24"
          :class="{
            'form-group--error': $v.holder.name.$error,
          }"
        >
          <label for="stakeholder-name">Group name</label>
          <input id="stakeholder-name" type="text" v-model.trim="holder.name" />

          <field-errors
            v-if="$v.holder.name.$error"
            :field="$v.holder.name"
            alt="Please enter stakeholder Name"
          />
        </div>

        <!-- Add members - Group  -->
        <h5
          class="text-base font-bold text-black mb-16"
          v-if="holder.type === 'group'"
        >
          Add members
        </h5>

        <!-- Email  -->
        <div
          class="mb-16"
          :class="{ 'form-group--error': $v.singleEmail.$error }"
        >
          <label for="stakeholder-email" v-if="holder.type === 'individual'"
            >Email</label
          >
          <input
            type="email"
            id="stakeholder-email"
            name="stakeholder-email"
            v-model="singleEmail"
            v-if="holder.type === 'individual'"
          />
          <input
            type="email"
            placeholder="Email, space seperated"
            aria-label="Email, space seperated"
            v-model="singleEmail"
            v-if="holder.type === 'group'"
            @keyup.space="addEmail"
          />
          <field-errors
            v-if="$v.singleEmail.$error"
            :field="$v.singleEmail"
            alt="We're going to need a correct stakeholder's email to invite them!"
          />
        </div>

        <!-- Members emails list - Group  -->
        <div
          class="flex flex-wrap gap-x-4 gap-y-8 mb-24"
          v-if="holder.type === 'group' && tempEmail.length > 0"
        >
          <div
            v-for="(i, index) in tempEmail"
            :key="index"
            class="bg-white justify-center border border-grey rounded p-8 text-xs"
          >
            {{ i }}
            <i class="fas fa-times ml-12" @click="removeGroupEmail(index)"></i>
          </div>
        </div>

        <!-- Bank details  -->
        <div class="mt-32">
          <h5 class="text-base font-bold text-black">Bank details</h5>

          <!-- Bank name and Account number  -->
          <div class="grid grid-cols-2 gap-x-16 my-16">
            <!-- Bank Name -->
            <div :class="{ 'form-group--error': $v.holderBank.$error }">
              <label for="holder-bank-name">Bank name</label>
              <select
                v-model="holderBank"
                id="holder-bank-name"
                class="form-select"
              >
                <option disabled selected :value="{}">Select Bank</option>
                <option v-for="(bank, i) in banks" :key="i" :value="bank">
                  {{ bank.name }}
                </option>
              </select>
              <field-errors
                v-if="$v.holderBank.$error"
                :field="$v.holderBank"
                alt="Please enter a bank for your stakeholder"
              />
            </div>

            <!-- Account number -->
            <div
              :class="{
                'form-group--error': $v.holder.account_no.$error,
              }"
            >
              <label for="holder-acct-no">Account number</label>
              <input
                type="number"
                class="lg:w-50"
                id="holder-acct-no"
                placeholder="Enter Account number"
                aria-label="Account number"
                v-model="holder.account_no"
              />
              <field-errors
                v-if="$v.holder.account_no.$error"
                :field="$v.holder.account_no"
                alt="Please enter an account number for your stakeholder"
              />
            </div>
          </div>

          <!-- Account name -->
          <div
            :class="{
              'form-group--error': $v.holder.account_name.$error,
            }"
          >
            <label for="holder-acct-name">Account name</label>
            <input
              type="text"
              id="holder-acct-name"
              placeholder="Enter Account name"
              aria-label="Account name"
              v-model="holder.account_name"
            />
            <field-errors
              v-if="$v.holder.account_name.$error"
              :field="$v.holder.account_name"
              alt="Please enter an account name for your stakeholder"
            />
          </div>
        </div>

        <!-- Mark-Up Type - Fixed or Percentage  -->
        <div class="mt-32">
          <h5 class="text-base font-bold text-black">Mark-Up Type</h5>
          <h6 class="text-sm lg:text-base font-medium text-grey">
            Select how you would want to make disbursement
          </h6>

          <div class="flex gap-24 my-16">
            <div
              v-for="type in markUpTypes"
              :key="type"
              class="flex gap-x-4 items-baseline"
              :class="{ 'form-group--error': $v.markUpType.$error }"
            >
              <input
                type="radio"
                :id="type"
                :value="type"
                v-model="markUpType"
                :checked="markUpType === type"
              />

              <label :for="type">{{ type }}</label>
              <field-errors
                v-if="$v.markUpType.$error"
                :field="$v.markUpType"
                alt="Please choose a mark up type"
              />
            </div>
          </div>

          <!-- Percentage return -->
          <div
            v-if="markUpType === 'Percentage'"
            :class="{ 'form-group--error': $v.percent_formular.$error }"
          >
            <input
              type="number"
              v-model.number="percent_formular"
              aria-label="Enter percentage return"
              placeholder="Enter percentage return"
            />
            <field-errors
              v-if="$v.percent_formular.$error"
              :field="$v.percent_formular"
              alt="Please enter your share formular"
            />
          </div>

          <!-- Fixed Amount -->
          <div
            v-if="markUpType === 'Fixed'"
            :class="{ 'form-group--error': $v.fixed_formular.$error }"
          >
            <input
              type="number"
              v-model.number="fixed_formular"
              placeholder="Enter Fixed Amount"
              aria-label="Enter Fixed Amount"
            />
            <field-errors
              v-if="$v.fixed_formular.$error"
              :field="$v.fixed_formular"
              alt="Please enter your share formular"
            />
          </div>
        </div>

        <!-- Disbursement schedule -->
        <div class="mt-32">
          <h5 class="text-base font-bold text-black">Disbursement schedule</h5>

          <!-- Disbursement Type - Automated or Scheduled -->
          <div
            class="my-16"
            :class="{ 'form-group--error': $v.disbursementType.$error }"
          >
            <div class="flex gap-x-24 items-center">
              <div
                v-for="type in disbursementTypes"
                :key="type"
                class="flex gap-x-4 items-center"
              >
                <input
                  class="inline-block"
                  type="radio"
                  :id="type"
                  :value="type"
                  :name="type"
                  v-model="disbursementType"
                  :checked="disbursementType === type"
                />

                <label :for="type">{{ type }}</label>
              </div>
            </div>
            <field-errors
              v-if="$v.disbursementType.$error"
              :field="$v.disbursementType"
              alt="Please select a disbursement type for your stakeholder"
            />
          </div>

          <!-- Schedule  -->
          <div
            v-if="disbursementType === 'Scheduled'"
            class="mb-24"
            :class="{
              'form-group--error': $v.holder.schedule.$error,
            }"
          >
            <label for="schedule">Schedule disbursement period</label>

            <select id="schedule" v-model="holder.schedule">
              <option
                v-for="option in schedules"
                :key="option"
                :value="option.value"
              >
                {{ option.text }}
              </option>
            </select>

            <field-errors
              v-if="$v.holder.schedule.$error"
              :field="$v.holder.schedule"
              alt="Please select a schedule"
            />
          </div>
        </div>

        <button class="click-btn my-32" @click.prevent="updateStakeholder">
          Save changes
        </button>
      </div>
    </modal>

    <!-- Delete stakeholder  modal  -->
    <modal v-if="delStakeholderModal" @close="delStakeholderModal = false">
      <div slot="header">
        <h5 class="text-lg lg:text-2xl font-bold text-black">
          Delete Stakeholder
        </h5>
      </div>

      <div slot="body">
        <p>Are you sure you want to delete this stakeholder?</p>

        <button class="click-btn my-32" @click.prevent="delStakeholder()">
          Delete
        </button>
      </div>
    </modal>

    <div class="fixed top-[80px] z-[50]">
      <!-- Back button  -->
      <nuxt-link to="/services"
        ><i class="fas fa-arrow-left text-grey"></i>
      </nuxt-link>
      <!-- title -->
      <h1 class="text-lg lg:text-2xl font-bold text-black mt-28">
        {{ service.title }}
      </h1>
      <!-- description -->
      <p class="text-base text-grey mb-40">
        {{ service.description }}
      </p>
      <!-- Tabs  -->
      <div class="flex gap-x-16 tab mb-40">
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

    <div class="lg:mt-[200px] settings h-[60vh] overflow-y-scroll">
      <!-- Transactions  -->
      <div v-if="tab === 'transaction'">
        <!-- <div v-if="service.transactions.length > 0"> -->
        <div class="grid grid-cols-3 gap-x-20 mt-28 mb-36 ml-4">
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
        <table class="table-auto" v-if="service.stakeholders.length > 0">
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

          <tbody v-for="(holder, i) in service.stakeholders" :key="i">
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
                <button @click="editStakeholder(holder)">
                  <!-- open modal and edit immediately -->
                  <i class="far fa-edit text-[#FB1731]"></i>
                </button>

                <button @click="delHolderModal(holder)">
                  <!-- open modal and click on delHolder to delete -->
                  <i class="fas fa-trash text-[#FB1731]"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="h-[70vh] flex flex-col items-center justify-center" v-else>
          <svg-loader path="img" icon="no-service" />
          <p class="text-sm lg:text-base font-medium text-grey my-28">
            You do not have any stakeholders
          </p>
          <LgBtn url="/">Add Stakeholder</LgBtn>
        </div>
      </div>

      <!-- Settings  -->
      <div v-if="tab === 'setting'">
        <div
          class="grid grid-cols-1 lg:grid-cols-12 gap-y-32 gap-x-60 mt-36 settings overflow-y-scroll h-[60vh]"
        >
          <!-- {{ serviceDetailsEdit }} -->
          <label class="lg:col-span-4 text-lg text-left" for="service-name"
            >Service name</label
          >

          <div class="lg:col-span-6">
            <input
              type="text"
              id="service-name"
              aria-label="Service name"
              placeholder="Enter your service name"
              v-model="serviceEdit.title"
            />
          </div>

          <!-- Description  -->
          <label class="lg:col-span-4 text-lg text-left" for="desc"
            >Description</label
          >

          <div class="lg:col-span-6">
            <textarea rows="5" id="desc" v-model="serviceEdit.description" />
          </div>

          <!-- Receiving account  -->
          <label class="lg:col-span-4 text-lg text-left" for="acct">
            Receiving account
          </label>

          <div class="lg:col-span-6">
            <!-- Bank name   -->
            <div>
              <label for="bank-name" class="text-left">Bank name</label>
              <!-- <input
                type="text"
                id="bank-name"
                aria-label="Service Bank name"
                v-model="serviceEdit.bank_name"
              /> -->
              <select id="bank" @change="updateSelectedBank" ref="bank-inp">
                <option selected :value="JSON.stringify(bank)">
                  {{ bank.name }}
                </option>
                <option
                  v-for="(bank, i) in banks"
                  :key="i"
                  :value="JSON.stringify(bank)"
                >
                  {{ bank.name }}
                </option>
              </select>
            </div>

            <!-- Account number -->
            <div class="my-24">
              <label for="acct-no" class="text-left">Account number</label>
              <input
                type="number"
                id="acct-no"
                aria-label="Account number"
                v-model="serviceEdit.account_no"
              />
            </div>

            <!-- Account name -->
            <div>
              <label for="acct-name" class="text-left">Account name</label>
              <input
                type="text"
                id="acct-name"
                aria-label="Account name"
                v-model="serviceEdit.account_name"
                disabled
              />
            </div>
          </div>

          <div class="lg:col-span-3 lg:col-end-11 mt-32 lg:mt-80">
            <button @click.prevent="updateServiceDetails" class="click-btn">
              Save Changes
            </button>
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
          <div class="col-span-12 lg:col-span-9 mb-48">
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

                  <button
                    class="rounded-xl px-24 py-8 bg-purple text-white"
                    @click="copyString(service.api_public_key_test)"
                  >
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

                  <button
                    class="rounded-xl px-24 py-8 bg-purple text-white"
                    @click="copyString(service.api_private_key_test)"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div class="flex justify-between items-center mt-48">
                <button
                  class="text-xs text-grey underline underline-offset-2"
                  @click="openPdf"
                >
                  Go to document
                </button>
                <button
                  class="text-xs text-grey underline underline-offset-2"
                  @click="regenTestApi"
                >
                  Regenerate APIs
                </button>
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

                  <button
                    class="rounded-xl px-24 py-8 bg-purple text-white"
                    @click="copyString(service.api_public_key)"
                  >
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

                  <button
                    class="rounded-xl px-24 py-8 bg-purple text-white"
                    @click="copyString(service.api_private_key)"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div class="flex justify-between items-center mt-48">
                <button
                  class="text-xs text-grey underline underline-offset-2"
                  @click="openPdf"
                >
                  Go to document
                </button>
                <button
                  class="text-xs text-grey underline underline-offset-2"
                  @click="regenLiveApi"
                >
                  Regenerate APIs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <notifications position="top right" classes="notif" />
  </div>
</template>

<script>
import SvgLoader from '~/components/utils/SvgLoader'
import Modal from '~/components/utils/Modal.vue'
import TransactionCard from '~/components/services/TransactionCard'
import FieldErrors from '@/components/input/validation'
import {
  required,
  minLength,
  maxLength,
  sameAs,
  email,
  numeric,
  minValue,
} from 'vuelidate/lib/validators'
const psSecKey = 'sk_test_9cb75be4f634e009d84825fa5fefa0393a57e09b'

export default {
  layout: 'dashboard',
  components: {
    SvgLoader,
    Modal,
    TransactionCard,
    FieldErrors,
  },

  async asyncData({ $axios, params }) {
    try {
      const res = await $axios.$post('/services/details', {
        id: params.id,
      })
      const service = res.data
      return { service }
    } catch (error) {
      return { error, service: {} }
    }
  },

  validations: {
    singleEmail: { required, email },
    markUpType: { required },
    disbursementType: { required },
    holderBank: { required },
    percent_formular: { required },
    fixed_formular: { required },
    holder: {
      name: { required, minLength: minLength(2) },
      account_no: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(10),
      },
      account_name: { required },
      schedule: { required },
    },
  },

  data: () => ({
    tab: 'transaction',
    txnTab: 'received',
    apiTab: 'staging',

    disabled: 1,

    isShowEdit: false,
    serviceEdit: {},

    banks: [],
    bank: {},
    serviceBank: {},

    editStakeholderModal: false,
    delStakeholderModal: false,
    holder: {},

    markUpTypes: ['Fixed', 'Percentage'],
    disbursementTypes: ['Automated', 'Scheduled'],

    markUpType: '', // fixed or %
    disbursementType: '', //automated or scheduled
    holderBank: {},

    percent_formular: 0,
    fixed_formular: 0,

    tempEmail: [],
    singleEmail: '',
  }),

  methods: {
    async getBanks() {
      try {
        let url = 'https://api.paystack.co/bank'
        let res = await this.$axios.get(url, {
          headers: {
            Authorization: 'Bearer ' + psSecKey,
          },
        })
        this.banks = res.data.data
        this.selectBank(this.serviceEdit.bank_name)
      } catch (error) {
        console.log(error)
      }
    },

    selectBank(name) {
      this.banks.map((bank, i) => {
        if (bank.name === name) {
          this.bank = bank
        }
      })
    },

    changeTab(tab) {
      this.tab = tab
    },

    changeTxnTab(tab) {
      this.txnTab = tab
    },

    changeApiTab(tab) {
      this.apiTab = tab
    },

    async updateServiceDetails() {
      try {
        this.serviceEdit.bank_name = this.bank.name
        this.serviceEdit.bank_code = this.bank.code

        let token = this.$auth.token
        let account = this.$auth.user._id

        const obj = { account }
        const data = { ...obj, ...this.serviceEdit }

        await this.$axios.post(
          '/services/update',

          data,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        this.service = this.serviceEdit

        this.$notify({
          type: 'success',
          text: 'Details Edited Successfully!',
          duration: 5000,
        })
      } catch (error) {
        this.$notify({
          type: 'error',
          text: 'There was an error editing service details. Please try again!',
          duration: 5000,
        })
      }
    },

    updateSelectedBank(e) {
      let data = this.$refs['bank-inp'].value
      this.bank = JSON.parse(data)
    },

    copyString(str) {
      // Create new element
      var el = document.createElement('textarea')
      // Set value (string to be copied)
      el.value = str
      // Set non-editable to avoid focus and move outside of view
      el.setAttribute('readonly', '')
      el.style = { position: 'absolute', left: '-9999px' }
      document.body.appendChild(el)
      // Select text inside element
      el.select()
      // Copy text to clipboard
      document.execCommand('copy')
      // Remove temporary element
      document.body.removeChild(el)

      this.$notify({
        type: 'success',
        text: 'Copied!',
        duration: 5000,
      })
    },

    async regenTestApi() {
      try {
        let token = this.$auth.token
        let account = this.$auth.user._id

        let res = await this.$axios.post(
          '/services/updatekeys/test',
          {
            account,
            id: this.service.id,
          },

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        this.service.api_public_key_test = res.data.data.public_key
        this.service.api_private_key_test = res.data.data.private_key

        this.$notify({
          type: 'success',
          text: 'Staging API Keys have been regenerated successfully',
          duration: 5000,
        })
      } catch (error) {
        this.$notify({
          type: 'error',
          text: 'There was an error regenerating Staging API keys',
          duration: 5000,
        })
      }
    },

    async regenLiveApi() {
      try {
        let token = this.$auth.token
        let account = this.$auth.user._id

        let res = await this.$axios.post(
          '/services/updatekeys/live',
          {
            account,
            id: this.service.id,
          },

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        this.service.api_public_key = res.data.data.public_key
        this.service.api_private_key = res.data.data.private_key

        this.$notify({
          type: 'success',
          text: 'Live API Keys have been regenerated successfully',
          duration: 5000,
        })
      } catch (error) {
        this.$notify({
          type: 'error',
          text: 'There was an error regenerating Live API keys',
          duration: 5000,
        })
      }
    },

    editStakeholder(holder) {
      this.holder = holder
      this.editStakeholderModal = true
    },

    delHolderModal(holder) {
      this.holder = holder
      this.delStakeholderModal = true
    },

    async delStakeholder() {
      try {
        let token = this.$auth.token

        await this.$axios.post(
          '/services/delete-stakeholder',

          {
            service_id: this.service.id,
            account: this.$auth.user._id,
            id: this.holder.id,
          },

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        this.delStakeholderModal = false

        this.$notify({
          type: 'success',
          text: 'Stakeholder deleted successfully!',
          duration: 5000,
        })

        this.service.stakeholders.splice(this.holder, 1)
      } catch (error) {
        this.$notify({
          type: 'error',
          text: 'There was an error deleting stakeholder. Please try again!',
          duration: 5000,
        })
      }
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

  mounted() {
    this.getBanks()
    this.serviceEdit = Object.assign({}, this.service)
    console.log(this.service)
    // this.serviceNew = [...this.serviceEdit, ...this.service]
  },
}
</script>

<style>
/* Hide scrollbar for Chrome, Safari and Opera */
.settings::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.settings {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
