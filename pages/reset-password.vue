<template>
  <auth-layout>
    <h1 slot="greeting">Forgot password?</h1>

    <!-- -->
    <p slot="cta">
      Enter your registered email to receive password reset instructions
    </p>

    <form>
      <div v-if="screen == 'verifier'">
        <!-- Email -->
        <div class="mb-12" :class="{ 'form-group--error': $v.email.$error }">
          <label for="email">Email Address</label>
          <input
            type="text"
            class="form-control"
            placeholder="Enter your registered email address"
            v-model="email"
          />

          <field-errors
            v-if="$v.email.$error"
            :field="$v.email"
            alt="Please enter a valid email"
          />
        </div>

        <!-- Continue Button  -->
        <button type="button" @click.prevent="verifyEmail" class="mt-24">
          Continue
        </button>
      </div>

      <!-- Reset Password  -->
      <div v-if="screen == 'reset'">
        <!-- Password -->
        <div
          class="my-20"
          :class="{ 'form-group--error': $v.password.content.$error }"
        >
          <label for="new-password">Password</label>
          <!-- Hidden -->
          <div class="relative" v-if="password.hide">
            <input
              type="password"
              id="new-password"
              placeholder="Enter your new password"
              aria-label="new-Password"
              v-model="password.content"
              @keyup.enter="create"
            />

            <!-- Show password button  -->
            <a
              class="absolute top-[9px] right-8"
              type="button"
              @click="show(password)"
              v-show="password.hide"
            >
              <span class="hidden">Show password</span>
              <span><i class="fas fa-eye"></i></span>
            </a>
          </div>

          <!-- Showing  -->
          <div class="relative" v-else>
            <input
              type="text"
              id="new-password"
              placeholder="Enter your new password"
              aria-label="new-Password"
              v-model="password.content"
              @keyup.enter="create"
            />

            <!-- Hide password button  -->
            <a
              class="absolute top-[9px] right-8"
              href="#"
              type="button"
              @click="show(password)"
              v-show="!password.hide"
            >
              <span class="hidden">Hide password</span>
              <span><i class="fas fa-eye-slash"></i></span>
            </a>
          </div>

          <field-errors
            v-if="$v.password.content.$error"
            :field="$v.password.content"
            alt="Please enter your password"
          />
        </div>

        <!-- Confirm Password -->
        <div
          class="my-20"
          :class="{ 'form-group--error': $v.confirmPassword.content.$error }"
        >
          <label for="confirm-password">Confirm Password</label>
          <!-- Hidden -->
          <div class="relative" v-if="confirmPassword.hide">
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm password"
              v-model="confirmPassword.content"
              @keyup.enter="create"
            />

            <!-- Show password button  -->
            <a
              class="absolute top-[9px] right-8"
              type="button"
              @click="show(confirmPassword)"
              v-show="confirmPassword.hide"
            >
              <span class="hidden">Show confirm password</span>
              <span><i class="fas fa-eye"></i></span>
            </a>
          </div>

          <!-- Showing  -->
          <div class="relative" v-else>
            <input
              type="text"
              placeholder="Confirm password"
              aria-label="Confirm Password"
              v-model="confirmPassword.content"
              @keyup.enter="create"
            />

            <!-- Hide password button  -->
            <a
              class="absolute top-[9px] right-8"
              href="#"
              type="button"
              @click="show(confirmPassword)"
              v-show="!confirmPassword.hide"
            >
              <span class="hidden">Hide confirm password</span>
              <span><i class="fas fa-eye-slash"></i></span>
            </a>
          </div>

          <field-errors
            v-if="$v.confirmPassword.content.$error"
            :field="$v.confirmPassword.content"
          />
        </div>

        <button type="submit" @click.prevent="reset" class="mt-24">
          Reset Password
        </button>
      </div>
    </form>
    <div class="w-64 mx-auto">
      <loader v-if="isLoading" />
    </div>
  </auth-layout>
</template>

<script>
import AuthLayout from '@/components/AuthLayout'
import FieldErrors from '@/components/input/validation'

import {
  required,
  minLength,
  maxLength,
  sameAs,
  email,
  numeric,
} from 'vuelidate/lib/validators'
import Loader from '~/components/utils/Loader.vue'
export default {
  components: {
    AuthLayout,
    FieldErrors,
    Loader,
  },
  data() {
    return {
      screen: 'verifier',
      process: ['verifier', 'reset'],
      token: '',
      email: '',
      password: {
        content: '',
        hide: true,
      },

      confirmPassword: {
        content: '',
        hide: true,
      },

      isLoading: false,
      isTimedout: false,

      message: '',
      messageState: '',
    }
  },

  validations: {
    email: { required, email },

    password: {
      content: {
        required,
        minLength: minLength(6),
      },
    },

    confirmPassword: {
      content: {
        required,
        sameAsPassword: sameAs(function () {
          return this.password.content
        }),
      },
    },
  },

  methods: {
    show(password) {
      password.hide = password.hide ? false : true
    },

    async verifyEmail() {
      this.$v.email.$touch()
      if (this.$v.email.$pending || this.$v.email.$error) return

      try {
        this.isLoading = true

        let res = await this.$axios.$post('/account/forgot-password', {
          email: this.email,
        })
        this.isLoading = false

        this.token = res.data.token
        this.screen = this.process[1]
      } catch (error) {
        this.isLoading = false

        alert('There was an error confirming email address')
        console.log({ error })
      }
    },

    async reset() {
      this.$v.$touch()
      if (this.$v.$pending || this.$v.$error) return

      try {
        this.isLoading = true
        await this.$axios.$post('/account/reset-password', {
          token: this.token,
          password: this.password.content,
        })
        this.isLoading = false

        // redirect
        this.$router.push('/login')
      } catch (error) {
        this.isLoading = false

        console.log({ error })
      }
    },
  },
}
</script>
