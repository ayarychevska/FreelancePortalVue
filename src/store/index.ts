import Vue from "vue";
import Vuex from "vuex";
import authStore from "@/store/authStore";
import webSocketStore from "@/store/webSocketStore";

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: false,
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: authStore,
    ws: webSocketStore
  }
});

Vue.prototype.$store = store;
export default store;
