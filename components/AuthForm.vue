<template>
  <div>
    <form v-if="!registerActive">
      <h2>Login</h2>

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

          <a class="" href="#" type="button" @click="showPassword">
            <span v-show="hidePassword">show</span>
            <span v-show="!hidePassword">hide</span>
            <span>hide</span>
            <!-- <svg-loader icon="show" path="img" v-show="hidePassword" /> -->
            <!-- <svg-loader icon="hide" path="img" v-show="!hidePassword" /> -->
          </a>
        </div>
        <nuxt-link to="/reset-password" class="text-dark text-base float-right">
          Forgot password?
        </nuxt-link>

        <field-errors
          v-if="$v.password.$error"
          :field="$v.password"
          alt="Please enter your password"
        />
      </div>

      <button type="submit" @click="doLogin" class="">
        <span>Login</span>
      </button>

      <p>
        Don't have an account?
        <a
          href="#"
          @click=";(registerActive = !registerActive), (emptyFields = false)"
          >Sign up</a
        >
      </p>
    </form>

    <form v-else>
      <h2>Sign Up</h2>

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

          <a class="" href="#" type="button" @click="showPassword">
            <span v-show="hidePassword">show</span>
            <span v-show="!hidePassword">hide</span>
            <span>hide</span>
            <!-- <svg-loader icon="show" path="img" v-show="hidePassword" /> -->
            <!-- <svg-loader icon="hide" path="img" v-show="!hidePassword" /> -->
          </a>
        </div>
        <nuxt-link to="/reset-password" class="text-dark text-base float-right">
          Forgot password?
        </nuxt-link>

        <field-errors
          v-if="$v.password.$error"
          :field="$v.password"
          alt="Please enter your password"
        />
      </div>

      <button type="submit" @click="doRegister" class="">
        <span>Sign up</span>
      </button>

      <p>
        Already have an account?
        <a
          href="#"
          @click=";(registerActive = !registerActive), (emptyFields = false)"
          >Sign in</a
        >
      </p>
    </form>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
