<template>
  <auth-layout>
    <!-- <Notification :message="error" v-if="error" /> -->
    <!-- Login -->

    <h1 slot="greeting">Welcome back to Ete</h1>

    <!-- -->
    <p slot="cta">Please enter your login details</p>

    <form>
      <h2>Login</h2>

      <!-- Email/Phone Number -->
      <div class="mb-12" :class="{ 'form-group--error': $v.userId.$error }">
        <label for="user-id">Email or phone number</label>
        <input
          type="text"
          placeholder="Enter Email or phone number"
          id="user-id"
          v-model="userId"
        />

        <field-errors
          v-if="$v.userId.$error"
          :field="$v.userId"
          alt="Please enter a valid Email or phone number"
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
        <!-- Hidden -->
        <div class="flex items-center" v-if="hidePassword">
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            aria-label="Password"
            v-model="password"
            @keyup.enter="login"
          />

          <!-- Show password button  -->
          <a
            class="eye py-[9px] px-8"
            type="button"
            @click="showPassword"
            v-show="hidePassword"
          >
            <span class="hidden">Show</span>
            <span><i class="fas fa-eye"></i></span>
          </a>
        </div>

        <!-- Showing  -->
        <div class="flex items-center password" v-else>
          <input
            type="text"
            id="password"
            placeholder="Enter password"
            aria-label="Password"
            v-model="password"
            @keyup.enter="login"
          />

          <!-- Hide password button  -->
          <a
            class="eye py-[9px] px-8"
            type="button"
            @click="showPassword"
            v-show="!hidePassword"
          >
            <span class="hidden">Hide</span>

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
      userId: '',
      password: '',
      hidePassword: true,

      // isLoading: false,
      // message: '',
      // messageState: '',
      // userData: {},
    }
  },

  methods: {
    showPassword() {
      this.hidePassword = this.hidePassword ? false : true
    },

    async login() {
      this.$v.$touch()
      if (this.$v.$pending || this.$v.$error) return

      try {
        this.isLoading = true
        let res = await this.$auth.loginWith('local', {
          data: {
            userId: this.userId,
            password: this.password,
          },
        })

        this.$router.push('/dashboard')
        console.log(res)
      } catch (error) {
        console.log({ error })

        // this.isLoading = false
        // this.messageState = true
        // this.message = 'Invalid login credentials'
        // this.status(this.message, 'error')
      }
    },
  },

  validations: {
    userId: { required },

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
