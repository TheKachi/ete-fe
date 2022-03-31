<template>
  <div class="grid grid-cols-12 gap-0">
    <side-bar class="lg:col-span-3" />
    <div class="lg:col-span-9">
      <header-bar />
      <Nuxt class="px-40 py-36 lg:py-120" />
    </div>
  </div>
</template>

<script>
import SideBar from './dashboard/SideBar'
import HeaderBar from './dashboard/HeaderBar'

export default {
  middleware: 'auth',

  components: {
    SideBar,
    HeaderBar,
  },
}
</script>
