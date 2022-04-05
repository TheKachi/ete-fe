<template>
  <div>
    <!-- Tabs  -->
    <div class="flex gap-x-24 tab fixed z-50">
      <button
        @click.prevent="changeTab('profile')"
        :class="[tab === 'profile' ? 'bg-dark text-white' : 'bg-tab text-grey']"
      >
        Profile
      </button>

      <button
        @click.prevent="changeTab('bank')"
        :class="[tab === 'bank' ? 'bg-dark text-white' : 'bg-tab text-grey']"
      >
        Bank Details
      </button>

      <button
        @click.prevent="changeTab('user')"
        :class="[tab === 'user' ? 'bg-dark text-white' : 'bg-tab text-grey']"
      >
        User Management
      </button>
    </div>

    <div v-if="tab === 'profile'">
      <div class="grid lg:grid-cols-12 gap-y-32 gap-x-60 mt-96">
        <div class="lg:col-span-5">
          <h1 class="text-lg lg:text-2xl font-bold text-black">Profile</h1>
          <h2 class="text-sm lg:text-base font-medium text-grey">
            Fill in your personal and company information
          </h2>
        </div>

        <div class="lg:col-span-6 lg:col-end-12">
          <!-- First name and Last name  -->
          <div class="grid grid-cols-2 gap-x-16 mb-24">
            <!-- First Name -->
            <div>
              <label>First name</label>
              <div class="form-control lg:w-50">{{ $auth.user.firstname }}</div>
            </div>

            <!-- Last Name -->
            <div>
              <label>Last name</label>
              <div class="form-control lg:w-50">{{ $auth.user.lastname }}</div>
            </div>
          </div>

          <!-- Email -->
          <div class="mb-24">
            <label>Email Address</label>
            <div class="form-control">{{ $auth.user.email }}</div>
          </div>

          <!-- Phone number -->
          <div class="mb-24">
            <label>Phone number</label>
            <div class="form-control">{{ $auth.user.phone }}</div>

            <!-- <input
              type="number"
              placeholder="Enter your phone number"
              aria-label="Phone number"
              v-model="profile.phone"
            /> -->
          </div>

          <!-- Gender  -->
          <div class="mb-24 flex gap-x-24 items-center">
            <label class="">Gender</label>
            <div class="mr-8 flex gap-4 items-baseline">
              <input
                type="radio"
                name="gender"
                id="male"
                v-model="profile.gender"
                value="male"
              />
              <label for="male"> Male </label>
            </div>

            <div class="flex gap-4 items-baseline">
              <input
                type="radio"
                name="gender"
                id="female"
                v-model="profile.gender"
                value="female"
              />
              <label for="female"> Female </label>
            </div>
          </div>

          <!-- Company name  -->
          <!-- <div v-if="!profile.isUpdated">
          <label for="company">Company name (optional)</label>
          <input
            type="text"
            id="companyName"
            v-model.trim="profile.companyname"
            placeholder="Enter the name of your company"
            aria-label="Company name"
          />-->

          <!-- company name  -->
          <div class="mb-24">
            <label for="company">Company name (optional)</label>
            <input
              type="text"
              id="companyName"
              v-model.trim="profile.companyname"
              aria-label="Company name"
              placeholder="Enter your company name"
            />
          </div>
        </div>

        <div class="lg:col-span-5">
          <h1 class="text-lg lg:text-2xl font-bold text-black">Password</h1>
          <h2 class="text-sm lg:text-base font-medium text-grey">
            Change your old password to a new one
          </h2>
        </div>

        <div class="lg:col-span-6 lg:col-end-12">
          <button
            class="px-0 text-base text-purple"
            @click.prevent="isResetActive = !isResetActive"
          >
            <span> Change password</span>
            <i
              class="fas fa-angle-right text-purple lg:ml-144"
              v-if="!isResetActive"
            ></i>
            <i class="fas fa-angle-down text-purple ml-96" v-else></i>
          </button>

          <div v-if="isResetActive === true" class="my-32">
            <!-- Old Password -->
            <div>
              <label for="oldPassword">Old Password</label>

              <input
                type="password"
                id="oldPassword"
                placeholder="Old Password"
                v-model="oldPassword"
              />
            </div>

            <!-- New Password -->
            <div class="mt-24">
              <label for="newPassword">New Password</label>

              <input
                type="password"
                id="password"
                v-model="newPassword"
                placeholder="New Password"
                aria-label="New Password"
              />
            </div>
          </div>

          <submit-btn @click="create" class="float-right mt-32 lg:mt-80"
            >Save Changes</submit-btn
          >
        </div>
      </div>
    </div>

    <div v-if="tab === 'bank'">
      <div class="grid lg:grid-cols-12 gap-y-32 gap-x-60 mt-96">
        <div class="lg:col-span-5">
          <h1 class="text-lg lg:text-2xl font-bold text-black">Bank Details</h1>
          <h2 class="text-sm lg:text-base font-medium text-grey">
            Add your bank account details
          </h2>
        </div>

        <div class="lg:col-span-6 lg:col-end-12 gap-y-24">
          <div v-for="(acc, i) in accounts" :key="i">
            <!-- Bank name and Account number  -->
            <div class="grid grid-cols-2 gap-x-16 my-24">
              <!-- Bank Name -->
              <!-- @change="getAccount" -->
              <div>
                <label for="bank-name">Bank name</label>
                <select v-model="acc.bank" class="form-select">
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
                  v-model.number="acc.acctNo"
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
                v-model.number="acc.acctName"
                disable
              />
            </div>
          </div>

          <div class="float-right flex flex-col">
            <button class="text-purple my-32" @click.prevent="addBank">
              Add new account
            </button>

            <submit-btn @click="create" class="mt-32 lg:mt-80 ml-auto"
              >Save Changes</submit-btn
            >
          </div>
        </div>
      </div>
    </div>

    <div v-if="tab === 'user'">
      <div class="grid lg:grid-cols-12 mt-96">
        <div class="col-span-12 lg:col-span-4">
          <div class="flex gap-0">
            <button
              @click.prevent="changeUserMgtTab('users')"
              :class="[
                userTab === 'users'
                  ? 'bg-[#ECEEFE] text-purple border-b-4 border-purple'
                  : 'bg-tab text-grey',
              ]"
            >
              User
            </button>

            <button
              @click.prevent="changeUserMgtTab('roles')"
              :class="[
                userTab === 'roles'
                  ? 'bg-[#ECEEFE] text-purple border-b-4 border-purple'
                  : 'bg-tab text-grey',
              ]"
            >
              Roles & Permissions
            </button>
          </div>
        </div>

        <div class="col-span-12 lg:col-span-7 lg:col-end-13">
          <div class="flex items-center gap-32">
            <!-- Search -->
            <div
              class="bg-[#fafafa] text-gray dark:text-white shadow rounded pl-28 pr-12 flex items-center gap-x-24 search"
            >
              <i class="fas fa-search text-grey"></i>

              <input
                type="text"
                placeholder="Search user"
                aria-label="Search user"
                v-model="searchQuery"
                class="outline-none w-full"
              />

              <button
                v-show="searchQuery !== ''"
                @click="clearSearch"
                class="ml-auto"
              >
                <i class="fas fa-times text-grey"></i>
              </button>
            </div>

            <!-- Create  -->
            <submit-btn @click="create" class="">Create User</submit-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SubmitBtn from '../components/SubmitBtn.vue'
