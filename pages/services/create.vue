<template>
  <div>
    <!-- Add account modal  -->
    <modal v-if="acctModal.isActive" @close="acctModal.isActive = false">
      <h5 class="text-lg lg:text-2xl font-bold text-black" slot="header">
        Add New Bank Account
      </h5>

      <div slot="body">
        <!-- Bank name   -->
        <div>
          <label for="bank">Bank name</label>
          <select v-model="serviceBank" id="bank">
            <option disabled selected :value="{}">Select Bank</option>
            <option v-for="(bank, i) in banks" :key="i" :value="bank">
              {{ bank.name }}
            </option>
          </select>
        </div>

        <!-- Account number -->
        <div class="my-24">
          <label for="acct-no">Account number</label>
          <input
            type="number"
            id="acct-no"
            placeholder="Enter Account number"
            aria-label="Account number"
            v-model="account_no"
          />
        </div>
        <!-- @keyup="getAccountName" -->

        <!-- Account name -->
        <div>
          <label for="acct-name">Account name</label>
          <input
            type="text"
            id="acct-name"
            placeholder="Account name"
            aria-label="Account name"
            v-model="account_name"
          />
        </div>

        <button
          class="click-btn float-right my-32"
          @click.prevent="addServiceAcct"
        >
          Add
        </button>
      </div>
    </modal>

    <!-- Add stakeholder modal  -->
    <modal
      v-if="stakeholderModal.isActive"
      @close="stakeholderModal.isActive = false"
    >
      <h5 class="text-lg lg:text-2xl font-bold text-black" slot="header">
        Add <span v-if="holder.type === 'individual'">Individual</span>
        <span v-else>Group</span> stakeholder
      </h5>

      <div slot="body">
        <!-- Full name and Role - Individual  -->
        <div
          class="grid grid-cols-2 gap-x-16 mb-16"
          v-if="holder.type === 'individual'"
        >
          <!-- Full Name -->
          <div>
            <label for="stakeholder-name">Full name</label>
            <input
              id="stakeholder-name"
              type="text"
              v-model.trim="holder.name"
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
        <div v-if="holder.type === 'group'" class="mb-24">
          <label for="stakeholder-name">Group name</label>
          <input id="stakeholder-name" type="text" v-model.trim="holder.name" />
        </div>

        <!-- Add members - Group  -->
        <h5
          class="text-base font-bold text-black mb-16"
          v-if="holder.type === 'group'"
        >
          Add members
        </h5>

        <!-- Email  -->
        <div class="mb-16">
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
            >
              <input
                type="radio"
                :id="type"
                :value="type"
                v-model="markUpType"
              />

              <label :for="type">{{ type }}</label>
            </div>
          </div>

          <!-- Percentage return -->
          <div v-if="markUpType === 'Percentage'">
            <input
              type="text"
              v-model="holder.share_formular"
              aria-label="Enter percentage return"
              placeholder="Enter percentage return"
            />
          </div>

          <!-- Fixed Amount -->
          <div v-if="markUpType === 'Fixed'">
            <input
              type="text"
              v-model="holder.share_formular"
              placeholder="Enter Fixed Amount"
              aria-label="Enter Fixed Amount"
            />
          </div>
        </div>

        <hr class="text-medium-grey my-24" />

        <!-- Bank details  -->
        <div>
          <h5 class="text-base font-bold text-black">Bank details</h5>

          <!-- Bank name and Account number  -->
          <div class="grid grid-cols-2 gap-x-16 my-16">
            <!-- Bank Name -->
            <div>
              <label for="holder-bank-name">Bank name</label>
              <select
                v-model="holderBank"
                id="holder-bank-name"
                class="form-select"
              >
                <option disabled selected :value="{}">Select Bank</option>
                <option v-for="(bank, i) in banks" :key="i" :value="bank">
                  {{ bank.name }}
                  <!-- {{ temp.bank.name }} -->
                </option>
              </select>
            </div>

            <!-- Account number -->
            <div>
              <label for="holder-acct-no">Account number</label>
              <input
                type="number"
                class="lg:w-50"
                id="holder-acct-no"
                placeholder="Enter Account number"
                aria-label="Account number"
                v-model="holder.account_no"
              />
            </div>
          </div>

          <!-- Account name -->
          <div>
            <label for="holder-acct-name">Account name</label>
            <input
              type="text"
              id="holder-acct-name"
              placeholder="Enter Account name"
              aria-label="Account name"
              v-model="holder.account_name"
            />
          </div>
        </div>

        <hr class="text-medium-grey my-24" />

        <!-- Disbursement schedule -->
        <div>
          <h5 class="text-base font-bold text-black">Disbursement schedule</h5>

          <!-- Disbursement Type - Automated or Scheduled -->
          <div class="my-16">
            <div class="flex gap-x-24 items-center">
              <div
                v-for="type in disbursementTypes"
                :key="type"
                class="flex gap-x-4 items-baseline"
              >
                <input
                  class="inline-block"
                  type="radio"
                  :id="type"
                  :value="type"
                  :name="type"
                  v-model="disbursementType"
                />

                <label :for="type">{{ type }}</label>
              </div>
            </div>
          </div>

          <!-- Schedule  -->
          <div class="mb-24" v-if="disbursementType === 'Scheduled'">
            <label for="schedule">Schedule a disbursement date</label>

            <select id="schedule" v-model="holder.schedule">
              <option
                v-for="option in schedules"
                :key="option"
                :value="option.value"
              >
                {{ option.text }}
              </option>
            </select>
          </div>
        </div>

        <slot name="footer">
          <button class="click-btn my-32" @click.prevent="addStakeholder">
            Add stakeholder
          </button>
        </slot>
      </div>
    </modal>

    <div class="grid lg:grid-cols-12 gap-y-32 gap-x-60 justify-between">
      <div class="col-span-12 lg:col-span-9">
        <h1 class="text-lg lg:text-2xl font-bold text-black">
          Create New Service
        </h1>
        <h2 class="text-sm lg:text-base font-medium text-grey">
          Create and monitor your disbursement settlement among stakeholders
        </h2>

        <form class="mt-40">
          <!-- Name of service -->
          <div class="mb-24">
            <label :for="title">Name of service</label>
            <input
              type="text"
              :id="title"
              :name="title"
              v-model.trim="title"
              placeholder="Enter name of service"
            />
          </div>

          <!-- Description  -->
          <div class="mb-24">
            <label for="desc">Description</label>

            <textarea
              rows="3"
              placeholder="Enter Message"
              id="desc"
              v-model="description"
            />
          </div>

          <hr class="text-medium-grey mb-24" />

          <h3 class="text-base lg:text-lg font-bold text-black">
            Receiving account
          </h3>

          <h4 class="text-sm font-medium text-grey mb-24">
            Enter account details to receive money
          </h4>

          <!-- <div class="grid grid-cols-1 lg:grid-cols-12 gap-x-28 my-24"> -->
          <div>
            <!-- Select Account  -->
            <!-- <div
              @click="bankAcctShowing = !bankAcctShowing"
              class="lg:col-span-6"
            >
              <div
                class="flex items-center justify-between cursor-pointer py-12 px-24 rounded-md bg-white border border-medium-grey text-black text-base focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple;"
              >
                <p>Select Account</p>
                <i class="fas fa-chevron-down"></i>
              </div>
            </div> -->

            <!-- <div v-if="(bankAcctShowing = true)">
              <div v-for="(acct, i) in accounts" :key="i">
                <div>{{ acct.account_no }}</div>
              </div>
            </div> -->
            <!-- <select id="account" v-model="serviceBank" aria-label="account">
              <option
                v-for="option in serviceBank"
                :key="option"
                :value="option.value"
              >
                {{ option.text }}
              </option>
            </select> -->
            <!--  Add Account  -->
            <button
              class="lg:col-span-3 text-purple mb-24"
              @click.prevent="acctModal.isActive = true"
              v-if="bank_name === ''"
            >
              +Add Account
            </button>

            <!-- Account Card  -->
            <!-- <span
                  class="rounded-[50%] h-28 w-28 leading-[28px] bg-[#D8DDFD] text-blue text-center text-sm font-bold"
                >
                  {{ bank_name.charAt(0) }}
                </span> -->

            <div class="grid grid-cols-3 my-40" v-if="bank_name != ''">
              <div
                class="col-span-2 mb-12 px-24 py-16 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] rounded-[10px]"
              >
                <div class="flex justify-between items-start">
                  <div>
                    <h4 class="text-base text-black font-medium">
                      {{ bank_name }}
                    </h4>

                    <h5 class="text-xs text-black font-medium">
                      {{ account_name }} :
                      <span class="text-purple">{{ account_no }}</span>
                    </h5>
                  </div>

                  <div class="flex gap-x-16">
                    <button
                      @click.prevent="acctModal.isActive = true"
                      class="text-xs text-grey"
                    >
                      <i class="fas fa-pen"></i>
                    </button>
                    <button @click.prevent="removeServiceAcct" class="">
                      <i class="fas fa-times text-black"></i>
                    </button>
                  </div>
                </div>

                <!-- <a href="" class="text-xs text-grey">Edit</a> -->
              </div>
            </div>
          </div>

          <div class="flex items-center gap-x-28">
            <!--Icon-->
            <i class="fas fa-user text-purple"></i>

            <h3>Stakeholder</h3>

            <div class="relative">
              <button
                @click.prevent="stakeDropdown = !stakeDropdown"
                class="bg-[#D8DDFD] rounded-md text-blue px-20 py-12 flex items-center gap-x-8"
              >
                Add <i class="fas fa-chevron-down"></i>
              </button>
              <ul
                v-if="stakeDropdown"
                class="menu-list absolute bg-white flex flex-col cursor-pointer w-[158px] rounded-md shadow py-20"
              >
                <li>
                  <button @click.prevent="ind">Individual</button>
                </li>

                <li>
                  <button @click.prevent="grp">Group</button>
                </li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Stakeholders list -->
    <div
      class="grid lg:grid-cols-3 gap-16 lg:gap-32 my-40"
      v-if="stakeholders.length > 0"
    >
      <!-- <div class="col-span-3" v-="">
      Individual
    </div> -->
      <div v-for="holder in stakeholders" :key="holder">
        <div class="card">
          <div class="flex gap-x-[18px] items-start mb-28">
            <span
              class="rounded-[50%] h-28 w-28 leading-[28px] bg-[#D8DDFD] text-blue text-center text-sm font-bold"
            >
              {{ holder.name.charAt(0) }}
            </span>

            <div>
              <h5 class="text-base text-black font-medium">
                {{ holder.name }}
              </h5>
              <p class="text-sm text-grey" v-if="holder.type === 'individual'">
                {{ singleEmail }}
              </p>
              <p class="text-sm text-grey" v-if="holder.type === 'group'">
                {{}} members
              </p>
            </div>

            <button
              @click.prevent="showStakeDetails = !showStakeDetails"
              class="ml-auto"
            >
              <i class="fas fa-ellipsis-v text-[#b3b3b3]"></i>
            </button>
          </div>

          <div class="flex justify-between items-baseline">
            <p
              class="text-base text-[#7445C7]"
              v-if="holder.is_percentage === true"
            >
              <!-- {{ formatNum(holder.share_formular) }} % -->
              {{ holder.share_formular }} %
              <span class="text-grey text-sm">returns</span>
            </p>

            <p
              class="text-base text-blue"
              v-if="holder.is_percentage === false"
            >
              <!-- ₦{{ formatNum(holder.share_formular) }} -->
              ₦{{ holder.share_formular }}
            </p>

            <p class="text-purple text-sm">{{ holder.role }}</p>
          </div>
        </div>
      </div>
    </div>

    <button @click="createService" class="click-btn float-right mt-48">
      Create Services
    </button>
  </div>
