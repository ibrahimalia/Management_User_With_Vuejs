<template>
  <h2>Sign In</h2>
  <p class="error-feedback" v-show="obj.message">{{ obj.message }}</p>
  <form @click.prevent>
    <div class="row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <label for="">Email :</label>
        <input
          type="email"
          class="form-control"
          v-model="obj.email"
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
          v-model="obj.password"
          id="password"
          aria-describedby="helpId"
          placeholder="Enter Password"
        />
        <span class="error-feedback" v-if="v$.password.$error">{{
          v$.password.$errors[0].$message
        }}</span>
      </div>
    </div>
    <br />
    <div class="row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <button type="button" @click="signInNow()" class="btn btn-success">
          Sign In</button
        ><br />
        <p id="urlSignUp" @click="redirectTo({ name: 'sign-up' })">
          if you don't have account, go to sign up page
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
import { watch, reactive, computed } from "vue";
export default {
  name: "signInForm",
  setup() {
    const obj = reactive({
      email: "",
      password: "",
      message: "",
    });

    const rules = computed(() => {
      return {
        email: { required, email },
        password: { required },
      };
    });

    const v$ = useVuelidate(rules, obj);
    watch(
      () => obj,
      () => {
        v$.value.$validate();
      },
      { deep: true }
    );
    return {
      obj,
      v$,
    };
  },
  methods: {
    ...mapActions("Manage", ["redirectTo"]),
    async signInNow() {
      if (!this.v$.$error) {
        let check = await axios.get(
          `http://localhost:3000/users?email=${this.obj.email}`
        );
        //
        if (check.data.length == 0) {
          this.obj.message =
            "account doesn't find in our database, please go to sign up page";
          return;
        }
        //
        localStorage.setItem("userInfo", JSON.stringify(this.obj.email));
        this.redirectTo({ name: "Home" });
      } else {
        this.obj.message = "Check please filed and try again";
      }
    },
  },
};
</script>
<style scoped>
#urlSignUp {
  color: red;
  font-size: 10px;
  cursor: pointer;
}
#urlSignUp:hover {
  color: green;
}
</style>
