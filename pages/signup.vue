<template>
  <auth-layout>
    <h1 slot="greeting">
      Create an <br />
      account with us
    </h1>

    <p slot="cta">Let’s get you started</p>

    <form>
      <h2>Sign up</h2>
      <div v-if="screen == 'verifier'">
        <!-- Email -->
        <div class="mb-12" :class="{ 'form-group--error': $v.email.$error }">
          <label for="email">Email Address</label>
          <input
            type="text"
            class="form-control"
            placeholder="Enter your email address"
            aria-label="Email"
            v-model="email"
          />

          <field-errors
            v-if="$v.email.$error"
            :field="$v.email"
            alt="Please enter a valid email"
          />
        </div>

        <!-- Continue Button  -->
        <button type="button" @click.prevent="sendOtp" class="mt-24">
          Continue
        </button>
      </div>

      <div v-if="screen == 'otp'">
        <label
          >Enter the code sent to <span>{{ email }}</span> -
          <span>{{ otp }}</span></label
        >
        <!-- Input otp here -->
        <div :class="{ 'form-group--error': $v.code.$error }">
          <otp-input
            ref="otpInput"
            input-classes="otp-input"
            separator=" "
            :num-inputs="6"
            :should-auto-focus="true"
            :is-input-num="true"
            @on-change="getOtpValue"
            @on-complete="getOtpValue"
          />
          <field-errors v-if="$v.code.$error" :field="$v.code" />
        </div>

        <div class="float-right mt-12">
          <!-- Resend  -->
          <span v-if="isTimedout">
            Didn’t get code?
            <a
              class="text-[danger] fw-bold hover:underline hover:underline-offset-8 text-purple"
              @click="sendOtp"
            >
              Resend
            </a>
          </span>

          <!-- Countdown Timer -->
          <strong v-else class="flex">
            {{ countdown.minutes }}:
            {{ countdown.seconds }}
          </strong>
        </div>

        <!-- Continue  -->
        <button type="button" @click.prevent="verifyOtp" class="mt-24">
          Continue
        </button>
      </div>

      <!-- Register  -->
      <div v-if="screen == 'register'">
        <div class="grid grid-cols-2 gap-x-16 mb-12">
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
        <div class="mb-12" :class="{ 'form-group--error': $v.email.$error }">
          <label for="email">Email Address</label>
          <input
            type="text"
            placeholder="Enter your email address"
            v-model="email"
          />

          <field-errors
            v-if="$v.email.$error"
            :field="$v.email"
            alt="Please enter a valid email"
          />

          <!-- <field-errors
                    v-if="errorBag.hasOwnProperty('email')"
                    alt="Email already exist. Please enter another valid email"
                    :field="{}"
                /> -->
        </div>

        <!-- Phone number -->
        <div class="mb-12" :class="{ 'form-group--error': $v.phone.$error }">
          <label for="phone">Phone number</label>

          <input
            type="text"
            placeholder="Enter your phone number"
            v-model="phone"
          />

          <field-errors
            v-if="$v.phone.$error"
            :field="$v.phone"
            alt="Please enter a valid phone number"
          />

          <!-- <field-errors
            v-if="errorBag.hasOwnProperty('phone')"
            alt="Phone number already exist. Please enter another valid phone number"
            :field="{}"
          /> -->
        </div>

        <!-- Password -->
        <div
          class="my-12"
          :class="{ 'form-group--error': $v.password.content.$error }"
        >
          <label for="password">Password</label>
          <!-- Hidden -->
          <div class="flex items-center" v-if="password.hide">
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              aria-label="Password"
              v-model="password.content"
              @keyup.enter="create"
            />

            <!-- Show password button  -->
            <a
              class="eye py-[9px] px-8"
              type="button"
              @click="show(password)"
              v-show="password.hide"
            >
              <span class="hidden">Show password</span>
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
              v-model="password.content"
              @keyup.enter="create"
            />

            <!-- Hide password button  -->
            <a
              class="eye py-[9px] px-8"
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
          class="my-12"
          :class="{ 'form-group--error': $v.confirmPassword.content.$error }"
        >
          <label for="password">Confirm Password</label>
          <!-- Hidden -->
          <div class="flex items-center" v-if="confirmPassword.hide">
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              aria-label="Password"
              v-model="confirmPassword.content"
              @keyup.enter="create"
            />

            <!-- Show password button  -->
            <a
              class="eye py-[9px] px-8"
              type="button"
              @click="show(confirmPassword)"
              v-show="confirmPassword.hide"
            >
              <span class="hidden">Show confirm password</span>
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
              v-model="confirmPassword.content"
              @keyup.enter="create"
            />

            <!-- Hide password button  -->
            <a
              class="eye py-[9px] px-8"
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

        <p class="text-dark text-xs reset">
          By clicking “Register” you agree to the
          <nuxt-link to="/legal#terms" class="text-purple"> Terms </nuxt-link>
          and
          <nuxt-link to="/legal#policy" class="text-purple">
            Privacy Policy
          </nuxt-link>
        </p>

        <button type="submit" @click.prevent="create" class="mt-24">
          <span>Register</span>
        </button>
      </div>

      <!-- Login redirect  -->
      <p class="text-center">
        Already have an account?
        <nuxt-link to="/login" class="text-purple"> Login</nuxt-link>
      </p>
    </form>
    <notifications position="top right" classes="error-notif" />
  </auth-layout>