</template>

<script>
import fieldErrors from '@/components/input/validation'
import {
  required,
  minLength,
  maxLength,
  sameAs,
  email,
  numeric,
  minValue,
} from 'vuelidate/lib/validators'

import ClickBtn from '~/components/ClickBtn.vue'
import Modal from '~/components/utils/Modal.vue'

const psSecKey = 'sk_test_9cb75be4f634e009d84825fa5fefa0393a57e09b'

export default {
  components: { ClickBtn, fieldErrors },

  layout: 'dashboard',

  data: () => ({
    title: '',
    description: '',
    account_no: '',
    account_name: '',
    bank_name: '',
    bank_code: '',
    stakeholders: [],

    serviceBank: {},
    holderBank: {},

    tempEmail: [],
    indEmail: '',

    holder: {
      email: '',
      name: '',
      is_percentage: false,
      is_automated: true,
      share_formular: '',
      type: '',
      account_no: '',
      account_name: '',
      bank_name: '',
      bank_code: '',
      schedule: '',
      role: '',
    },
    // bank: {},
    singleEmail: '',
    markUpType: '', // fixed or %
    disbursementType: '', //automated or scheduled
    accounts: [],
    acctModal: {
      isActive: false,
    },
    stakeholderModal: {
      isActive: false,
    },
    grpStakeModal: {
      isActive: false,
    },
    // roles: ['Can Edit', 'Can View'],
    markUpTypes: ['Fixed', 'Percentage'],
    disbursementTypes: ['Automated', 'Scheduled'],
    schedules: [
      { text: '1 day', value: '1' },
      { text: '2 days', value: '2' },
      { text: '7 days', value: '7' },
      { text: '28 days', value: '28' },
    ],

    bankAcctShowing: false,

    banks: [],

    stakeDropdown: false,

    showStakeDetails: false,
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
      } catch (error) {
        console.log(error)
      }
    },

    async getAccountName() {
      if (this.account_no.toString().length == 10) {
        // this.$v.bank.code.$touch();
        // if (this.$v.bank.code.$pending || this.$v.bank.code.$error) return;

        // this.isLoading = true;
        // this.mgs = "Verifying account details...";

        try {
          let url = `https://api.paystack.co/bank/resolve?account_number=${this.account_no}&bank_code=${this.bank.code}`
          let res = await this.$axios.get(url, {
            headers: {
              Authorization: 'Bearer ' + psSecKey,
            },
          })
          // console.log('account number: ' + this.account_no)
          // console.log('bank code: ' + this.bank.code)
          console.log(res)
          this.account_name = res.data.data.account_name

          //  this.isLoading = false;
        } catch (error) {
          //  this.isLoading = false;
          console.log({ error })
        }
      }
    },

    async createService() {
      // let data = {
      //   title: this.title,
      //   description: this.description,
      //   account_no: this.account_no,
      //   account_name: this.account_name,
      //   bank_name: this.bank_name,
      //   bank_code: this.bank_code,
      //   stakeholders: this.stakeholders,
      // }
      // console.log(data)
      // this.$router.push('/services')

      try {
        let token = this.$auth.token

        let res = await this.$axios.post(
          '/services/create',
          {
            title: this.title,
            description: this.description,
            account_no: this.account_no,
            account_name: this.account_name,
            bank_name: this.bank_name,
            bank_code: this.bank_code,
            stakeholders: this.stakeholders,
          },

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        console.log(res)
        this.$router.push('/services')
      } catch (error) {
        console.log({ error })
      }
    },

    addEmail() {
      this.tempEmail.push(this.singleEmail)
      this.holder.email = this.tempEmail.toString()
      this.singleEmail = ''
    },

    addServiceAcct() {
      this.bank_name = this.serviceBank.name
      this.bank_code = this.serviceBank.code
      this.acctModal.isActive = false
      // this.bank_name = ''
      // this.bank_code = ''
    },

    addAcct() {
      this.accounts.push({
        account_no: '',
        account_name: '',
        bank: {},
      })
    },

    addStakeholder() {
      if (this.markUpType === 'Percentage') {
        this.holder.is_percentage = true
      } else {
        this.holder.is_percentage = false
      }

      if (this.disbursementType === 'Automated') {
        this.holder.is_automated = true
      } else {
        this.holder.is_automated = false
      }

      if (this.holder.type === 'individual') {
        this.holder.email = this.singleEmail
      }

      if (this.holder.type === 'group') {
        this.holder.email = this.tempEmail.toString()
      }

      this.holder.bank_name = this.holderBank.name
      this.holder.bank_code = this.holderBank.code

      this.stakeholders.push(this.holder)

      this.holder = {
        email: '',
        name: '',
        is_percentage: false,
        is_automated: true,
        share_formular: '',
        type: '',
        account_no: '',
        account_name: '',
        bank_name: '',
        bank_code: '',
        schedule: '',
        role: '',
      }
      this.serviceBank = {}
      this.holderBank = {}
      this.tempEmail = []
      this.markUpType = ''
      this.disbursementType = ''
      // this.temp = {}
      console.log(this.stakeholders)
      this.stakeholderModal.isActive = false
    },

    groupMemberLength() {
      return this.holder.email.split(',').length()
    },

    removeGroupEmail(index) {
      this.tempEmail.splice(index, 1)
    },

    removeServiceAcct() {
      this.bank_name = ''
      this.account_no = ''
      this.bank_name = ''
      this.account_name
    },

    ind() {
      this.stakeholderModal.isActive = true
      this.holder.type = 'individual'
      this.stakeDropdown = false
    },

    grp() {
      this.stakeholderModal.isActive = true
      this.holder.type = 'group'
      this.stakeDropdown = false
    },

    // formatNum(num) {
    //   return num.toLocaleString('en-US')
    // },
  },

  components: {
    Modal,
    ClickBtn,
  },

  mounted() {
    this.getBanks()
  },

  computed: {},
}
</script>

<style lang="postcss" scoped>
.card {
  @apply bg-white p-20 pb-28 rounded-md shadow-[0_4px_50px_rgba(0,0,0,0.1)];
}
</style>
