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
          <label for="bank-name">Bank name</label>
          <select v-model="bank" class="form-select">
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
            type="text"
            class=""
            id="acct-no"
            placeholder="Enter Account number"
            aria-label="Account number"
            v-model="account_no"
          />
        </div>

        <!-- Account name -->
        <div>
          <label for="acct-name">Account name</label>
          <input
            type="text"
            id="acct-name"
            placeholder="Account name"
            aria-label="Account name"
            v-model="account_name"
            disabled
          />
        </div>

        <submit-btn class="float-right my-40">Save</submit-btn>
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
        <!-- Full name and Role  -->
        <div class="grid grid-cols-2 gap-x-16 mb-8">
          <!-- Full Name -->
          <div>
            <label for="stakeholder-name" v-if="holder.type === 'individual'"
              >Full name</label
            >
            <label for="stakeholder-name" v-if="holder.type === 'group'"
              >Group name</label
            >
            <input
              id="stakeholder-name"
              type="text"
              v-model.trim="holder.name"
            />
          </div>

          <!--Role - Individual -->
          <div v-if="holder.type === 'individual'">
            <label for="role">Role</label>
            <select id="role" name="role" v-model="holder.role">
              <option value="stakeholder">Stakeholder</option>
            </select>
          </div>
        </div>

        <!-- Add members - Group  -->
        <h5
          class="text-base font-bold text-black"
          v-if="holder.type === 'group'"
        >
          Add members
        </h5>

        <!-- Email  -->
        <div class="mb-24">
          <label for="stakeholder-email">Email</label>
          <input
            type="email"
            id="stakeholder-email"
            name="stakeholder-email"
            v-model="holder.email"
            v-if="holder.type === 'individual'"
          />
          <input
            type="email"
            id="stakeholder-email"
            name="stakeholder-email"
            placeholder="Email, space seperated"
            v-model="holder.email"
            v-if="holder.type === 'group'"
            @keyup.space="addGroupEmail"
          />
        </div>

        <!-- Members emails list - Group  -->
        <div
          class="flex flex-wrap gap-x-4 gap-y-16"
          v-if="holder.type === 'group'"
        >
          <div
            class="bg-white flex gap-8 items-center justify-center border border-grey rounded p-8"
          >
            <div>{{ holder.email }}</div>
            <i class="fas fa-times" @click="removeGroupEmail"></i>
          </div>
        </div>

        <!-- Mark-Up Type - Fixed or Percentage  -->
        <div>
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
              type="number"
              v-model.number="holder.share_formular"
              aria-label="Enter percentage return"
              placeholder="Enter percentage return"
            />
          </div>

          <!-- Fixed Amount -->
          <div v-if="markUpType === 'Fixed'">
            <input
              type="number"
              v-model.number="holder.share_formular"
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
              <label for="bank-name">Bank name</label>
              <select v-model="holder.bank" class="form-select">
                <option disabled selected :value="{}">Select Bank</option>
                <option v-for="(bank, i) in banks" :key="i" :value="bank">
                  {{ bank.name }}
                </option>
              </select>
            </div>

            <!-- Account number -->
            <div>
              <label for="acct-no">Account number</label>
              <input
                type="text"
                class="lg:w-50"
                id="acct-no"
                placeholder="Enter Account number"
                aria-label="Account number"
                v-model="holder.account_no"
              />
            </div>
          </div>

          <!-- Account name -->
          <div>
            <label for="acct-name">Account name</label>
            <input
              type="text"
              id="acct-name"
              placeholder="Enter Account name"
              aria-label="Account name"
              v-model="holder.account_name"
              disable
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
          <!-- :class="{ 'form-group--error': $v.title.$error }" -->
          <div class="mb-24">
            <label :for="title">Name of service</label>
            <input
              type="text"
              :id="title"
              :name="title"
              v-model.trim="title"
              placeholder="Enter name of service"
            />
            <!--
            <field-errors
              v-if="$v.title.$error"
              :field="$v.title"
              alt="Name of service is required"
            /> -->
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

          <h4 class="text-sm font-medium text-grey">
            Enter account details to receive money
          </h4>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-x-28 my-24">
            <!-- Select Account  -->
            <div
              @click="bankAcctShowing = !bankAcctShowing"
              class="lg:col-span-6"
            >
              <div
                class="flex items-center justify-between cursor-pointer py-12 px-24 rounded-md bg-white border border-medium-grey text-black text-base focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple;"
              >
                <p>Select Account</p>
                <i class="fas fa-chevron-down"></i>
              </div>
            </div>

            <div v-if="(bankAcctShowing = true)">
              <div v-for="(acct, i) in accounts" :key="i">
                <!-- {{acct.}} -->
                <div>{{ acct.account_no }}</div>
              </div>
            </div>

            <!--  Add Account  -->
            <!-- @click.prevent="isAcctModalActive = true" -->

            <button
              class="lg:col-span-3 text-purple"
              @click.prevent="acctModal.isActive = true"
            >
              +Add Account
            </button>
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
              <p class="text-sm text-grey">
                {{ holder.email }}
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
              {{ formatNum(holder.share_formular) }} %
              <span class="text-grey text-sm">returns</span>
            </p>

            <p
              class="text-base text-blue"
              v-if="holder.is_percentage === false"
            >
              ₦{{ formatNum(holder.share_formular) }}
            </p>

            <p class="text-purple text-sm">{{ holder.role }}</p>
          </div>
        </div>
      </div>
    </div>

    <click-btn @click="createService" class="float-right mt-48"
      >Create Services</click-btn
    >
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
    holder: {
      email: 'individual@gmail.com',
      name: 'Kachi Individual',
      is_percentage: false,
      is_automated: true,
      share_formular: null,
      type: '',
      account_no: '0234567890',
      account_name: 'Kachi Individual',
      bank_name: '',
      bank_code: '737',
      schedule: '',
      role: 'Stakeholder',
    },
    markUpType: '', // fixed or %
    disbursementType: '', //automated or scheduled
    accounts: [
      {
        account_no: '',
        account_name: '',
        bank: {
          name: '',
          code: '',
        },
      },
    ],
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

    banks: [
      {
        name: 'GT Bank',
      },
      {
        name: 'Eco Bank',
      },
    ],
    stakeDropdown: false,

    showStakeDetails: false,
  }),

  methods: {
    // async createService() {
    //   try {
    //     let token = this.$auth.token

    //     let res = await this.$axios.post(
    //       '/services/create',

    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       }
    //     )

    //     console.log(res)
    //   } catch (error) {
    //     console.log({ error })
    //   }
    // },

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

      this.stakeholders.push(this.holder)

      this.holder = {
        email: '',
        name: '',
        is_percentage: false,
        is_automated: true,
        share_formular: null,
        type: '',
        account_no: '',
        account_name: '',
        bank_name: '',
        bank_code: '',
        schedule: '',
        role: '',
      }
      ;(this.markUpType = ''),
        (this.disbursementType = ''),
        console.log(this.stakeholders)
      this.stakeholderModal.isActive = false
    },

    addGroupEmail() {},

    removeGroupEmail() {},

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

    formatNum(num) {
      return num.toLocaleString('en-US')
    },
  },

  // validations() {
  //   let valObj = {
  //     title: {
  //       required,
  //       minLength: minLength(4),
  //     },

  //     disbursementType: {
  //       required,
  //     },

  //     schedule: {
  //       required,
  //     },

  //     stakeholder: {
  //       email: { required },
  //       name: { required },
  //       markUpType: { required },
  //       type: { required },
  //       share_formular: {
  //         required,
  //         numeric,
  //         minValue: minValue(this.minAmount),
  //       },
  //       roles: { required },
  //     },
  //   }
  //   return valObj
  // },

  components: {
    Modal,
    ClickBtn,
  },
}
</script>

<style lang="postcss" scoped>
.card {
  @apply bg-white p-20 pb-28 rounded-md shadow-[0_4px_50px_rgba(0,0,0,0.1)];
}
</style>