</template>

<script>
import AuthLayout from '@/components/AuthLayout'
import FieldErrors from '@/components/input/validation'
import IntlNumber from '~/components/input/phone.vue'
import OtpInput from '~/components/input/otp/otp'

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
    AuthLayout,
    FieldErrors,
    IntlNumber,
    OtpInput,
  },
  data() {
    return {
      screen: 'verifier',
      process: ['verifier', 'otp', 'register'],
      countdown: { seconds: 0 },
      code: '',
      otp: '',
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      bvn: '1234567890',

      password: {
        content: '',
        hide: true,
      },

      confirmPassword: {
        content: '',
        hide: true,
      },

      // cPassword: '',
      // hidePassword: true,
      // hideCPassword: true,

      isLoading: false,
      isTimedout: false,
    }
  },

  validations: {
    code: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(6),
    },
    email: { required, email },
    phone: { required, minLength: minLength(11), maxLength: maxLength(15) },

    firstname: { required, minLength: minLength(2) },

    lastname: { required, minLength: minLength(2) },

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

    async sendOtp() {
      this.$v.email.$touch()
      if (this.$v.email.$pending || this.$v.email.$error) return

      try {
        this.isLoading = true
        let res = await this.$axios.$post('/account/otp', {
          email: this.email,
        })
        // for now
        this.otp = res.data.code

        this.startTimer(2)
        this.isLoading = false

        this.screen = this.process[1]
      } catch (error) {
        this.isLoading = false
        this.$notify({
          type: 'error',
          text: 'There was an error signing up',
          duration: 5000,
        })
      }
    },

    async verifyOtp() {
      this.$v.code.$touch()
      if (this.$v.code.$pending || this.$v.code.$error) return

      try {
        this.isLoading = true
        await this.$axios.$post('/account/verify-otp', {
          code: this.code,
        })
        this.isLoading = false

        this.screen = this.process[2]
      } catch (error) {
        this.isLoading = false
        this.$notify({
          type: 'error',
          text: 'Wrong OTP. Try again.',
          duration: 5000,
        })
      }
    },

    async create() {
      this.$v.$touch()
      if (this.$v.$pending || this.$v.$error) return

      try {
        this.isLoading = true
        await this.$axios.$post('/account/register', {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          phone: this.phone,
          // phone: this.phone.split(' ').join(''),
          bvn: this.bvn,
          password: this.password.content,
        })

        await this.$auth.loginWith('local', {
          data: {
            userId: this.email,
            password: this.password.content,
          },
        })

        // redirect
        this.$router.push('/dashboard')
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        this.$notify({
          type: 'error',
          text: 'There was an error signing up',
          duration: 5000,
        })
      }
    },

    startTimer(duration) {
      let timer = duration * 60,
        minutes,
        seconds

      this.countdown = {
        minutes: '0' + duration,
        seconds: '00',
      }

      setInterval((_) => {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10)

        minutes = minutes < 10 ? '0' + minutes : minutes
        seconds = seconds < 10 ? '0' + seconds : seconds

        this.countdown = {
          minutes,
          seconds,
        }

        if (--timer < 0) {
          timer = duration
          this.isTimedout = true
        }
      }, 1000)
    },

    getOtpValue(code) {
      this.code = code
    },
  },
}
</script>

<style lang="postcss" scoped>
p.reset {
  @apply text-xs;
}
</style>
