<template>
  <div class="h-full">
    <!-- Tabs  -->
    <div class="fixed top-[110px] z-[50]">
      <div class="flex gap-x-24 tab">
        <button
          @click.prevent="changeTab('profile')"
          :class="[
            tab === 'profile' ? 'bg-dark text-white' : 'bg-tab text-grey',
          ]"
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
    </div>

    <div class="lg:mt-[90px] settings h-[80vh] overflow-y-scroll">
      <div v-if="tab === 'profile'">
        <div
          class="grid lg:grid-cols-12 gap-y-32 gap-x-60 mt-28 mb-36 settings overflow-y-scroll h-[70vh]"
        >
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
                <label for="firstname">First name</label>
                <input
                  type="text"
                  v-model="profile.firstname"
                  id="firstname"
                  class="lg:w-50"
                />
              </div>

              <!-- Last Name -->
              <div>
                <label for="lastname">Last name</label>
                <input
                  type="text"
                  v-model="profile.lastname"
                  id="lastname"
                  class="lg:w-50"
                />
              </div>
            </div>

            <!-- Email -->
            <div class="mb-24">
              <label for="email">Email address</label>
              <input type="text" v-model="profile.email" id="email" />
            </div>

            <!-- Phone number -->
            <div class="mb-24">
              <label for="phone">Phone number</label>
              <input type="text" v-model="profile.phone" id="phone" />
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
                  v-model="password"
                />
              </div>

              <!-- New Password -->
              <div class="mt-24">
                <label for="newPassword">New Password</label>

                <input
                  type="password"
                  id="password"
                  v-model="new_password"
                  placeholder="New Password"
                  aria-label="New Password"
                />
              </div>
            </div>

            <button
              @click="updateProfile"
              class="click-btn float-right mt-32 lg:mt-80"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div v-if="tab === 'bank'">
        <div
          class="grid lg:grid-cols-12 gap-y-32 gap-x-60 mt-28 mb-36 settings overflow-y-scroll h-[70vh]"
        >
          <div class="lg:col-span-5">
            <h1 class="text-lg lg:text-2xl font-bold text-black">
              Bank Details
            </h1>
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

              <button class="click-btn my-32 lg:my-60" @click.prevent="create">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="tab === 'user'">
        <div
          class="grid lg:grid-cols-12 mt-28 mb-36 settings overflow-y-scroll h-[70vh]"
        >
          <div class="col-span-12 lg:col-span-4">
            <div class="flex gap-0 user-tab">
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
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  data: () => ({
    tab: 'profile',
    userTab: 'users',
    searchQuery: '',
    profile: {},
    serviceEdit: {},
    accounts: [
      {
        acctNo: '',
        acctName: '',
        bank: {},
      },
    ],
    isLoading: false,

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
    create() {},
    addBank() {
      this.accounts.push({
        acctNo: '',
        acctName: '',
        bank: {},
      })
    },

    async getProfile() {
      try {
        this.isLoading = true
        let token = this.$auth.token

        let res = await this.$axios.get(
          '/account/token',

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        this.profile = res.data.data.user
        console.log(this.profile)
        this.isLoading = false
        console.log(res)
      } catch (error) {
        this.isLoading = false
        console.log({ error })
      }
    },

    async updateProfile() {
      try {
        let token = this.$auth.token
        let profile = this.profile

        let res = await this.$axios.post(
          '/account/update',

          profile,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        // this.profile = res.data.profile
        console.log(this.profile)
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
  },

  components: {},

  mounted() {
    this.getProfile()
    // this.serviceEdit = this.profile
  },
}
</script>

<style lang="postcss" scoped>
/* .h-calc {
  height: calc(100%-120px);
} */
</style>
