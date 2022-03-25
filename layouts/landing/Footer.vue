<template>
  <footer class="bg-footer-black text-white pt-28 pb-60 px-20 lg:p-120">
    <div class="grid grid-cols-12 gap-y-60 lg:justify-between">
      <img
        src="~/assets/img/ete-logo.svg"
        alt="Ete Logo"
        class="col-span-12 lg:col-span-8"
      />

      <div class="col-span-12 lg:col-span-4 lg:col-start-9">
        <div class="grid grid-cols-2 justify-between">
          <!-- Company -->
          <div>
            <h3 class="text-xl mb-32">Company</h3>
            <ul class="flex flex-col gap-y-12">
              <li v-for="(item, i) in company" :key="i">
                <nuxt-link :to="item.link">{{ item.title }}</nuxt-link>
              </li>
            </ul>
          </div>

          <!-- Legal -->
          <div>
            <h3 class="text-xl mb-32">Legal</h3>
            <ul class="flex flex-col gap-y-12">
              <li v-for="(item, i) in legal" :key="i">
                <nuxt-link :to="item.link">{{ item.title }}</nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      company: [
        {
          title: 'Home',
          link: '/',
        },

        {
          title: 'FAQ',
          link: '/faq',
        },
        {
          title: 'Contact Us',
          link: '/contact',
        },
      ],

      legal: [
        {
          title: 'Terms of Service',
          link: '/legal#terms',
        },

        {
          title: 'Privacy Policy',
          link: '/legal#policy',
        },
      ],
    }
  },

  methods: {},

  components: {},
}
</script>

<style lang="postcss" scoped>
a {
  @apply text-base text-opacity-20 font-extralight mb-12 hover:text-yellow;
}

h3 {
  @apply hover:underline hover:underline-offset-8 hover:decoration-yellow;
}
</style>
