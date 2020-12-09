import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: () => import("../views/Default.vue"),
    children: [
      {
        path: "/",
        name: "Home",
        component: Home
      },
      {
        path: "/about",
        name: "About",
        // route leśvel code-splitting/
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue")
      }
    ]
  },
  {
    path: "/auth",
    component: () =>
      import(/* webpackChunkName: "auth" */ "../views/DefaultEmpty.vue"),
    children: [
      {
        path: "registration",
        name: "auth-registration",
        component: () =>
          import(
            /* webpackChunkName: "auth" */ "../views/core/common/auth/Registration.vue"
          )
      },
      {
        path: "login",
        name: "auth-login",
        component: () =>
          import(
            /* webpackChunkName: "auth" */ "../views/core/common/auth/Login.vue"
          )
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
