import Vue from "vue";
import Vuex from "vuex";
import authStore from "@/store/authStore";

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: false,
  state: {},
  mutations: {},
  actions: {},
  modules: { auth: authStore }
});

Vue.prototype.$store = store;
export default store;
