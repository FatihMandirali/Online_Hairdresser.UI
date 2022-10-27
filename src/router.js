import Vue from "vue";
import Login from "./pages/login/login_page";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  { path : "/", component : Login },
  { path : "*", redirect : "/"}
];

export const router = new VueRouter({
  mode : "history",
  routes
});
