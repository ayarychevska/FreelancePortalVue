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
                component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
            },
            {
                path: "/dashboard",
                name: "dashboard",
                component: () => import(/* webpackChunkName: "about" */ "../views/core/common/dashboard/Dashboard.vue")
            },
            {
                path: "/user-profile",
                name: "user-profile",
                component: () => import(/* webpackChunkName: "about" */ "../views/core/common/user/Profile.vue")
            },
            {
                path: "/user-view/:id",
                name: "user-view",
                component: () => import(/* webpackChunkName: "about" */ "../views/core/common/user/View.vue")
            },
            {
                path: "/my-posts",
                name: "my-posts",
                component: () => import(/* webpackChunkName: "about" */ "../views/core/teacher/post/MyPostsList.vue")
            },
            {
                path: "/post-add",
                name: "post-add",
                component: () => import(/* webpackChunkName: "about" */ "../views/core/teacher/post/PostCreation.vue")
            },
            {
                path: "/post-edit/:id",
                name: "post-edit",
                component: () => import(/* webpackChunkName: "about" */ "../views/core/teacher/post/PostCreation.vue")
            },
            {
                path: "/post-details/:id",
                name: "post-details",
                component: () => import(/* webpackChunkName: "about" */ "../views/core/common/post/View.vue")
            },
            {
                path: "calendar",
                name: "calendar",
                component: () => import(/* webpackChunkName: "about" */ "../views/core/common/calendar/Cal.vue")
            },
            {
                path: "appointment",
                name: "appointment",
                component: () => import(/* webpackChunkName: "about" */ "../views/core/common/appointment/List.vue")
            },
            {
                path: "appointment-add/:id",
                name: "appointment-add",
                component: () => import(/* webpackChunkName: "about" */ "../views/core/common/appointment/Create.vue")
            },
            {
                path: "appointment-edit/:id",
                name: "appointment-edit",
                component: () => import(/* webpackChunkName: "about" */ "../views/core/common/appointment/Create.vue")
            },
            {
                path: "appointment-details/:id",
                name: "appointment-details",
                component: () => import(/* webpackChunkName: "about" */ "../views/core/common/appointment/Details.vue")
            }
        ]
    },
    {
        path: "/auth",
        component: () => import(/* webpackChunkName: "auth" */ "../views/DefaultEmpty.vue"),
        children: [
            {
                path: "registration",
                name: "auth-registration",
                component: () => import(/* webpackChunkName: "auth" */ "../views/core/common/auth/Registration.vue")
            },
            {
                path: "login",
                name: "auth-login",
                component: () => import(/* webpackChunkName: "auth" */ "../views/core/common/auth/Login.vue")
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
