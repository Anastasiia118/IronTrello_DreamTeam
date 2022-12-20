import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../pages/Dashboard.vue";
import Auth from "../pages/Auth.vue";
import SignIn from "../components/SignIn.vue";
import SignUp from "../components/SignUp.vue";
import userStore from "../stores/user.js";
import PageError from "../pages/PageError.vue";
import NewPassword from "../components/NewPassword.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: Dashboard,
      meta: { requiresAuth: true },
    },
    {
      path: "/Auth",
      name: "Auth",
      component: Auth,
      children: [
        {
          path: "signup",
          name: "signup",
          component: SignUp,
        },
        {
          path: "signin",
          name: "signin",
          component: SignIn,
        },
        {
          path: "newpass",
          name: "newpass",
          component: NewPassword,
        }
      ],
    },
    {
      name: "NotFound",
      path: "/:pathMatch(.*)*",
      component: PageError,
    },
  ],
});

router.beforeEach( async (to) => {
  const store = userStore();
  await store.fetchUser();
  
  if (to.fullPath.includes("type=recovery")) {
    store.accessToken = to.fullPath.substring(to.fullPath.indexOf('='), to.fullPath.indexOf('&'))
    alert("soy el recovery")
    return "/Auth/newpass"
  }  
  if (to.meta.requiresAuth && !store.user) return "/Auth/signin";
 
});


export default router;
