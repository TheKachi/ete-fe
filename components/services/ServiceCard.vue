<template>
  <nuxt-link :to="`/services/${service.id}`">
    <div class="card h-full">
      <div class="flex gap-x-[18px] items-center mb-24">
        <span
          class="rounded-[50%] h-[46px] w-[46px] leading-[46px] bg-[#D8DDFD] text-blue font-bold text-center"
        >
          {{ service.title.charAt(0).toUpperCase() }}
        </span>

        <h5 class="text-lg text-black font-medium">
          {{ service.title }}
        </h5>
      </div>

      <p class="text-base text-grey">
        {{ slice(service.description) }}
      </p>

      <!-- <div class="grid grid-cols-6 float-right">
                <div
                  class="col-span-1 -mr-12 "
                  v-for="(stakeH, i) in service"
                  :key="i"
                >
                  <img :src="stakeH.userPhoto" :alt="meta" />
                </div>
                <div
                  class="col-span-1 -mr-12 bg-transparent rounded-full h-24 w-24 text-black text-xs font-medium"
                >
                  +{{ service.stakeholders.length }}
                </div>
              </div> -->
    </div>
  </nuxt-link>
  <!--  :to="{ name: 'id', params: { slug: service.id } }"  -->
</template>

<script>
export default {
  name: 'ServiceCard',
  props: {
    service: Object,
  },
  methods: {
    slice(str) {
      if (str.length <= 100) return str
      return str.slice(0, 97) + '...'
    },
  },
}
</script>

<style lang="postcss" scoped>
.card {
  @apply bg-white p-20 pb-28 rounded-md shadow-[0_4px_50px_rgba(0,0,0,0.1)];
}

/* truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  resize: horizontal;
} */

/* truncate-lg {
  @apply text-lg
width: 200px;
  font-size: 1.3rem;
} */
/* truncate-sm {
  @apply text-base;
  width: 200px;
  font-size: 1.3rem;
} */
</style>
