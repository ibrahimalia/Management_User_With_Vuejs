<template>
  <nav-bar />
  <profile-form />
</template>

<script>
import NavBar from "@/components/Header/NavBar.vue";
import ProfileForm from "@/components/Profile/ProfileForm.vue";
export default {
  name: "profile",
  components: {
    ProfileForm,
    NavBar,
  },
  beforeRouteEnter(to, from, next) {
    let user = localStorage.getItem("userInfo");
    if (!user) {
      next({ name: "sign-up" });
    } else {
      next();
    }
  },
};
</script>

<style></style>
