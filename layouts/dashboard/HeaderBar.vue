<template>
  <nav class="h-48 lg:h-56 z-[100]">
    <div
      class="fixed top-0 inset-x-0 h-inherit z-50 shadow-[0_4px_50px_rgba(0,0,0,0.07)]"
    >
      <div class="flex items-center justify-end pr-16 lg:px-64 pt-8 pb-16 z-50 ml-[30em]">
        <!-- Notification -->
        <button @click="toggleDropdown(notifList)" class="mr-36">
          <i class="fas fa-bell"></i>
        </button>

        <div class="relative">
          <div
            class="flex items-center gap-x-8"
            @click="toggleDropdown(menuList)"
          >
            <!-- Avatar  -->
            <i
              class="fas fa-user-alt rounded-full p-8 lg:p-12 lg:bg-medium-grey"
            ></i>

            <div class="flex items-center gap-x-8 cursor-pointer">
              <!-- User name  -->
              <span class="text-base text-black hidden lg:block">{{
                username
              }}</span>

              <i class="fas fa-chevron-down hidden lg:block"></i>
            </div>
          </div>

          <!-- Menu List dropdown  -->
          <ul
            v-if="menuList[0].isOpen"
            class="dl menu-list absolute top-56 right-[10px] bg-white flex flex-col cursor-pointer w-[295px] rounded-md shadow py-20"
            v-on-clickaway="() => away(menuList)"
          >
            <!-- My Profile  -->
            <li>
              <nuxt-link
                @click="notifList[0].isOpen = false"
                to="/settings"
                class="flex items-center gap-x-16"
              >
                <svg-loader path="img/nav" icon="profile" />

                <span>My Profile</span>
              </nuxt-link>
            </li>

            <!-- Switch Account  -->
            <li>
              <button
                class="flex items-center gap-x-16"
                @click.prevent="toggleDropdown(switchAcctList)"
              >
                <svg-loader path="img/nav" icon="switch" />

                <span>Switch Account</span>
              </button>
              <ul v-if="switchAcctList[0].isOpen">
                <li><button>Account to switch to</button></li>
              </ul>
            </li>

            <!-- Logout  -->
            <li>
              <button
                class="flex items-center gap-x-16"
                @click="$auth.logout()"
              >
                <SvgLoader path="img/nav" icon="logout" />
                <span>Logout</span>
              </button>
            </li>

            <!-- Logout modal  -->
            <!-- <modal v-if="logoutModal.isActive" @close="logoutModal.isActive = false">
        <h5 class="text-lg lg:text-2xl font-bold text-black" slot="header">
          Logout
        </h5>

        <div slot="body">
          <p class="text-grey text-center mt-120">
            Are you sure you want to logout?
          </p>

          <div class="flex justify-end gap-32 mt-120">
            <button
              @click="$auth.logout()"
              class="bg-purple hover:bg-white text-white hover:text-purple border border-purple hover:border-purple rounded px-36 py-12"
            >
              Logout
            </button>
            <button
              @click="logoutModal.isActive = false"
              class="bg-white hover:bg-purple text-purple hover:text-white border border-purple hover:border-purple rounded px-36 py-12"
            >
              Cancel
            </button>
          </div>
        </div>
      </modal> -->
          </ul>

          <!-- Notifications dropdown  -->
          <!-- v-on-clickaway="away(notifList)" -->
          <!-- <dropdown>

     </dropdown> -->
          <div
            class="dl absolute top-56 right-[10px] bg-white flex flex-col cursor-pointer w-[400px] rounded-md shadow"
            v-if="notifList[0].isOpen"
            v-on-clickaway="() => away(notifList)"
          >
            <div class="flex justify-between items-baseline p-20">
              <div class="flex gap-x-16">
                <h5 class="text-lg lg:text-2xl font-bold text-black">
                  Notification
                </h5>

                <!-- <span class="rounded-full px-24 py-8 bg-[#E5DAF9] text-[#7445C7]">
              2 unread
            </span> -->
              </div>
              <button @click="notifList[0].isOpen = false">
                <i class="fas fa-times text-black w-16 h-16"></i>
              </button>
            </div>

            <hr class="text-medium-grey" />

            <div class="p-20"></div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
import SvgLoader from '~/components/utils/SvgLoader.vue'
import Modal from '~/components/utils/Modal.vue'
import SubmitBtn from '~/components/SubmitBtn.vue'
export default {
  mixins: [clickaway],

  data: () => ({
    isVisible: false,
    logoutModal: {
      isActive: false,
    },

    notifModal: {
      isActive: false,
    },

    menuList: [
      {
        isOpen: false,
      },
    ],

    notifList: [
      {
        isOpen: false,
      },
      {
        title: 'Funding',
        details:
          'Netus faucibus pulvinar tempus scelerisque vestibulum vel, massa imperdiet iaculis',
      },
      {
        title: 'Withdrawal',
        details:
          'Netus faucibus pulvinar tempus scelerisque vestibulum vel, massa imperdiet iaculis',
      },
    ],

    switchAcctList: [
      { isOpen: false },
      // {
      //   name: 'My Profile',
      //   link: '/',
      //   icon: 'profile',
      // },
      // {
      //   name: 'My Profile',
      //   link: '/',
      //   icon: 'profile',
      // },
    ],
  }),

  methods: {
    toggleDropdown(list) {
      list[0].isOpen = !list[0].isOpen
    },

    away(list) {
      list[0].isOpen = false
    },

    logout() {},

    close() {
      //  this.$emit("on-close", false);
      this.isVisible = false
    },
  },

  computed: {
    username() {
      return this.$auth.user.firstname + ' ' + this.$auth.user.lastname
    },
  },

  components: {
    SvgLoader,
    Modal,
    SubmitBtn,
  },

  // mounted() {
  //   let _that = this
  //   // this.checkActive()

  //   window.addEventListener('mouseup', (e) => {
  //     var el = document.querySelector('.dl')
  //     console.log(el)
  //     if (el != null) {
  //       if (e.target != el && !el.contains(e.target)) {
  //         _that.close()
  //       }
  //     }
  //   })
  // },
}
</script>
