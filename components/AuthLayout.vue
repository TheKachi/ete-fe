<template>
  <div class="">
    <aside
      class="w-full lg:w-4/12 md:h-full lg:fixed bg-black py-32 lg:pt-120 lg:pb-40 px-20 lg:pl-60 lg:pr-40 text-white"
    >
      <div class="h-full bg-black">
        <!-- logo -->

        <svg-loader path="img" icon="ete-logo" />

        <div class="absolute top-0 left-0">
          <svg-loader path="img" icon="yellow-swirly" class="fill-purple" />
        </div>

        <div class="absolute bottom-0 right-0">
          <svg-loader path="img" icon="login" />
        </div>
        <slot name="greeting" />

        <slot name="cta" />
      </div>
    </aside>

    <div
      class="w-full lg:w-4/6 px-20 lg:px-0 pt-28 lg:pt-20 pb-40 flex flex-col md:h-full md:justify-center lg:fixed right-0"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import SvgLoader from './utils/SvgLoader.vue'
export default {
  name: 'AuthLayout',
  components: { SvgLoader },
}
</script>

<style lang="postcss" scoped>
.w-inherit {
  width: inherit;
}

form {
  @apply space-y-24 w-full md:w-1/2 mx-auto;
}

h1 {
  @apply font-bold text-white text-2xl lg:text-3xl mt-48 mb-16 lg:mt-120 lg:mb-12;
}

h2 {
  @apply font-bold text-black text-2xl lg:text-3xl;
}

p {
  @apply text-base font-normal;
}

button {
  @apply w-full bg-purple hover:bg-white text-white hover:text-purple border border-purple hover:border-purple rounded py-12;
}
span {
  @apply mx-auto;
}

[type='password'],
.password [type='text'] {
  @apply border-r-0 rounded-r-none;
}
.eye {
  @apply border border-l-0 border-medium-grey rounded-r-md;
}
</style>
