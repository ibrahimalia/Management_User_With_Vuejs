<template>
  <div class="headerForAllPage">
    <div class="hero-image">
      <div class="hero-text">
        <p>Welcome in<br />MDB</p>

        <!-- Button trigger modal -->
        <button
          type="button"
          class="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add Resturant
        </button>
      </div>
      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Add Your Restaurant
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form @click.prevent>
                <div class="row g-3 align-items-center">
                  <div class="col-auto d-block mx-auto">
                    <label for="">Name :</label>
                    <input
                      type="text"
                      class="form-control"
                      id="name"
                      v-model="obj.name"
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
                    <label for="">Phone Number :</label>
                    <input
                      type="text"
                      v-model="obj.phone"
                      class="form-control"
                      id="phone"
                      aria-describedby="helpId"
                      placeholder="Enter phone number"
                    />
                    <span class="error-feedback" v-if="v$.phone.$error">{{
                      v$.phone.$errors[0].$message
                    }}</span>
                  </div>
                </div>
                <div class="row g-3 align-items-center">
                  <div class="col-auto d-block mx-auto">
                    <label for="">Address :</label>
                    <input
                      type="text"
                      v-model="obj.address"
                      class="form-control"
                      id="address"
                      aria-describedby="helpId"
                      placeholder="Enter address"
                    />
                    <span class="error-feedback" v-if="v$.address.$error">{{
                      v$.address.$errors[0].$message
                    }}</span>
                    <span>{{titleGet}}</span>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-danger"
                @click="addResturant({name:'Ibrahim'})"
              > Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { computed, reactive, watch } from "vue-demi";
import {mapGetters} from "vuex"
export default {
  name: "AddRestaurantForm",
  setup() {
    /*Start vulidate*/
    const obj = reactive({
      name: "",
      phone: "",
      address: "",
    });
    const rules = computed(() => {
      return {
        name: { required },
        phone: { required },
        address: { required },
      };
    });

    const v$ = useVuelidate(rules, obj);

    watch(obj, () => {
      v$.value.$validate();
    });

    return {
      obj,
      v$,
    };
  },
  computed:{
    ...mapGetters("Card",["titleGet"]),
  },
  /* section methods */
  methods: {
  },
};
</script>

<style scoped>
.hero-image {
  background-image: url("./../../assets/HomeImage/p1.jpeg");
  background-color: #cccccc;
  height: 500px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.hero-text {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 50px;
}
</style>
