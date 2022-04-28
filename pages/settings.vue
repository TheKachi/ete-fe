<template>
  <div class="h-full">
    <!-- Tabs  -->
    <div class="fixed top-80 z-[50]">
      <div
        class="flex tab flex-nowrap overflow-x-auto gap-x-16 tab mb-28 -mr-20"
      >
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

    <div class="mt-[100px] h-calc overflow-y-scroll">
      <div v-if="tab === 'profile'">
        <div class="grid lg:grid-cols-12 gap-y-32 gap-x-60">
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
                <div class="form-control lg:w-50">
                  {{ $auth.user.firstname }}
                </div>
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
        <div class="grid lg:grid-cols-12 gap-y-32 gap-x-60">
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
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-24">
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
              <div class="mt-16">
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
                + Add new account
              </button>

              <button class="click-btn my-32 lg:my-60" @click.prevent="create">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="tab === 'user'">
      <div class="grid md:grid-cols-12 gap-24">
        <div class="col-span-12 md:col-span-4">
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

        <!-- Search -->
        <div
          class="relative col-span-7 md:col-span-5 md:col-start-5 searcher"
          v-if="users.length > 0"
        >
          <i class="fas fa-search text-grey absolute left-24 top-[15px]"></i>

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
            class="absolute right-20"
          >
            <i class="fas fa-times text-grey"></i>
          </button>
        </div>

        <!-- Add user  -->
        <button
          @click.prevent="openAddUser"
          class="click-btn col-span-5 md:col-span-3 md:col-end-13"
          v-if="users.length > 0"
        >
          Add User
        </button>
      </div>

      <div v-if="userTab === 'users'">
        <div v-if="users.length > 0" class="mt-36">
          <!-- desktop  -->
          <div class="hidden md:block">
            <table class="table-auto">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email&nbsp;adress</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody v-for="(user, i) in users" :key="i">
                <tr>
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.role }}</td>
                  <td class="flex gap-x-28 rounded-r-xl">
                    <button @click="openEditUser(user)">
                      <i class="far fa-edit text-[#219653]"></i>
                    </button>

                    <button @click="openRemoveUser()">
                      <i class="fas fa-trash text-[#FB1731]"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- mobile -->
          <div class="grid grid-cols-1 md:hidden gap-y-16">
            <div v-for="(user, i) in users" :key="i">
              <div
                class="h-full bg-white p-20 rounded-md shadow-[0_4px_50px_rgba(0,0,0,0.1)]"
              >
                <div class="flex gap-x-[18px] items-start mb-28">
                  <div>
                    <h5 class="text-base text-black font-medium">
                      {{ user.name }}
                    </h5>
                    <p class="text-sm text-grey">
                      {{ user.email }}
                    </p>
                  </div>

                  <div class="flex gap-x-16 ml-auto">
                    <!-- Edit  -->
                    <button
                      class="text-xs text-grey"
                      @click.prevent="openEditUser(user)"
                    >
                      <i class="fas fa-pen"></i>
                    </button>
                    <!-- Delete  -->
                    <button @click.prevent="openRemoveUser(user)">
                      <i class="fas fa-times text-grey"></i>
                    </button>
                  </div>
                </div>

                <p class="text-grey text-sm">{{ user.role }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="h-[50vh] flex flex-col items-center justify-center" v-else>
          <svg-loader path="img" icon="no-service" />
          <p class="text-sm lg:text-base font-medium text-grey my-28">
            You have not added any users
          </p>
          <button class="click-btn" @click.prevent="openAddUser">
            Add User
          </button>
        </div>
      </div>

      <div v-if="userTab === 'roles'">
        <div class="overflow-x-auto">
          <table class="table-fixed">
            <thead>
              <tr>
                <th>Role</th>
                <th>Features</th>
                <th>Permissions</th>
              </tr>
            </thead>

            <tbody v-for="(role, i) in roles" :key="i">
              <tr>
                <td>{{ role.title }} <br />{{ role.subtitle }}</td>
                <td>
                  <div class="grid grid-cols-2 gap-x-4">
                    <div
                      v-for="feat in role.features"
                      :key="feat"
                      class="col-span-1"
                    >
                      {{ feat }}
                    </div>
                  </div>
                </td>

                <td>
                  <div class="flex gap-x-24">
                    <div v-for="i in role.permissions" :key="i">{{ i }}</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Add User modal  -->
    <modal v-if="addUserModal.isActive" @close="addUserModal.isActive = false">
      <h5 class="text-lg lg:text-2xl font-bold text-black" slot="header">
        Add New User
      </h5>

      <div slot="body">
        <!-- Full Name -->
        <div :class="{ 'form-group--error': $v.user.name.$error }">
          <label for="stakeholder-name">Full name</label>
          <input id="stakeholder-name" type="text" v-model.trim="user.name" />

          <field-errors
            v-if="$v.user.name.$error"
            :field="$v.user.name"
            alt="Please enter User Full Name"
          />
        </div>

        <!-- Email  -->
        <div
          class="my-16"
          :class="{ 'form-group--error': $v.user.email.$error }"
        >
          <label for="stakeholder-email">Email</label>
          <input
            type="email"
            id="stakeholder-email"
            name="stakeholder-email"
            v-model="user.email"
          />

          <field-errors
            v-if="$v.user.email.$error"
            :field="$v.user.email"
            alt="We're going to need a correct email to invite them"
          />
        </div>

        <!--Role - Individual -->
        <div>
          <label for="role">Role</label>
          <select id="role" name="role" v-model="user.role">
            <option value="stakeholder">Stakeholder</option>
            <option value="operations">Operations</option>
          </select>
        </div>

        <button
          class="click-btn float-right my-20 lg:my-32"
          @click.prevent="addUser"
        >
          Add
        </button>
      </div>
    </modal>

    <!-- Edit User modal  -->
    <modal v-if="editUserModal" @close="editUserModal = false">
      <h5 class="text-lg lg:text-2xl font-bold text-black" slot="header">
        Edit New User
      </h5>

      <div slot="body">
        <!-- Full Name -->
        <div :class="{ 'form-group--error': $v.userEdit.name.$error }">
          <label for="stakeholder-name">Full name</label>
          <input
            id="stakeholder-name"
            type="text"
            v-model.trim="userEdit.name"
          />

          <field-errors
            v-if="$v.userEdit.name.$error"
            :field="$v.userEdit.name"
            alt="Please enter User Full Name"
          />
        </div>

        <!-- Email  -->
        <div
          class="my-16"
          :class="{ 'form-group--error': $v.userEdit.email.$error }"
        >
          <label for="stakeholder-email">Email</label>
          <input
            type="email"
            id="stakeholder-email"
            name="stakeholder-email"
            v-model="userEdit.email"
          />

          <field-errors
            v-if="$v.userEdit.email.$error"
            :field="$v.userEdit.email"
            alt="We're going to need a correct email to invite them"
          />
        </div>

        <!--Role - Individual -->
        <div>
          <label for="role">Role</label>
          <select id="role" name="role" v-model="userEdit.role">
            <option value="stakeholder">Stakeholder</option>
            <option value="operations">Operations</option>
          </select>
        </div>

        <button
          class="click-btn float-right my-20 lg:my-32"
          @click.prevent="editUser"
        >
          Save
        </button>
      </div>
    </modal>

    <!-- Delete user modal  -->
    <modal
      v-if="removeUserModal.isActive"
      @close="removeUserModal.isActive = false"
    >
      <div slot="header">
        <h5 class="text-lg lg:text-2xl font-bold text-black">Delete User</h5>
      </div>

      <div slot="body">
        <p>Are you sure you want to delete this user?</p>

        <button class="click-btn my-32" @click.prevent="removeUser">
          Delete
        </button>
      </div>
    </modal>
  </div>
</template>

<script>
import SvgLoader from '~/components/utils/SvgLoader.vue'
import FieldErrors from '@/components/input/validation'
import Loader from '~/components/utils/Loader.vue'
import Modal from '~/components/utils/Modal.vue'
import {
  required,
  minLength,
  maxLength,
  sameAs,
  email,
  numeric,
  minValue,
} from 'vuelidate/lib/validators'
import maxValue from 'vuelidate/lib/validators/maxValue'

export default {
  layout: 'dashboard',
  data: () => ({
    tab: 'profile',
    userTab: 'users',
    isLoading: false,
    roles: [
      {
        title: 'Admin',
        subtitle: 'These are best for business owners and executives',
        features: [
          'Transaction History',
          'Analytics',
          'Services',
          'Stakeholders',
        ],
        permissions: ['Create', 'View', 'Edit', 'Delete'],
      },
    ],
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

    banks: [],

    users: [],

    user: {
      name: '',
      email: '',
      role: '',
    },

    userEdit: {},

    isResetActive: false,

    addUserModal: {
      isActive: false,
    },
    editUserModal: false,
    removeUserModal: {
      isActive: false,
    },
  }),
  validations: {
    user: {
      name: { required, minLength: minLength(2) },
      email: { required, email },

      role: { required },
    },
    userEdit: {
      name: { required, minLength: minLength(2) },
      email: { required, email },

      role: { required },
    },
  },
  methods: {
    changeTab(tab) {
      this.tab = tab
    },

    changeUserMgtTab(tab) {
      this.userTab = tab
    },

    openAddUser() {
      this.addUserModal.isActive = true
      console.log('Logged!')
    },

    async addUser() {
      this.$v.user.$touch()
      if (this.$v.user.$pending || this.$v.user.$error) return

      this.isLoading = true
      this.users.push(this.user)
      this.isLoading = false
      this.addUserModal.isActive = false

      // this.$v.user.$touch()
      // if (this.$v.user.$pending || this.$v.user.$error) return
      // try {
      //   const data = {
      //     name: this.user.name,
      //     email: this.user.email,
      //     role: this.user.role,
      //     business: this.$auth.user._id,
      //   }

      //   this.isLoading = true

      //   let token = this.$auth.token
      //   let res = await this.$axios.post(
      //     '/business/add-member',
      //     data,

      //     {
      //       headers: {
      //         Authorization: `Bearer ${token}`,
      //       },
      //     }
      //   )
      //   console.log({ res })
      //   this.isLoading = false
      //   this.$notify({
      //     type: 'success',
      //     text: 'User successfully created.',
      //     duration: 5000,
      //   })
      //   // this.$router.push('/services')
      // } catch (error) {
      //   this.isLoading = false
      //   console.log({ error })
      //   this.$notify({
      //     type: 'error',
      //     text: 'User was not created. Please try again',
      //     duration: 5000,
      //   })
      // }
    },

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

    openEditUser(user) {
      this.userEdit = user
      this.editUserModal = true
    },

    editUser() {},

    openRemoveUser() {
      // this.user = user
      this.removeUserModal.isActive = true
    },

    removeUser() {
      this.users.splice(this.user, 1)
    },

    // async delStakeholder() {
    //   try {
    //     let token = this.$auth.token

    //     await this.$axios.post(
    //       '/services/delete-stakeholder',

    //       {
    //         service_id: this.service.id,
    //         account: this.$auth.user._id,
    //         id: this.holder.id,
    //       },

    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       }
    //     )

    //     this.delStakeholderModal = false

    //     this.$notify({
    //       type: 'success',
    //       text: 'Stakeholder deleted successfully!',
    //       duration: 5000,
    //     })

    //     this.service.stakeholders.splice(this.holder, 1)
    //   } catch (error) {
    //     this.$notify({
    //       type: 'error',
    //       text: 'There was an error deleting stakeholder. Please try again!',
    //       duration: 5000,
    //     })
    //   }
    // },

    // updateServiceAcct() {
    //   this.$v.service_acct_edit.$touch()
    //   if (
    //     this.$v.service_acct_edit.$pending ||
    //     this.$v.service_acct_edit.$error
    //   )
    //     return
    //   this.bank_name = this.service_acct_edit.service_bank.name
    //   this.bank_code = this.service_acct_edit.service_bank.code
    //   this.account_name = this.service_acct_edit.account_name
    //   this.account_no = this.service_acct_edit.account_no
    //   this.editServiceAcctModal.isActive = false
    // },
  },

  components: { FieldErrors, Modal, Loader, SvgLoader },

  mounted() {
    this.getProfile()
    // this.serviceEdit = this.profile
  },
}
</script>

<style lang="postcss" scoped>
.h-calc {
  height: calc(100%-120px);
}

.searcher [type='text'] {
  @apply pl-64;
}

/* .search [type='text'] {
  @apply bg-[#fafafa] border-[#fafafa] focus:border-none focus:ring-0;
} */
</style>
