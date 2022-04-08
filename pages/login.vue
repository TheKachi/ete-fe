<template>
  <auth-layout>
    <h1 slot="greeting">
      Welcome back <br />
      to Ete
    </h1>

    <!-- -->
    <p slot="cta">Please enter your login&nbsp;details</p>

    <form>
      <h2>Login</h2>

      <!-- Email/Phone Number -->
      <div class="mb-12" :class="{ 'form-group--error': $v.userId.$error }">
        <label for="user-id">Email or phone number</label>
        <input
          type="text"
          placeholder="Enter Email or phone number"
          id="user-id"
          v-model.trim="userId"
        />

        <field-errors
          v-if="$v.userId.$error"
          :field="$v.userId"
          alt="Please enter a valid Email or phone number"
        />
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
      <div class="w-64 mx-auto">
        <loader v-if="isLoading" />
      </div>
    </form>
    <notifications position="top center" classes="notif" />
  </auth-layout>
</template>

<script>
import AuthLayout from '~/components/AuthLayout'
import Loader from '~/components/utils/Loader.vue'
import fieldErrors from '~/components/input/validation'
import {
  required,
  minLength,
  maxLength,
  sameAs,
  email,
  numeric,
} from 'vuelidate/lib/validators'
export default {
  components: {
    fieldErrors,
    AuthLayout,
    Loader,
  },
  data() {
    return {
      userId: '',
      password: '',
      hidePassword: true,

      isLoading: false,
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
        console.log({ res })
        this.isLoading = false
        this.$router.push('/dashboard')
      } catch (error) {
        this.isLoading = false
        this.$notify({
          type: 'error',
          text: 'Invalid login credentials.',
          duration: 5000,
        })
        console.log({ error })
      }
    },
  },

  validations: {
    userId: { required, email },

    password: {
      required,
      minLength: minLength(6),
    },
  },
}
</script>
