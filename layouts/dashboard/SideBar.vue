<template>
  <aside class="w-1/4 h-screen">
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
