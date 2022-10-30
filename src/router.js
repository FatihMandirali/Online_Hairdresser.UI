import Vue from "vue";
import Login from "./pages/login/login_page";
import UserList from "./pages/user/user_list";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  { path : "/login", component : Login },
  { path : "/users", component : UserList },
  { path : "*", redirect : "/login"}
];

export const router = new VueRouter({
  mode : "history",
  routes
});
