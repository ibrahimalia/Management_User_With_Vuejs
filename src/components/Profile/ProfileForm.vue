<template>
  <div class="headerForAllPage">
    <h2>Profile</h2>
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
            disabled
          />
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
          <button type="button" @click="UpdateInfo()" class="btn btn-success">
            Update your information
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { required, email } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
export default {
  data() {
    return {
      v$: useVuelidate(),
      name: "",
      email: "",
      password: "",
      message: "",
      id: "",
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
    (async () => {
      let data = await this.getInfo();
      if (data) {
        this.id = data[0].id;
        this.name = data[0].name;
        this.password = data[0].password;
      }
    })();
  },
  methods: {
    async getInfo() {
      this.email = JSON.parse(localStorage.getItem("userInfo"));
      let info = await axios.get(
        `http://localhost:3000/users?email=${this.email}`
      );
      if (info.status == 200) {
        return info.data;
      } else {
        this.message = "Error .. try again";
        return;
      }
    },
    async UpdateInfo() {
      if (!this.v$.$error) {
        let result = await axios.put(`http://localhost:3000/users/${this.id}`, {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        if (result.status == 200) {
          this.message = " Success in update information";
        } else {
          this.message = " you faild in update information try again";
        }
      } else {
        this.message = "Check please filed and try again";
      }
    },
  },
  watch: {
    name: function () {
      this.v$.name.$validate();
    },
    password: function () {
      this.v$.password.$validate();
    },
  },
};
</script>

<style scopped></style>
