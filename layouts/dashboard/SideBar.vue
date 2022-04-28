<template>
  <div class="">
    <div class="sidebar z-[9999] fixed lg:static">
      <aside class="h-screen hidden lg:block">
        <div class="fixed w-inherit h-inherit bg-black p-32">
          <!-- logo -->
          <svg-loader path="img" icon="ete-logo" />

          <!-- Navs -->
          <ul class="flex flex-col gap-y-36 mt-48">
            <li
              v-for="(nav, i) in navs"
              :key="i"
              class="px-24 py-16 text-base text-white rounded"
              :class="{
                'bg-blue': activePage($route.path, nav.title),
              }"
            >
              <nuxt-link :to="nav.link" class="flex items-center gap-x-16">
                <svg-loader path="img/nav" :icon="nav.icon" />

                <span class="">
                  {{ nav.title }}
                </span>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </aside>

      <aside class="h-screen block lg:hidden" v-if="mobileNavShowing">
        <div class="fixed w-inherit h-inherit bg-black p-32">
          <div class="flex justify-between items-center">
            <!-- logo -->
            <svg-loader path="img" icon="ete-logo" />
            <button @click.prevent="mobileNavShowing = false" class="z-[1000]">
              <i class="fas fa-bars text-white"></i>
            </button>
          </div>

          <!-- Navs -->
          <ul class="flex flex-col gap-y-36 mt-48">
            <li
              v-for="(nav, i) in navs"
              :key="i"
              class="px-24 py-16 text-base text-white rounded"
              :class="{
                'bg-blue': $route.path === nav.link,
              }"
            >
              <nuxt-link
                :to="nav.link"
                class="flex items-center gap-x-16"
                @click.prevent="mobileNavShowing = false"
              >
                <svg-loader path="img/nav" :icon="nav.icon" />

                <span class="">
                  {{ nav.title }}
                </span>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </aside>

      <button
        @click.prevent="toggleMobileNav"
        class="fixed ml-24 mt-8 z-[1000]"
      >
        <i class="fas fa-bars"></i>
      </button>
    </div>
    <div
      v-if="mobileNavShowing"
      @click="mobileNavShowing = false"
      tabindex="0"
      class="fixed top-0 left-0 right-0 bottom-0 z-[5000]"
    ></div>
  </div>
</template>

<script>
import SvgLoader from '~/components/utils/SvgLoader'
export default {
  data() {
    return {
      navs: [
        {
          title: 'Dashboard',
          link: '/dashboard',
          icon: 'dashboard',
        },
        {
          title: 'Services',
          link: '/services',
          icon: 'service',
        },
        {
          title: 'Settings',
          link: '/settings',
          icon: 'settings',
        },
        {
          title: 'Contact us',
          link: '/support',
          icon: 'support',
        },
      ],

      mobileNavShowing: false,
    }
  },

  methods: {
    activePage(link, title) {
      let path = link.split('/')[1]
      let name = title === 'Contact us' ? 'support' : title

      let re = new RegExp(path, 'g')
      if (name.toLowerCase() === path && re.test(link)) return true

      return false
    },

    toggleMobileNav() {
      this.mobileNavShowing = !this.mobileNavShowing
    },
  },

  components: {
    SvgLoader,
  },
}
</script>

<style lang="postcss" scoped>
li:last-child {
  @apply fixed bottom-40;
}
</style>
