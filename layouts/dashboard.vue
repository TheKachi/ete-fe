<template>
  <div>
    <header-bar />
    <div class="grid grid-cols-12 gap-0">
      <side-bar class="col-span-2" />
      <div class="col-span-12 lg:col-span-10 z-10">
        <Nuxt class="px-10 lg:px-40 xl:px-80 py-36 lg:py-120" />
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from './dashboard/SideBar'
import HeaderBar from './dashboard/HeaderBar'

export default {
  // middleware: 'auth',

  components: {
    SideBar,
    HeaderBar,
  },
}
</script>
