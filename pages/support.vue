<template>
  <div class="-mx-40">
    <div
      class="grid lg:grid-cols-12 gap-y-32 gap-x-60 justify-between py-60 lg:pt-120 px-20 lg:px-90 lg:relative"
    >
      <div class="lg:col-span-5">
        <h1 class="text-2xl lg:text-3xl text-black font-bold">Need Help?</h1>
        <p class="text-base text-grey">
          Do you need help with anything? Kindly drop a message and it would be
          responded to within the next 48 hours.
        </p>
      </div>

      <div
        class="lg:col-span-7 lg:col-end-13 lg:py-60 lg:px-68 card lg:bg-white lg:absolute z-20 top-60 inset-x-0 lg:shadow-[0_4px_50px_rgba(0,0,0,0.1)]"
      >
        <h5 class="text-lg lg:text-2xl text-black mb-24 lg:mb-40 font-bold">
          What are your concerns?
        </h5>

        <form class="flex flex-col gap-y-24">
          <div>
            <label for="title">Title</label>
            <input type="text" placeholder="Enter title" id="title" />
          </div>
          <div>
            <label for="msg">Message</label>
            <textarea rows="4" placeholder="Enter message" id="msg" />
          </div>
          <div>
            <button
              type="submit"
              class="bg-purple hover:bg-white rounded border border-transparent px-56 py-16 text-base font-medium text-white hover:text-purple hover:border-purple mt-8 lg:mt-16"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
    <div
      class="bg-[#F2F5F7] relative pt-80 pb-60 lg:pt-90 lg:pb-300 px-20 lg:px-90"
    >
      <ul class="flex flex-col gap-y-24">
        <li
          v-for="(item, i) in contact"
          :key="i"
          class="text-lg lg:text-xl text-purple"
        >
          <i class="mr-20" :class="item.class"></i>
          <a :href="item.link" class="">{{ item.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  data: () => ({
    contact: [
      {
        class: 'fas fa-map-marker-alt',
        title: 'Remote, Nigeria',
        link: '#',
      },
      {
        class: 'fas fa-envelope',
        title: 'ete@gmail.com',
        link: 'mailto:ete@gmail.com',
      },
      {
        class: 'fas fa-phone-alt',
        title: '+234 890 784 748',
        link: '#',
      },
    ],
  }),
}
</script>
