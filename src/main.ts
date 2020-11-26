import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue } from 'bootstrap-vue';
//import '@/assets/styles/styles.scss'
import Vuikit from 'vuikit';
import VuikitIcons from '@vuikit/icons';
import '@vuikit/theme';

Vue.use(Vuikit);
Vue.use(VuikitIcons);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
