// =========================================================
// * Vuetify Material Dashboard - v2.1.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vuetify-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import Axios from "axios"

const lang = localStorage.getItem("lang") || "tr";
const axiosInstance = Axios.create({
  baseURL: "http://localhost:5116/tr/api/"
});

Vue.prototype.$axios = axiosInstance;
Axios.defaults.headers.common["Content-Type"] = 'application/json';
Axios.defaults.headers.common["Access-Control-Allow-Methods"]="POST, GET, PUT, DELETE";
Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
Axios.defaults.headers.common['Accept-Language'] = lang;
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

Vue.config.productionTip = false


new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')
