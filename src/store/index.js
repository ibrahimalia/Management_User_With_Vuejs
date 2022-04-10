import { createStore } from "vuex";
import Manage  from "./Modules/Manage/index.js";
import Card from "./Modules/Card/index.js";
export default createStore({
  
  modules: { 
    Manage ,
    Card
  },
});
