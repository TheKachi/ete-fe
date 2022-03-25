<template>
  <div v-if="tab === 'profile'">
    <div class="grid lg:grid-cols-12 gap-y-32 gap-x-60 justify-between">
      <div class="lg:col-span-5">
        <h1 class="text-lg lg:text-2xl font-bold text-black">Profile</h1>
        <h2 class="text-sm lg:text-base font-medium text-grey">
          Fill in your personal and company information
        </h2>
      </div>

      <div class="lg:col-span-5 lg:col-end-11">
        <!-- First name and Last name  -->
        <div class="grid grid-cols-2 gap-x-16 mb-12">
          <!-- First Name -->
          <div>
            <label for="first-name">First name</label>
            <input
              type="text"
              class="lg:w-50"
              id="first-name"
              placeholder="Enter first name"
              aria-label="first name"
              v-model.trim="profile.firstname"
            />
          </div>

          <!-- Last Name -->
          <div>
            <label for="last-name">Last name</label>
            <input
              type="text"
              class="lg:w-50"
              id="last-name"
              placeholder="Enter last name"
              aria-label="Last Name"
              v-model.trim="profile.lastname"
            />
          </div>
        </div>

        <!-- Email -->
        <div class="mb-24">
          <label for="email">Email Address</label>
          <input
            type="text"
            placeholder="Enter your email address"
            aria-label="Email"
            v-model="profile.email"
          />
        </div>

        <!-- Phone number -->
        <div class="mb-24">
          <label for="phone">Phone number</label>
          <input
            type="number"
            placeholder="Enter your phone number"
            aria-label="Phone number"
            v-model="profile.phone"
          />
        </div>

        <!-- Gender  -->
        <div class="mb-24 flex">
          <label class="mr-16">Gender</label>
          <div class="mr-8">
            <input
              type="radio"
              name="gender"
              id="male"
              v-model="profile.gender"
              value="male"
            />
            <label for="male"> Male </label>
          </div>

          <div class="">
            <input
              type="radio"
              name="gender"
              id="female"
              v-model="profile.gender"
              value="female"
            />
            <label for="female"> Female </label>
          </div>
        </div>

        <!-- </div> -->

        <!-- Company name  -->
        <!-- <div v-if="!profile.isUpdated">
          <label for="company">Company name (optional)</label>
          <input
            type="text"
            id="companyName"
            v-model.trim="profile.companyname"
            placeholder="Enter the name of your company"
            aria-label="Company name"
          />
        </div> -->

        <!-- company name -->
        <div class="mb-24">
          <label for="company">Company name (optional)</label>
          <input
            type="text"
            id="companyName"
            v-model.trim="profile.companyname"
            aria-label="Company name"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },

    tab: {
      type: String,
    },
  },

  data: () => ({
    profile: {},
  }),

  mounted() {
    this.profile = this.data
  },
}
</script>

<style></style>
