<template>
  <auth-layout>
    <!-- <Notification :message="error" v-if="error" /> -->
    <!-- Login -->

    <h1 slot="greeting">Create an account with us</h1>

    <!-- -->
    <p slot="cta">Let’s get you started</p>

    <form>
      <h2>Sign up</h2>

      <div class="grid grid-cols-2 gap-x-16">
        <!-- First Name -->
        <div :class="{ 'form-group--error': $v.firstname.$error }">
          <label for="first-name">First name</label>
          <input
            type="text"
            class="lg:w-50"
            id="first-name"
            placeholder="Enter first name"
            aria-label="first name"
            v-model.trim="firstname"
          />
          <field-errors
            v-if="$v.firstname.$error"
            :field="$v.firstname"
            alt="Please enter your firstname"
          />
        </div>

        <!-- Last Name -->
        <div :class="{ 'form-group--error': $v.lastname.$error }">
          <label for="last-name">Last name</label>
          <input
            type="text"
            class="lg:w-50"
            id="last-name"
            placeholder="Enter last name"
            aria-label="Last Name"
            v-model.trim="lastname"
          />
          <field-errors
            v-if="$v.lastname.$error"
            :field="$v.lastname"
            alt="Please enter your last name"
          />
        </div>
      </div>

      <!-- Email -->
      <div class="mb-12" :class="{ 'form-group--error': $v.id.$error }">
        <label for="email">Email Address</label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter your email address"
          aria-label="Email"
          v-model="id"
        />

        <field-errors
          v-if="$v.id.$error"
          :field="$v.id"
          alt="Please enter a valid Phone no or email"
        />

        <!-- <field-errors
                    v-if="errorBag.hasOwnProperty('email')"
                    alt="Email already exist. Please enter another valid email"
                    :field="{}"
                /> -->
      </div>

      <!-- Phone number -->

      <!-- <div class="mb-12">
        <label for="phone">Phone number</label>
        <input
          type="number"
          class="form-control"
          placeholder="Enter your phone number"
          aria-label="Phone number"
          v-model="id"
        />

        <field-errors
          v-if="$v.id.$error"
          :field="$v.id"
          alt="Please enter a valid Phone no or email"
        />
      </div> -->

      <!-- Company name  -->
      <div>
        <label for="company">Company name (optional)</label>
        <input
          type="text"
          id="companyName"
          class="form-control"
          v-model.trim="companyname"
          placeholder="Enter the name of your company"
          aria-label="Company name"
        />
      </div>

      <!-- Password -->
      <div class="my-12" :class="{ 'form-group--error': $v.password.$error }">
        <label for="password">Password</label>
        <div>
          <!-- Hidden -->
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            aria-label="Password"
            v-model="password"
            v-if="hidePassword"
            @keyup.enter="create"
          />

          <!-- Showing  -->
          <input
            type="text"
            id="password"
            placeholder="Enter password"
            aria-label="Password"
            v-model="password"
            @keyup.enter="create"
            v-else
          />

          <!-- <a
            class=""
            href="#"
            type="button"
            @click="showPassword"
            v-show="hidePassword"
          >
            <span><i class="fas fa-eye"></i></span>
          </a>
          <a
            class=""
            href="#"
            type="button"
            @click="showPassword"
            v-show="!hidePassword"
          >
            <span><i class="fas fa-eye-slash"></i></span>
          </a> -->
        </div>

        <field-errors
          v-if="$v.password.$error"
          :field="$v.password"
          alt="Please enter your password"
        />
      </div>

      <!-- Confirm Password -->
      <div class="mb-12" :class="{ 'form-group--error': $v.cPassword.$error }">
        <label for="confirm-password">Confirm Password</label>
        <div class="input-group">
          <!-- Hidden -->
          <input
            type="password"
            class="form-control border-end-0"
            id=""
            placeholder="Confirm Password"
            aria-label="Confirm Password"
            v-model="cPassword"
            v-if="hideCPassword"
          />
          <!-- Showing  -->
          <input
            type="text"
            class="form-control border-end-0"
            id=""
            placeholder="Confirm Password"
            aria-label="Confirm Password"
            v-model="cPassword"
            v-else
          />

          <!-- <button
            class="btn border border-start-0"
            type="button"
            @click="showCPassword"
          >
            <span v-if="hideCPassword">
              ><i class="fas fa-eye-slash ml-8"></i>
            </span>
            <span v-else> <i class="fas fa-eye-slash ml-8"></i> </span>
          </button> -->
        </div>
        <field-errors
          v-if="$v.cPassword.$error"
          :field="$v.cPassword"
          alt="Please enter password confirmation"
        />
      </div>

      <p class="text-dark text-sm float-right">
        By clicking “Register” you agree to the
        <nuxt-link to="/legal#terms" class="text-purple"> Terms </nuxt-link>
        and
        <nuxt-link to="/legal#policy" class="text-purple">
          Privacy Policy
        </nuxt-link>
      </p>

      <button type="submit" @click.prevent="create" class="">
        <span>Register</span>
      </button>

      <p class="text-center">
        Already have an account?
        <nuxt-link to="/login" class="text-purple"> Login</nuxt-link>
      </p>
    </form>
  </auth-layout>
</template>

<script>
import AuthLayout from '@/components/AuthLayout'
import fieldErrors from '@/components/input/validation'
import {
  required,
  minLength,
  maxLength,
  sameAs,
  email,
  numeric,
} from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      // isModalActive: false,
      id: '',
      firstname: '',
      lastname: '',
      intlPhone: '',
      companyname: '',
      password: '',
      cPassword: '',
      password: '',
      hidePassword: true,

      isLoading: false,
      message: '',
      messageState: '',
      userData: {},
    }
  },

  methods: {
    showPassword(password) {
      password.hidePassword = this.hidePassword ? false : true
    },
    showCPassword() {
      this.hideCPassword = this.hideCPassword ? false : true
    },
    create() {
      this.$router.push('/dashboard')
    },
  },

  validations: {
    id: { required },

    firstname: { required, minLength: minLength(2) },

    lastname: { required, minLength: minLength(2) },

    password: {
      required,
      minLength: minLength(6),
    },

    cPassword: {
      required,
      sameAsPassword: sameAs('password'),
    },
  },

  components: {
    fieldErrors,
    AuthLayout,
    // modal
  },
}
</script>

<style lang="postcss" scoped>
h2 {
  @apply font-bold text-black text-2xl lg:text-3xl;
}
</style>
