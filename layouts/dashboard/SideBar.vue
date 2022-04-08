<template>
  <div>
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
              'bg-blue': $route.path === nav.link,
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
    <aside class="h-screen lg:hidden" v-if="mobileNavShowing">
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
              'bg-blue': $route.path === nav.link,
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

    <button
      @click.prevent="mobileNavShowing = !mobileNavShowing"
      class="ml-24 mt-28"
    >
      <i class="fas fa-bars"></i>
    </button>
  </div>
</template>

<script>
import SvgLoader from '~/components/utils/SvgLoader'
// import modal from '~/components/utils/modal'
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

  methods: {},

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
