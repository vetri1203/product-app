import { createRouter, createWebHistory } from "vue-router";

import HomeApp from "./components/Home";
import NotFound from "./components/PageNotFound";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
const routes = [
  {
    path: "/home",
    name: "Home",
    component: HomeApp,
  },

  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },

  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },

  /*page not found and bad requeest*/

  {
    path: "/404",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
];

const route = createRouter({
  history: createWebHistory(),
  routes,
});

export default route;
