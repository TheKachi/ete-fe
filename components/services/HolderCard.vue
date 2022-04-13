<template>
  <div class="card h-full">
    <div class="flex gap-x-[18px] items-start mb-28">
      <span
        class="rounded-[50%] h-28 w-28 leading-[28px] bg-[#D8DDFD] text-blue text-center text-sm font-bold"
      >
        {{ holder.name.charAt(0) }}
      </span>

      <div>
        <h5 class="text-base text-black font-medium">
          {{ holder.name }}
        </h5>
        <p class="text-sm text-grey" v-if="holder.type === 'individual'">
          {{ holder.email }}
        </p>
        <p class="text-sm text-grey" v-if="holder.type === 'group'">
          {{ holder.email.split(',').length }} members
        </p>
      </div>

      <div class="flex gap-x-16">
        <!-- Edit  -->
        <button class="text-xs text-grey">
          <i class="fas fa-pen"></i>
        </button>
        <!-- Delete  -->
        <button>
          <i class="fas fa-times text-black"></i>
        </button>
      </div>
    </div>

    <div class="flex justify-between items-baseline">
      <p class="text-base text-[#7445C7]" v-if="holder.is_percentage === true">
        {{ formatNum(holder.share_formular) }} %
      </p>

      <p class="text-base text-blue" v-if="holder.is_percentage === false">
        ₦{{ formatNum(holder.share_formular) }}
      </p>

      <p class="text-purple text-sm">{{ titleCase(holder.type) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HolderCard',
  props: {
    holder: Object,
  },

  methods: {
    // make these helper functions for global access
    titleCase(str) {
      return str
        .toLowerCase()
        .split(' ')
        .map(function (word) {
          return word.charAt(0).toUpperCase() + word.slice(1)
        })
        .join(' ')
    },

    formatNum(num) {
      return num.toLocaleString('en-US')
    },
  },
}
</script>

<style lang="postcss" scoped>
.card {
  @apply bg-white p-20 pb-28 rounded-md shadow-[0_4px_50px_rgba(0,0,0,0.1)];
}
</style>
