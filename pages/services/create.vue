<template>
  <div>
    <modal v-if="isAcctModalActive === true">
      <h5 class="text-lg lg:text-2xl font-bold text-black" slot="header">
        Add New Bank Account
      </h5>

      <div v-for="(acct, i) in accounts" :key="i">
        <!-- Bank name and Account number  -->
        <div>
          <label for="bank-name">Bank name</label>
          <select v-model="acct.bank" class="form-select">
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
            class="lg:w-50"
            id="acct-no"
            placeholder="Enter Account number"
            aria-label="Account number"
            v-model.number="acct.acctNo"
          />
        </div>

        <!-- Account name -->
        <div>
          <label for="acct-name">Account name</label>
          <input
            type="text"
            id="acct-name"
            placeholder="Enter Account name"
            aria-label="Account name"
            v-model.number="acct.acctName"
            disable
          />
        </div>
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
          <div class="mb-24" :class="{ 'form-group--error': $v.title.$error }">
            <label :for="title">Name of service</label>
            <input
              type="text"
              :id="title"
              :name="title"
              v-model.trim="title"
              placeholder="Enter name of service"
            />

            <field-errors
              v-if="$v.title.$error"
              :field="$v.title"
              alt="Name of service is required"
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
          <h4 class="text-sm font-medium text-grey">
            Enter account details to recieve money
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
                <div>{{ acct.acctNo }}</div>
              </div>
            </div>

            <!--  Add Account  -->
            <!-- @click.prevent="isAcctModalActive = true" -->

            <button
              class="lg:col-span-3 text-purple"
              @click.prevent="isAcctModalActive = !isAcctModalActive"
            >
              +Add Account
            </button>
          </div>

          <div class="flex items-center gap-x-28">
            <!--Icon-->
            <i class="fas fa-user text-purple"></i>

            <h3>Stakeholder</h3>

            <!--  Stakeholder  -->
            <button @click="toggleDropdown" class="text-purple">
              +Add Stakeholder
            </button>
          </div>

          <submit-btn @click="create" class="float-right"
            >Create Services</submit-btn
          >
        </form>
      </div>
    </div>
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

import SubmitBtn from '~/components/SubmitBtn.vue'
import Modal from '../../components/utils/Modal.vue'
export default {
  components: { SubmitBtn, fieldErrors },
  layout: 'dashboard',

  data: () => ({
    isAcctModalActive: false,
    isStakeholderModalActive: false,
    bankAcctShowing: false,
    title: '',
    description: '',
    bankAcct: [
      {
        acctNo: '123456745',
        acctName: 'Test User',
        bank: {},
      },
    ],

    bank: {},
    banks: [
      {
        name: 'GT Bank',
      },
      {
        name: 'Eco Bank',
      },
    ],
  }),
  methods: {
    create() {
      this.$router.push('/dashboard')

      // alert('Created service successfully')
    },

    toggleDropdown() {
      alert('toogle active')
    },

    addAcct() {
      this.accounts.push({
        acctNo: '',
        acctName: '',
        bank: {},
      })
    },
  },

  validations() {
    let valObj = {
      title: {
        required,
        minLength: minLength(4),
      },

      disbursementType: {
        required,
      },

      schedule: {
        required,
      },

      stakeholder: {
        email: { required },
        name: { required },
        amtType: { required },
        type: { required },
        share_formular: {
          required,
          numeric,
          minValue: minValue(this.minAmount),
        },
        roles: { required },
      },
    }
    return valObj
  },

  components: {
    Modal,
  },
}
</script>

<style></style>
