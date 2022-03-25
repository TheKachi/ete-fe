<template>
  <auth-layout>
    <!-- <Notification :message="error" v-if="error" /> -->
    <!-- Login -->

    <h1 slot="greeting">Welcome back to Ete</h1>

    <!-- -->
    <p slot="cta">Please enter your login details</p>

    <form>
      <h2 class="lg:pt-120">Login</h2>

      <!-- User name/Phone Number -->
      <div class="mb-12" :class="{ 'form-group--error': $v.id.$error }">
        <label for="id">User name</label>
        <input
          type="text"
          placeholder="Enter user name or phone number"
          id="id"
          v-model="id"
        />

        <field-errors
          v-if="$v.id.$error"
          :field="$v.id"
          alt="Please enter a valid user name or phone number"
        />
        <!--
          <field-errors
            v-if="errorBag.hasOwnProperty('email')"
            alt="Email already exist. Please enter another valid email"
            :field="{}"
          /> -->
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
            @keyup.enter="login"
          />

          <!-- Showing  -->
          <input
            type="text"
            id="password"
            placeholder="Enter password"
            aria-label="Password"
            v-model="password"
            @keyup.enter="login"
            v-else
          />

          <a
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
          </a>
        </div>

        <field-errors
          v-if="$v.password.$error"
          :field="$v.password"
          alt="Please enter your password"
        />
      </div>

      <nuxt-link to="/reset-password" class="text-dark text-base float-right">
        Forgot password?
      </nuxt-link>

      <button type="submit" @click.prevent="login" class="">Login</button>

      <p class="text-center">
        Don't have an account?
        <nuxt-link to="/signup" class="text-purple"> Sign up</nuxt-link>
      </p>
    </form>
  </auth-layout>
</template>

<script>
// import platform from 'platform'
// import modal from "~/components/utils/modal";

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
      password: '',
      hidePassword: true,

      isLoading: false,
      message: '',
      messageState: '',
      userData: {},
    }
  },

  methods: {
    showPassword() {
      this.hidePassword = this.hidePassword ? false : true
    },

    // async login() {
    //   this.$v.$touch()
    //   if (this.$v.$pending || this.$v.$error) return

    //   try {
    //     this.isLoading = true
    //     this.$router.push({ name: 'dashboard' })
    //   } catch (error) {
    //     this.isLoading = false
    //     this.messageState = true
    //     this.message = 'Invalid login credentials'
    //     this.status(this.message, 'error')
    //   }
    // },

    login() {
      this.$router.push('/dashboard')

      // alert('You are now logged in')
    },
  },

  validations: {
    id: { required },

    password: {
      required,
      minLength: minLength(6),
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
