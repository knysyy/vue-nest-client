import Vue from "vue";
import Router from "vue-router";
import store from "./store";
import Home from "./views/Home.vue";
import Signup from "./views/Signup";
import Login from "./views/Login";

Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        isPublic: true
      }
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup,
      meta: {
        isPublic: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        isPublic: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some(record => !record.meta.isPublic) &&
    !store.getters["auth/isAuthenticated"]
  ) {
    next({
      path: "/login",
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
});

export default router;
