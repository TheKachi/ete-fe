<template>
  <div v-if="tab === 'bank'">
    <!-- Bank name -->
    <div class="">
      <label for="acct-name" class="text-black">Bank name</label>
      <div class="col mb-3">
        {{ bankData.bank }}
      </div>
    </div>

    <!-- Account Name -->
    <div class="">
      <h3 class="text-dark">Account Name</h3>
    </div>
    <div class="col mb-3">
      {{ bankData.name }}
    </div>

    <!-- Account Number -->
    <div class="">
      <h3 class="text-dark">Account Number</h3>
    </div>
    <div class="col mb-3">
      {{ bankData.number }}
    </div>

    <!-- Account Name -->
    <!-- <div>
      <label for="acct-name">Account name</label>
      <input
        type="text"
        class="lg:w-50"
        id="last-name"
        placeholder="Enter last name"
        aria-label="Last Name"
        v-model.trim="acctName"
        disabled
      />
    </div> -->
  </div>
</template>

<script>
// import axios from 'axios'
import SvgLoader from '~/components/utils/SvgLoader'

// const psSecKey = process.env.PS_SECRET_KEY

// import modal from '~/components/utils/modal'
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
  props: {
    data: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      // banks: [],
      // acctName: '',
      // bank: {},
      // code: '',
      // acctNo: '',
      // processAction: '',
      // password: '',
      // hidePassword: true,
      // passwordPanel: false,
      // isActive: false,
      // processing: false,
      // isLoading: false,
      // isSuccess: false,
      // mgs: '',
      // bankDetails: {},
      // title: '',
      // schedule: '',
    }
  },

  validations: {
    password: { required },
    bank: {
      code: { required },
    },
  },

  methods: {
    // async getbanks() {
    //    try {
    //       let url = "https://api.paystack.co/bank";
    //       let res = await axios.get(url, {
    //          headers: {
    //             Authorization: "Bearer " + psSecKey
    //          }
    //       });
    //       this.banks = res.data.data;
    //    } catch (error) {
    //       console.log(error);
    //    }
    // },
    // async getAccount() {
    //    if (this.number.toString().length == 10) {
    //       this.$v.bank.code.$touch();
    //       if (this.$v.bank.code.$pending || this.$v.bank.code.$error) return;
    //       this.isLoading = true;
    //       this.mgs = "Verifying account details...";
    //       try {
    //          let url = `https://api.paystack.co/bank/resolve?account_number=${this.number}&bank_code=${this.bank.code}`;
    //          let res = await axios.get(url, {
    //             headers: {
    //                Authorization: "Bearer " + psSecKey
    //             }
    //          });
    //          this.name = res.data.data.account_name;
    //          this.isLoading = false;
    //       } catch (error) {
    //          this.isLoading = false;
    //          console.log(error);
    //       }
    //    }
    // },
    // async addBank() {
    //    try {
    //       this.isLoading = true;
    //       this.mgs = "Processing... Please wait!";
    //       let detail = {
    //          code: this.bank.code,
    //          bank: this.bank.name,
    //          account: this.number,
    //          name: this.name,
    //          user: this.user._id
    //       };
    //       let res = await this.$axios.$post("/user/add-bank", detail);
    //       this.mgs = "Account added successfully!";
    //       this.bankDetails = detail;
    //       this.isActive = true;
    //       this.isSuccess = true;
    //       this.isLoading = false;
    //       setTimeout(_ => {
    //          this.passwordPanel = false;
    //          this.processing = false;
    //          this.password = "";
    //       }, 3000);
    //    } catch (error) {
    //       console.log(error);
    //       this.isLoading = false;
    //       //
    //    }
    // },
    // modalClose(val) {
    //    this.passwordPanel = val;
    // },
    // promptPassword() {
    //    this.passwordPanel = true;
    // },
    // async checkPassword() {
    //    this.$v.password.$touch();
    //    if (this.$v.password.$pending || this.$v.password.$error) return;
    //    try {
    //       let res = await this.$axios.$post("/auth/password-check", {
    //          email: this.user.email,
    //          password: this.password
    //       });
    //       if (res.status) {
    //          this.addBank();
    //          // this.passwordPanel = false;
    //          this.processing = true;
    //       }
    //       console.log(res);
    //    } catch (error) {
    //       console.log(error);
    //    }
    // },
    // showPassword() {
    //    this.hidePassword = this.hidePassword ? false : true;
    // },
    // toggleUpdate() {
    //    if (this.isActive) {
    //       this.isActive = false;
    //       this.getbanks();
    //    } else {
    //       this.isActive = true;
    //    }
    // }
  },

  mounted() {
    this.bankDetails = this.data

    //     if (this.bankDetails !== null) {
    //        this.isActive = true;
    //     } else {
    //        this.getbanks();
    //     }
  },

  components: {
    fieldErrors,
    SvgLoader,
    // modal,
  },
}
</script>

<style></style>
