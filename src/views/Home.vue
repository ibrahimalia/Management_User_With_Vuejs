<template>
  <nav-bar />
  <add-restaurant-form />
</template>

<script>
// import {mapActions} from 'vuex';
import NavBar from "@/components/Header/NavBar.vue";
import AddRestaurantForm from "@/components/Home/AddRestaurantForm.vue";
export default {
  name: "Home",
  components: {
    NavBar,
    AddRestaurantForm,
  },
  // mounted() {
  //   let user = localStorage.getItem("userInfo");
  //   if (!user) {
  //     this.redirectTo({name : "sign-up"});
  //   }
  // },
  beforeRouteEnter(to, from, next) {
    let user = localStorage.getItem("userInfo");
    if (!user) {
      next({ name: "sign-up" });
    } else {
      next();
    }
  },
  methods: {
    // ...mapActions(["redirectTo"]),
  },
};
</script>
<style scoped>
body {
  margin: 0px;
}
</style>
