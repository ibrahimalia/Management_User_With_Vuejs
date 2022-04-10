<template>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg fixed-top bg-light navbar-light">
    <div class="container">
      <a class="navbar-brand" href="#"
        ><img
          id="MDB-logo"
          src="https://mdbcdn.b-cdn.net/wp-content/uploads/2018/06/logo-mdb-jquery-small.png"
          alt="MDB Logo"
          draggable="false"
          height="30"
      /></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto align-items-center">
          <li class="nav-item">
            <router-link class="nav-link mx-2" :to="{ name: 'Home' }"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <a class="nav-link mx-2" href="#!">Alerts</a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link mx-2" :to="{ name: 'profile' }"
              >profile</router-link
            >
          </li>
          <li class="nav-item ms-3" @click="logout()">
            <a class="btn btn-outline-success">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- Navbar -->
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "NavBar",
  methods: {
    ...mapActions("Manage", ["redirectTo"]),
    logout() {
      localStorage.clear();
      this.redirectTo({ name: "sign-in" });
    },
  },
};
</script>

<style>
.navbar-light .navbar-nav .nav-link {
  color: #00a0;
}
</style>
