import Vue from 'vue'
import App from './App.vue'
import Vuelidate from "vuelidate";
import Axios from "axios";
import { router } from "./router";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

console.log(process.env.VUE_APP_TITLE)

Vue.use(Vuelidate);
Vue.use(VueSweetalert2);

const axiosInstance = Axios.create({
  baseURL: process.env.VUE_APP_API_URL
});
Vue.prototype.$axios = axiosInstance;
Axios.interceptors.request.use(
    function(config) {
      console.log(config);
      // Do something before request is sent
      //config.headers.common['interceptorheader'] = 'Interceptor Header';
      return config;
    },
    function(error) {
      // Do something with request error
      return Promise.reject(error);
    },
);

Axios.interceptors.response.use(
    function(response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data

      return response;
    },
    function(error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    },
);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
