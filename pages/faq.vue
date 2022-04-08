<template>
  <div class="faq pt-60 lg:pt-120 px-20 lg:px-120">
    <div class="grid lg:grid-cols-2 gap-y-32">
      <div class="flex lg:flex-col">
        <div>
          <h1 class="text-2xl lg:text-3xl text-black font-bold">
            FAQ <br />Frequently <br />Asked Questions
          </h1>
          <p class="text-base text-grey">
            Everything you need to know about the product
          </p>
        </div>

        <img src="~/assets/img/faq.png" alt="" class="w-90 lg:w-300" />
      </div>

      <div>
        <div v-for="(item, i) in faq" :key="i" class="flex-col gap-y-32">
          <div
            class="border border-light-grey mb-20 lg:mb-32 p-20 cursor-pointer"
            @click="toggleOpen(i)"
          >
            <div
              class="flex justify-between items-center text-base text-black"
              :class="{ 'text-blue': item.isOpen }"
            >
              <div>
                {{ item.question }}
              </div>
              <i
                class="fas fa-minus text-black hidden lg:block"
                :class="{ 'text-blue': item.isOpen }"
              ></i>
            </div>
            <p class="text-grey text-sm lg:text-base mt-16" v-if="item.isOpen">
              {{ item.answer }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'landing',

  data: () => ({
    index: 0,

    faq: [
      {
        question: 'What does Ete mean?',
        answer:
          'Ete is short form for End-to-End, and is the Efik word for Father. Ete is designed to manage payment solutions on merchant sites end-to-end, fathering the entire process of payment reception and distribution',
        isOpen: false,
      },
      {
        question: 'How does Ete work?',
        answer:
          'Ete works with integration, or blending with the merchant’s site to receive and process the payment needs of the merchant and the buyer (customer) in a continuous transaction loop. Ete makes for the convenience of the customer by anticipating the customer needs and ensuring there is speed and ease of service to the customer. It also ensures that merchant is able to anticipate and receive payments is a coordinated fashion, enabling the merchant focus on increasing it’s customer base and improving on service quality. Please see [  ] for step-by-step (end-to-end) process of now Ete works',
        isOpen: false,
      },
      {
        question: 'How is payment made with ete',
        answer:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        isOpen: false,
      },
      {
        question: 'How many stakeholder can i have in my company',
        answer:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        isOpen: false,
      },
    ],
  }),

  methods: {
    // toggleOpen(i) {
    //   this.open = !this.open
    // },

    toggleOpen(i) {
      this.index = i
      this.faq.map((item) => (item.isOpen = false))
      this.faq[i].isOpen = !this.faq[i].isOpen
    },
  },
}
</script>

<style>
.faq {
  color: #fff;
}
</style>
