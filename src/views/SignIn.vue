<template>
  <div class="container">
    <sign-in-form />
  </div>
</template>

<script>
import SignInForm from "@/components/SignIn/SignInForm.vue";
export default {
  name: "signIn",
  components: {
    SignInForm,
  },
  beforeRouteEnter(to, from, next) {
    let user = localStorage.getItem("userInfo");
    if (!user) {
      next();
    } else {
      next({ name: "Home" });
    }
  },
};
</script>

<style></style>
