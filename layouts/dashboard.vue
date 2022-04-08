<template>
  <div>
    <div class="grid grid-cols-12 grid-rows-12 grid-flow-col gap-0">
      <!-- <side-bar class="col-span-2 row-span-12" /> -->
      <aside class="col-span-2 row-span-12">
        <!--  -->
        <div class="bg-black p-32 fixed w-inherit h-inherit">
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
      <header-bar class="col-span-10 row-span-2" />

      <Nuxt
        class="col-span-10 row-span-10 bg-white px-10 lg:px-40 xl:px-80 py-36 lg:py-80 z-0"
      />
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

<style>
.height {
  height: ;
}
</style>
