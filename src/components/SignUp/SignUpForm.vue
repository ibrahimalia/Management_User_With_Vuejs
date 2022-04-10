<template>
  <h2>Sign Up</h2>
  <p class="error-feedback" v-show="message">{{ message }}</p>
  <form @click.prevent>
    <div class="row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <label for="">Name :</label>
        <input
          type="text"
          class="form-control"
          v-model="name"
          id="name"
          aria-describedby="helpId"
          placeholder="Enter Name"
        />

        <span class="error-feedback" v-if="v$.name.$error">{{
          v$.name.$errors[0].$message
        }}</span>
      </div>
    </div>
    <div class="row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <label for="">Email :</label>
        <input
          type="email"
          class="form-control"
          v-model="email"
          id="email"
          aria-describedby="helpId"
          placeholder="Enter Email"
        />

        <span class="error-feedback" v-if="v$.email.$error">{{
          v$.email.$errors[0].$message
        }}</span>
      </div>
    </div>
    <div class="row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <label for="">Password :</label>
        <input
          type="password"
          class="form-control"
          v-model="password"
          id="password"
          aria-describedby="helpId"
          placeholder="Enter password"
        />

        <span class="error-feedback" v-if="v$.password.$error">{{
          v$.password.$errors[0].$message
        }}</span>
      </div>
    </div>
    <br />
    <div class="row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <button type="button" @click="signUpNow()" class="btn btn-success">
          Sign Up
        </button>
        <br />
        <p id="urlSignIn" @click="redirectTo({ name: 'sign-in' })">
          if you have account, go to sign in page
        </p>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
import { required, email } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
export default {
  name: "SignUpForm",
  data() {
    return {
      v$: useVuelidate(),
      name: "",
      email: "",
      password: "",
      message: "",
    };
  },
  validations() {
    return {
      name: { required },
      email: { required, email },
      password: { required },
    };
  },
  mounted() {
    let user = localStorage.getItem("userInfo");
    if (user) {
      this.redirectTo({ name: "Home" });
    }
  },
  methods: {
    ...mapActions("Manage", ["redirectTo"]),

    async signUpNow() {
      if (!this.v$.$error) {
        //
        let check = await axios.get(
          `http://localhost:3000/users?email=${this.email}`
        );
        //
        if (check.data.length != 0) {
          this.message = "account already found in our database";
          return;
        }
        let result = await axios.post("http://localhost:3000/users", {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        if (result.status == 201) {
          localStorage.setItem("userInfo", JSON.stringify(result.data.email));
          this.redirectTo({ name: "Home" });
          console.log(result.data);
        } else {
          this.message = " you faild in enter information try again";
        }
      } else {
        this.message = "Check please filed and try again";
      }
    },
  },

  watch: {
    email: function () {
      this.v$.email.$validate();
    },
    name: function () {
      this.v$.name.$validate();
    },
    password: function () {
      this.v$.password.$validate();
    },
  },
};
</script>

<style lang="scss" scoped>
#urlSignIn {
  color: red;
  font-size: 10px;
  cursor: pointer;
}
#urlSignIn:hover {
  color: green;
}
</style>
