<template>
  <div class="container">
    <sign-up-form />
  </div>
</template>

<script>
import SignUpForm from "@/components/SignUp/SignUpForm.vue";
export default {
  name: "SignUp",
  components: {
    SignUpForm,
  },
  // beforeRouteEnter(to, from, next) {
  //   let user = localStorage.getItem("userInfo");
  //   if (user) {
  //     next({ name: "Home" });
  //   } else {
  //     next();
  //   }
  // },
};
</script>

<style></style>
