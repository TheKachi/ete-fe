<template>
  <nav
    class="fixed top-0 z-[1000] inset-x-0 h-64 flex items-center justify-end lg:px-64"
  >
    <!-- Notification -->
    <button @click="toggleDropdown(notifications)" class="mr-48">
      <i class="fas fa-bell"></i>
    </button>

    <div class="relative">
      <div class="flex items-center gap-x-8">
        <!-- Avatar  -->
        <i class="fas fa-user-plus rounded-full p-12 bg-medium-grey"></i>

        <div
          class="flex items-center gap-x-8 ml-16 cursor-pointer"
          @click="toggleDropdown"
        >
          <!-- User name  -->
          <span class="text-base text-black"> Lorem Ipsum</span>

          <i class="fas fa-chevron-down"></i>
        </div>
      </div>

      <ul
        v-if="dropdownList.isOpen"
        class="absolute top-56 -inset-x-56 bg-white px-12 py-48 cursor-pointer w-300 rounded shadow"
      >
        <li
          v-for="item in dropdownList"
          :key="item"
          class="text-black dark:text-white px-12 py-4 flex flex-col gap-20"
        >
          <nuxt-link :to="item.link"> {{ item.name }}</nuxt-link>
        </li>
        <!-- @click="isOpen = false" -->
      </ul>

      <ul
        v-if="notifications.isOpen"
        class="absolute top-56 -inset-x-56 bg-white px-12 py-48 cursor-pointer w-300 rounded shadow"
      >
        <li
          v-for="item in notifications"
          :key="item"
          class="text-black dark:text-white px-12 py-4 flex flex-col gap-20"
        >
          <nuxt-link :to="item.link"> {{ item.title }}</nuxt-link>
        </li>
        <!-- @click="isOpen = false" -->
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    dropdownList: [
      {
        isOpen: false,
      },

      {
        name: 'My Profile',
        link: '/',
      },
      {
        name: 'Switch Account',
        link: '/',
      },
      {
        name: 'Logout',
        link: '/',
      },
    ],

    notifications: [
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
  }),

  methods: {
    toggleDropdown(list) {
      list.isOpen = !this.isOpen
    },
    // pageName() {
    //   return this.ucFirst(this.$route.name);
    // },
    // ucFirst(str) {
    //   return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
    // },
  },

  components: {
    // svgLoader,
  },
}
</script>

<style scoped>
nav {
  box-shadow: 0 4px 50px rgba(0, 0, 0, 0.07);
}
</style>