export default {
  layout: 'dashboard',
  data: () => ({
    tab: 'profile',
    userTab: 'users',
    searchQuery: '',
    profile: {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      companyname: '',
      gender: '',
    },
    accounts: [
      {
        acctNo: '',
        acctName: '',
        bank: {},
      },
    ],

    bankDetails: {
      bank: 'GT Bank',
      acctName: 'Lorem Ipsum',
      acctNo: '0123456778',
    },

    bank: {},

    banks: [
      {
        name: 'GT Bank',
      },
      {
        name: 'Eco Bank',
      },
    ],

    create() {
      alert('Changes saved')
    },

    isResetActive: false,
  }),

  // async asyncData({ $axios, params, store }) {
  //   try {
  //     //  let id = store.$auth.$state.user._id;
  //     let res = await $axios.$post('/user/profile', {
  //       id: this.id,
  //     })

  //     console.log({ res })

  //     return {
  //       profile: res,
  //       // bank: res.bank,
  //       // secu: {
  //       //    devices: res.devices
  //       // },
  //       // nok: res.nok || {}
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     //  return {};
  //   }
  // },

  methods: {
    changeTab(tab) {
      this.tab = tab
    },
    changeUserMgtTab(tab) {
      this.userTab = tab
    },
    create() {
      alert('Updated profile')
    },
    addBank() {
      this.accounts.push({
        acctNo: '',
        acctName: '',
        bank: {},
      })
    },

    getProfile() {},
  },

  components: {
    SubmitBtn,
  },
}
</script>
