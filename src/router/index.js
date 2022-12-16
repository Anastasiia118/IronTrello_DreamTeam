import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../pages/Dashboard.vue";
import Auth from "../pages/Auth.vue";
import SignIn from "../components/SignIn.vue";
import SignUp from "../components/SignUp.vue";
import userStore from "../stores/user.js"; 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: Dashboard,
      meta: { requiresAuth: true }
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
          name: "signup",
          component: SignIn,
        },
      ],
    },
  ],
});

router.beforeEach((to) => {
  const store = userStore();
  if (to.meta.requiresAuth && !store.user) return '/Auth/signin'
});

export default router;
