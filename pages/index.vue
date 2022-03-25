<template>
  <div class="">
    <section class="hero text-center text-white bg-dark pt-96 lg:pt-120 px-20">
      <div class="relative">
        <h1 class="text-white text-2xl lg:text-4xl font-bold">
          Enable payment settlement
          <br />
          all at once
        </h1>

        <img
          src="~/assets/img/ellipse.png"
          alt=""
          class="settle absolute -top-4 lg:-top-20 custom"
        />
      </div>

      <!-- <div class="relative">
        <p class="">settlement</p>

        <img src="~/assets/img/ellipse.png" alt="" class="absolute" />
      </div>
       <span
          class="settlement border-2 border-yellow rounded-full py-8 px-8 lg:pr-40"
          >settlement</span
        > -->

      <h2
        class="max-w-screen-sm lg:max-w-screen-md py-32 lg:py-40 lg:mx-auto text-sm lg:text-xl font-normal"
      >
        Handle automated, multiple stakeholder revenue collection and payment
        distribution end-to-end.
      </h2>

      <!-- <nuxt-link
        to="#"
        class="bg-purple hover:bg-white rounded border border-transparent px-56 py-16 text-base font-medium text-white hover:text-purple hover:border-purple"
        >Get Started</nuxt-link
      > -->

      <lg-btn url="signup">Get Started</lg-btn>

      <div class="grid-cols-12">
        <img
          src="https://res.cloudinary.com/thekachi/image/upload/v1647484253/hero-imghero-img_cxslld.png"
          alt=""
          class="col-span-10 lg:col-span-8 lg:col-start-3 mx-auto mt-40"
        />
      </div>
    </section>

    <!-- Your settlement tool! -->
    <section class="about">
      <div class="py-40 lg:py-144">
        <div
          class="grid grid-cols-12 lg:gap-20 px-20 lg:px-120 lg:justify-between"
        >
          <div class="col-span-12 lg:col-start-1 lg:col-span-5">
            <h2 class="text-base lg:text-xl text-purple mb-8 lg:mb-24">
              Your settlement tool!
            </h2>
            <h3 class="text-black">A Single to solve your payment needs</h3>
            <p class="my-24 lg:my-40 text-grey">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et
            </p>
          </div>

          <div class="col-span-12 lg:col-span-6 lg:col-start-7 mt-48">
            <div class="grid grid-cols-2 lg:justify-between gap-y-24 lg:gap-48">
              <div
                class="col-span-2 lg:col-span-1"
                v-for="item in services"
                :key="item"
              >
                <img :src="item.icon" alt="" />
                <h4 class="my-24 text-black">{{ item.header }}</h4>
                <p class="text-grey">
                  {{ item.details }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section
      class="grid grid-cols-12 lg:gap-20 lg:justify-between lg:pr-120 pt-36 lg:pt-120 px-20 lg:px-0"
    >
      <h3 class="col-span-12 lg:col-span-5 lg:col-start-8 lg:mb-40 text-black">
        How it works
      </h3>

      <img
        src="https://res.cloudinary.com/thekachi/image/upload/v1647484253/hero-imghero-img_cxslld.png"
        alt=""
        class="col-span-12 lg:col-start-1 lg:col-span-5 my-48"
      />

      <div class="col-span-12 lg:col-span-5 lg:col-start-8">
        <div class="flex gap-x-40" v-for="item in howItWorks" :key="item">
          <img src="~/assets/img/before.svg" alt="" />
          <div>
            <h4 class="text-black">{{ item.action }}</h4>
            <p class="text-grey">
              {{ item.details }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Real time settlements -->
    <section
      class="grid grid-cols-12 lg:gap-20 lg:justify-between lg:items-center lg:pl-120 px-20 lg:px-0 pt-40 lg:pt-0"
    >
      <div class="col-span-12 lg:col-span-5 lg:col-start-1">
        <h3 class="text-black">Real-Time settlement</h3>
        <p class="my-24 lg:my-32 text-grey">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p class="text-grey">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <img
        src="https://res.cloudinary.com/thekachi/image/upload/v1647484253/hero-imghero-img_cxslld.png"
        alt=""
        class="col-span-12 lg:col-start-8 lg:col-span-5 my-48"
      />
    </section>

    <section
      class="grid grid-cols-12 lg:gap-20 lg:justify-between lg:items-center lg:pr-120 px-20 lg:px-0 pt-40 lg:py-90"
    >
      <img
        src="https://res.cloudinary.com/thekachi/image/upload/v1647484253/hero-imghero-img_cxslld.png"
        alt=""
        class="col-span-12 lg:col-start-1 lg:col-span-5 my-48 order-last lg:order-first"
      />

      <div
        class="col-span-12 lg:col-span-5 lg:col-start-8 order-first lg:order-last"
      >
        <h3 class="text-black">Real-Time settlement</h3>
        <p class="my-24 lg:my-32 text-grey">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p class="text-grey">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </section>

    <!-- A Single to solve your payment needs -->
    <section class="bg-black py-48">
      <div
        class="grid grid-cols-12 lg:gap-20 px-20 lg:px-120 lg:justify-between lg:items-center gap-y-48"
      >
        <div class="col-span-12 lg:col-start-1 lg:col-span-5">
          <h3 class="text-white">A Single to solve your payment needs</h3>
          <p class="my-24 lg:my-40 text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et
          </p>

          <nuxt-link
            to="/signup"
            class="bg-purple hover:bg-white rounded border border-transparent px-56 py-16 text-base font-medium text-white hover:text-purple hover:border-purple"
            >Get started</nuxt-link
          >
          <!-- <lg-button url="/signup">Get started</lg-button> -->
        </div>

        <img
          src="https://res.cloudinary.com/thekachi/image/upload/v1647517158/Group_5411_wns2nt.png"
          alt=""
          class="col-span-12 lg:col-span-6 lg:col-start-7"
        />
      </div>
    </section>

    <!-- Testimonial -->
    <section class="px-20 lg:px-120 py-56 lg:py-120">
      <h3 class="lg:text-center text-black mb-40">What our clients say</h3>
      <div class="flex gap-x-0 lg:justify-center overflow-x-auto">
        <div v-for="i in 3" :key="i" class="min-w-full lg:min-w-0 p-20">
          <span class="text-5xl leading-none font-bold text-purple quot"
            >&quot;</span
          >
          <blockquote class="text-sm lg:text-base text-grey">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </blockquote>

          <div class="flex gap-12 items-center mt-40">
            <img
              src="https://res.cloudinary.com/thekachi/image/upload/v1647528112/Oval_rt182a.png"
              alt="A photo of Marie Wells"
            />
            <div>
              <h4 class="text-black">Marie Wells</h4>
              <h6 class="text-xs text-grey">Product Designer</h6>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import LgBtn from '~/components/LgBtn.vue'
import TransparentBtn from '~/components/TransparentBtn.vue'
export default {
  name: 'LandingPage',
  layout: 'landing',
  data: () => ({
    services: [
      {
        header: 'Real-Time settlement',
        details:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        icon: require('../assets/img/settlement.svg'),
      },
      {
        header: 'Payment scheduling',
        details:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        icon: require('../assets/img/settlement.svg'),
      },
      {
        header: 'Security',
        details:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        icon: require('../assets/img/settlement.svg'),
      },
      {
        header: 'Failsafe',
        details:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        icon: require('../assets/img/settlement.svg'),
      },
    ],

    howItWorks: [
      {
        action: 'Merchant funds wallet',
        details:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
      {
        action: 'Creates service type',
        details:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
      {
        action: 'Disburses to stakeholders',
        details:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
    ],
  }),
  components: {
    TransparentBtn,
    LgBtn,
  },
}
</script>

<style lang="postcss" scoped>
.hero {
  background-image: url(~assets/img/hero-bg.png);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
}
h3,
h4 {
  @apply font-bold leading-tight;
}

h3 {
  @apply text-2xl lg:text-3xl;
}

h4 {
  @apply text-lg lg:text-xl;
}

p {
  @apply text-sm lg:text-base;
}

.quot,
h6 {
  font-family: 'Roboto', sans-serif;
}
.custom {
  left: 54%;
}
.about {
  background: #fff
    url(https://res.cloudinary.com/thekachi/image/upload/v1647607642/Mask_groupphone_easpsu.png);
}

@media (min-width: 768px) {
  .about {
    background: #fff
      url(https://res.cloudinary.com/thekachi/image/upload/v1647607647/Mask_groupdesktop_suf3cd.png)
      no-repeat;
  }
}

@media (max-width: 1024px) {
  img.settle {
    width: 150px;
    height: 50px;
  }

  .custom {
    left: 57%;
  }
}
</style>
