<template>
  <auth-layout>
    <!-- <Notification :message="error" v-if="error" /> -->
    <!-- Login -->

    <h1 slot="greeting">Create an account with us</h1>

    <!-- -->
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

          <!-- <field-errors
                    v-if="errorBag.hasOwnProperty('email')"
                    alt="Email already exist. Please enter another valid email"
                    :field="{}"
                /> -->
        </div>

        <!-- Continue Button  -->
        <button type="button" @click.prevent="sendOtp">Continue</button>
      </div>

      <div v-if="screen == 'otp'">
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

        <div class="flex gap-16">
          <!-- Resend  -->
          <p>
            <span v-if="isTimedout">
              Didn’t get code?
              <a
                class="text-danger fw-bold hover:underline hover:underline-offset-8 text-purple"
                @click="sendOtp"
              >
                Resend
              </a>
            </span>
            <span v-else>
              <strong style="font-size: 20px">
                {{ countdown.minutes }}:
                {{ countdown.seconds }}
              </strong>
            </span>
          </p>

          <!-- Continue  -->
          <button type="button" @click.prevent="verifyOtp">Continue</button>
        </div>
      </div>

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

          <!-- <field-errors
                    v-if="errorBag.hasOwnProperty('email')"
                    alt="Email already exist. Please enter another valid email"
                    :field="{}"
                /> -->
        </div>

        <!-- Phone number -->
        <div class="mb-12" :class="{ 'form-group--error': $v.phone.$error }">
          <label for="phone">Phone number</label>
          <intl-number
            v-model="phone"
            place="Enter your phone number"
            @update="onPhone"
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
        <div
          class="mb-12"
          :class="{ 'form-group--error': $v.cPassword.$error }"
        >
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
      </div>
    </form>
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
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      bvn: '1234567890',
      password: '',

      cPassword: '',
      hidePassword: true,

      isLoading: false,
      isTimedout: false,

      message: '',
      messageState: '',
      errorBag: {},
    }
  },

  validations: {
    code: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(6),
    },
    email: { required },
    phone: { required, minLength: minLength(11), maxLength: maxLength(15) },

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

  methods: {
    showPassword(password) {
      password.hidePassword = this.hidePassword ? false : true
    },
    showCPassword() {
      this.hideCPassword = this.hideCPassword ? false : true
    },

    async sendOtp() {
      this.$v.email.$touch()
      if (this.$v.email.$pending || this.$v.email.$error) return

      try {
        this.isLoading = true

        let res = await this.$axios.$post('/account/otp', {
          email: this.email,
        })

        this.startTimer(2)

        this.screen = this.process[1]
        // this.isLoading = false;
        // this.message = "";
      } catch (error) {
        console.log({ error })
        // this.isLoading = false;
        // this.messageState = true;
        // this.message = "Account already exist";

        // this.status(this.message, "error");
      }
    },

    async verifyOtp() {
      this.$v.code.$touch()
      if (this.$v.code.$pending || this.$v.code.$error) return

      try {
        this.isLoading = true
        let res = await this.$axios.$post('/account/verify-otp', {
          code: this.code,
        })

        this.screen = this.process[2]
        // this.isLoading = false;
        // this.message = "";
      } catch (error) {
        console.log({ error })
        // this.isLoading = false;
        // this.messageState = true;
        // this.message = "Wrong OTP code. Try again";
        // this.status(this.message, "error");
      }

      // register
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
          phone: this.phone.split(' ').join(''),
          bvn: this.bvn,
          password: this.password,
        })

        let res = await this.$auth.loginWith('local', {
          data: {
            userId: this.email,
            password: this.password,
          },
        })

        // this.$store.commit('add', res.data.user)
        // this.$store.commit('login', true)

        // redirect
        this.$router.push('/dashboard')
        // this.message = ''
      } catch (error) {
        // this.isLoading = false
        // this.messageState = true

        // if (error.hasOwnProperty('response')) {
        //   let errData = error.response.data
        //   this.status(errData.message, 'error')
        //   this.errorBag = errData.errors
        // } else {
        //   this.status(error, 'error')
        // }

        console.log({ error })
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
      //  console.log(code);
    },
  },
}
</script>

<style lang="postcss" scoped>
h2 {
  @apply font-bold text-black text-2xl lg:text-3xl;
}
</style>
