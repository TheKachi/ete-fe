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
            v-model="acctNo"
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
            v-model="acctName"
            disabled
          />
        </div>

        <submit-btn @click="create" class="float-right my-40">Save</submit-btn>
      </div>
    </modal>

    <!-- Add individual stakeholder modal  -->
    <modal
      v-if="indStakeModal.isActive"
      @close="indStakeModal.isActive = false"
    >
      <h5 class="text-lg lg:text-2xl font-bold text-black" slot="header">
        Add a stakeholder
      </h5>

      <div slot="body">
        <!-- Full name and Role  -->
        <div class="grid grid-cols-2 gap-x-16 mb-8">
          <!-- Full Name -->
          <!-- <div :class="{ 'form-group--error': $v.stakeholder.fullName.$error }"> -->
          <div>
            <label :for="stakeholder.fullName">Full name</label>
            <input
              :id="stakeholder.fullName"
              type="text"
              :name="stakeholder.fullName"
              v-model.trim="stakeholder.fullName"
            />

            <!-- <field-errors
              v-if="$v.stakeholder.fullName.$error"
              :field="$v.stakeholder.fullName"
              alt="Stakeholder Name is required"
            /> -->
          </div>

          <!--Role -->
          <!-- <div :class="{ 'form-group--error': $v.stakeholder.roles.$error }"> -->
          <div>
            <label>Role</label>
            <div class="flex flex-col">
              <div
                v-for="role in roles"
                :key="role"
                class="flex gap-x-4 items-center"
              >
                <input
                  type="checkbox"
                  :id="role"
                  :value="role"
                  name="role"
                  v-model="stakeholder.roles"
                />
                <label :for="role">{{ role }}</label>
              </div>
            </div>

            <!-- <field-errors
              v-if="$v.stakeholder.roles.$error"
              :field="$v.stakeholder.roles"
              alt="Select at least one role"
            /> -->
          </div>
        </div>

        <!-- Email  -->
        <!-- <div
          class="mb-24"
          :class="{ 'form-group--error': $v.stakeholder.email.$error }"
        > -->
        <div class="mb-24">
          <label :for="stakeholder.email">Email</label>
          <input
            type="email"
            :id="stakeholder.email"
            :name="stakeholder.email"
            v-model="stakeholder.email"
            aria-label="email"
          />

          <!-- <field-errors
            v-if="$v.stakeholder.email.$error"
            :field="$v.stakeholder.email"
            alt="Stakeholder email is required"
          /> -->
        </div>

        <h5 class="text-base font-bold text-black">Mark-Up Type</h5>
        <h6 class="text-sm lg:text-base font-medium text-grey">
          Select how you would want to make disbursement
        </h6>

        <!-- Mark-Up Type  -->
        <!-- <div
          class="my-24"
          :class="{ 'form-group--error': $v.stakeholder.markUpType.$error }"
        > -->
        <div class="flex gap-16 mt-16">
          <div
            v-for="type in markUpTypes"
            :key="type"
            class="flex gap-x-4 items-center"
          >
            <input
              class=""
              type="radio"
              :id="type"
              :value="type"
              :name="type"
              v-model="stakeholder.markUpType"
              aria-label="Stakeholder Type"
            />

            <label :for="type">{{ type }}</label>
          </div>

          <!-- <field-errors
            v-if="$v.stakeholder.markUpType.$error"
            :field="$v.stakeholder.markUpType"
            alt="Choose type"
          /> -->

          <!-- Percentage return -->
          <!-- <div

            :class="{ 'form-group--error': $v.stakeholder.roi.$error }"
          > -->
          <div v-if="stakeholder.markUpType === 'Percentage'">
            <input
              type="text"
              v-model="stakeholder.roi"
              aria-label="Enter percentage return"
              placeholder="Enter percentage return"
            />
            <!--
            <field-errors
              v-if="$v.stakeholder.roi.$error"
              :field="$v.stakeholder.roi"
              alt="Please add percentage return"
            /> -->
          </div>

          <!-- Fixed Amount -->
          <!-- <div
            v-if="stakeholder.markUpType === 'Fixed'"
            :class="{ 'form-group--error': $v.stakeholder.fixedAmt.$error }"
          > -->
          <div>
            <input
              v-model="stakeholder.fixedAmt"
              aria-label="Enter Fixed Amount"
            />

            <!-- <field-errors
              v-if="$v.stakeholder.fixedAmt.$error"
              :field="$v.stakeholder.fixedAmt"
              alt="Please add Fixed Amount"
            /> -->
          </div>
        </div>

        <hr class="text-medium-grey my-24" />

        <h5 class="text-base font-bold text-black">Bank details</h5>

        <!-- Bank name and Account number  -->
        <div class="grid grid-cols-2 gap-x-16 my-24">
          <!-- Bank Name -->
          <div>
            <label for="bank-name">Bank name</label>
            <select v-model="stakeholder.bank" class="form-select">
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
              v-model="stakeholder.acctNo"
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
            v-model="stakeholder.acctName"
            disable
          />
        </div>

        <hr class="text-medium-grey my-24" />

        <h5 class="text-base font-bold text-black">Disbursement schedule</h5>

        <!-- Disbursement Type -->
        <!-- :class="{ 'form-group--error': $v.disbursementType.$error }" -->

        <div class="mb-24">
          <div class="flex gap-x-4 items-center">
            <div
              v-for="type in disbursementTypes"
              :key="type"
              class="flex gap-x-4 items-center"
            >
              <!-- @change="update"  -->
              <input
                class="inline-block"
                type="radio"
                :id="type"
                :value="type"
                name="type"
                v-model="disbursementType"
              />

              <label :for="type">{{ type }}</label>
            </div>
          </div>

          <!-- <field-errors
            v-if="$v.disbursementType.$error"
            :field="$v.disbursementType"
            alt="Choose disbursement type"
          /> -->
        </div>

        <!-- Disbursement date  -->
        <!-- :class="{ 'form-group--error': $v.schedule.$error }" -->
        <div class="mb-24">
          <label v-if="disbursementType === 'Fixed'"
            >Select a fixed date for disbursement every month</label
          >

          <label v-if="disbursementType === 'Scheduled'"
            >Schedule a disbursement date</label
          >
          <!-- :class="{ 'form-group--error': $v.schedule.$error }" -->

          <div v-show="disbursementType !== ''">
            <input type="date" aria-label="Date" v-model="grp.schedule" />

            <!-- <field-errors
              v-if="$v.schedule.$error"
              :field="$v.schedule"
              alt="Choose Schedule"
            /> -->
          </div>
        </div>
        <slot name="footer">
          <submit-btn @click="addStakeholder">Add stakeholder</submit-btn>
        </slot>
      </div>
    </modal>

    <!-- Add group stakeholder modal  -->
    <modal
      v-if="grpStakeModal.isActive"
      @close="grpStakeModal.isActive = false"
    >
      <h5 class="text-lg lg:text-2xl font-bold text-black" slot="header">
        Add Group stakeholder
      </h5>

      <div slot="body">
        <!-- Group Name -->
        <!-- <div :class="{ 'form-group--error': $v.stakeholder.groupName.$error }"> -->
        <div>
          <label :for="grp.groupName">Group name</label>
          <input
            :id="grp.groupName"
            type="text"
            :name="grp.groupName"
            v-model.trim="grp.groupName"
          />

          <!-- <field-errors
              v-if="$v.stakeholder.fullName.$error"
              :field="$v.stakeholder.fullName"
              alt="Stakeholder Name is required"
            /> -->
        </div>

        <!-- Email  -->
        <!-- <div
          class="mb-24"
          :class="{ 'form-group--error': $v.stakeholder.email.$error }"
        > -->

        <div v-for="(member, i) in grp.members" :key="i">
          <!-- Full Name -->
          <!-- <div :class="{ 'form-group--error': $v.stakeholder.fullName.$error }"> -->
          <div class="mb-24">
            <label for="full-name">Full name</label>
            <input
              id="full-name"
              type="text"
              name="full-name"
              v-model.trim="member.fullName"
            />

            <!-- <field-errors
              v-if="$v.stakeholder.fullName.$error"
              :field="$v.stakeholder.fullName"
              alt="Stakeholder Name is required"
            /> -->
          </div>

          <!-- Email  -->
          <div class="mb-24">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              v-model.lazy="member.email"
            />
            <!--
            <input
              class="text-grey"
              v-model.lazy="grp.member.fullName"
              aria-label="group full name"
            />
            <input
              class="text-grey"
              v-model.lazy="grp.member.email"
              aria-label="group full name"
            /> -->
            <button class="text-purple my-32" @click.prevent="addBank">
              Add new account
            </button>

            <!-- <field-errors
            v-if="$v.stakeholder.email.$error"
            :field="$v.stakeholder.email"
            alt="Stakeholder email is required"
          /> -->
          </div>
        </div>

        <h5 class="text-base font-bold text-black">Bank details</h5>

        <!-- Bank name and Account number  -->
        <div class="grid grid-cols-2 gap-x-16 my-24">
          <!-- Bank Name -->
          <div>
            <label for="bank-name">Bank name</label>
            <select v-model="grp.bank" class="form-select">
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
              v-model="grp.acctNo"
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
            v-model="grp.acctName"
            disable
          />
        </div>

        <hr class="text-medium-grey my-24" />

        <h5 class="text-base font-bold text-black">Disbursement schedule</h5>

        <!-- Disbursement Type -->
        <!-- :class="{ 'form-group--error': $v.grp.disbursementType.$error }" -->

        <div class="mb-24">
          <div class="flex gap-x-4 items-center">
            <div
              v-for="type in disbursementTypes"
              :key="type"
              class="flex gap-x-4 items-center"
            >
              <!-- @change="update"  -->
              <input
                class="inline-block"
                type="radio"
                :id="type"
                :value="type"
                name="type"
                v-model="grp.disbursementType"
              />

              <label :for="type">{{ type }}</label>
            </div>
          </div>

          <!-- <field-errors
            v-if="$v.disbursementType.$error"
            :field="$v.disbursementType"
            alt="Choose disbursement type"
          /> -->
        </div>

        <!-- Disbursement date  -->

        <!--  :class="{ 'form-group--error': $v.grp.schedule.$error }" -->
        <div class="mb-24">
          <label v-if="grp.disbursementType === 'Fixed'"
            >Select a fixed date for disbursement every month</label
          >

          <label v-if="grp.disbursementType === 'Scheduled'"
            >Schedule a disbursement date</label
          >
          <!-- :class="{ 'form-group--error': $v.grp.schedule.$error }" -->
          <div v-show="disbursementType !== ''">
            <input type="date" aria-label="Date" v-model="grp.schedule" />

            <!-- <field-errors
              v-if="$v.grp.schedule.$error"
              :field="$v.grp.schedule"
              alt="Choose Schedule"
            /> -->
          </div>
        </div>
        <slot name="footer">
          <submit-btn @click="addStakeholder">Add stakeholder</submit-btn>
        </slot>
      </div>

      <slot name="footer">
        <submit-btn @click="addStakeholder">Add stakeholder</submit-btn>
      </slot>
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
              @click.prevent="acctModal.isActive = true"
            >
              +Add Account
            </button>
          </div>

          <div class="flex items-center gap-x-28">
            <!--Icon-->
            <i class="fas fa-user text-purple"></i>

            <h3>Stakeholder</h3>

            <!--  Stakeholder  -->
            <button
              @click.prevent="indStakeModal.isActive = true"
              class="text-purple"
            >
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
import Modal from '~/components/utils/Modal.vue'
export default {
  components: { SubmitBtn, fieldErrors },
  layout: 'dashboard',

  data: () => ({
    grp: {
      name: '',
      acctNo: '',
      acctName: '',
      bank: {
        name: '',
        code: '',
      },
      schedule: '',
      disbursementType: '',

      members: [
        {
          fullName: '',
          email: '',
        },
      ],
    },

    title: '',
    fullName: '',
    email: '',
    schedule: '',
    acctModal: {
      isActive: false,
    },
    indStakeModal: {
      isActive: false,
    },
    grpStakeModal: {
      isActive: true,
    },
    roles: ['Can Edit', 'Can View'],
    markUpTypes: ['Fixed', 'Percentage'],
    disbursementTypes: ['Fixed', 'Scheduled'],
    disbursementType: '',
    stakeholder: {
      email: '',
      fullName: '',
      markUpType: '',
      // is_percentage: false, //fixed -  true if Percentage was clicked
      roi: '',
      fixedAmt: '',
      type: '', // individual or group
      acctNo: '',
      acctName: '',
      bank: {
        name: '',
        code: '',
      },
      share_formular: 1000,
      roles: [],
    },

    // isStakeholderModalActive: false,
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
    acctNo: '',
    acctName: '',
    banks: [
      {
        name: 'GT Bank',
      },
      {
        name: 'Eco Bank',
      },
    ],

    accounts: [
      {
        acctNo: '',
        acctName: '',
        bank: {},
      },
    ],
  }),

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

  methods: {
    create() {
      this.$router.push('/dashboard')

      // alert('Created service successfully')
    },

    addStakeholder() {
      alert('Stakeholder added Successfully')
    },

    toggleDropdown() {
      alert('toogle active')
    },
    toggleModal(modal) {
      modal.isActive = !modal.isActive
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
        markUpType: { required },
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
