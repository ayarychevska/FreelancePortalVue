import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue } from "bootstrap-vue";
import "@/assets/styles/styles.scss";
import Vuikit from "vuikit";
import VuikitIcons from "@vuikit/icons";
import "@vuikit/theme";
import axios, { AxiosStatic } from "axios";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import vSelect from 'vue-select';
import Editor from '@tinymce/tinymce-vue'
import VCalendar from 'v-calendar';
import VueNativeSock from 'vue-native-websocket';

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('token')}`;
Vue.prototype.$axios = axios;

declare module "vue/types/vue" {
    interface Vue {
        $axios: AxiosStatic;
    }
}

Vue.use(VueSweetalert2);
Vue.use(Vuikit);
Vue.use(VuikitIcons);
Vue.use(BootstrapVue);
Vue.use(VueNativeSock, 'wss://localhost:5001/ws', {
    store: store,
    connectManually: true,
})

Vue.config.productionTip = false;
Vue.component('v-select', vSelect);
Vue.component('editor', Editor);
// Use v-calendar & v-date-picker components
Vue.use(VCalendar, {});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");

document.title = "Study Portal";