import Vue from "vue";
import Router from "vue-router";
import store from "./store";
import Home from "./views/Home.vue";
import Signup from "./views/Signup";
import Login from "./views/Login";
import User from "./views/User";
import Snippet from "./views/Snippet";
import Label from "./views/Label";
import SnippetFooter from "./components/snippet/SnippetFooter";
import LabelFooter from "./components/label/LabelFooter";
import EditSnippet from "./views/EditSnippet";

Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        isPublic: true
      }
    },
    {
      path: "/about",
      name: "About",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/signup",
      name: "SignUp",
      component: Signup,
      meta: {
        isPublic: true
      }
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        isPublic: true
      }
    },
    {
      path: "/user",
      name: "User",
      component: User
    },
    {
      path: "/snippet",
      name: "Snippet",
      components: {
        default: Snippet,
        snippet: SnippetFooter
      }
    },
    {
      path: "/snippet/:id",
      name: "Edit Snippet",
      component: EditSnippet
    },
    {
      path: "/label",
      name: "Label",
      components: {
        default: Label,
        label: LabelFooter
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
