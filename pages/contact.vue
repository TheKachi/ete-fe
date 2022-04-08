<template>
  <div>
    <div
      class="grid lg:grid-cols-12 gap-y-32 gap-x-60 justify-between py-60 lg:pt-120 px-20 lg:px-90 lg:relative"
    >
      <div class="lg:col-span-5">
        <h1 class="text-2xl lg:text-3xl text-black font-bold">
          Send us a <br />
          Message
        </h1>
        <p class="text-base text-grey">
          Fill up the form and our team would get back to you within 48 hours
        </p>
      </div>

      <div
        class="lg:col-span-7 lg:col-end-13 lg:py-60 lg:px-68 card lg:bg-white lg:absolute z-50 top-60 inset-x-0"
      >
        <h5 class="text-lg lg:text-2xl text-black mb-24 lg:mb-40 font-bold">
          Get in touch with us
        </h5>

        <form class="flex flex-col gap-y-24">
          <div class="flex gap-x-12">
            <div class="w-1/2">
              <label for="firstname">First name</label>
              <input
                type="text"
                placeholder="Enter first name"
                id="firstname"
              />
            </div>
            <div class="w-1/2">
              <label for="lastname">Last name</label>
              <input type="text" placeholder="Enter last name" id="lastname" />
            </div>
          </div>
          <div>
            <label for="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
            />
          </div>
          <div>
            <label for="phone">Phone number</label>
            <input type="tel" placeholder="Enter phone number" id="phone" />
          </div>
          <div>
            <label for="msg">Message</label>
            <textarea rows="3" placeholder="Enter Message" id="msg" />
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
      class="bg-black relative pt-80 pb-60 lg:pt-90 lg:pb-300 px-20 lg:px-90"
    >
      <img
        src="https://res.cloudinary.com/thekachi/image/upload/v1647764839/Cube-2_zwyt15.png"
        alt=""
        class="absolute top-1/3 right-0 w-60 lg:w-80"
      />
      <img
        src="https://res.cloudinary.com/thekachi/image/upload/v1647764815/swirly-scribbled-arrow_1_isbl0f.png"
        alt=""
        class="absolute top-40 left-0 w-36 lg:w-64"
      />
      <ul class="flex flex-col gap-y-24">
        <li v-for="(item, i) in contact" :key="i">
          <i class="mr-20" :class="item.class"></i>
          <a :href="item.link">{{ item.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'landing',
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

<style lang="postcss" scoped>
li {
  @apply text-lg lg:text-xl text-white hover:text-yellow;
}
@media (min-width: 1024px) {
  .card {
    box-shadow: 0 4px 50px rgba(0, 0, 0, 0.1);
  }
}
</style>
