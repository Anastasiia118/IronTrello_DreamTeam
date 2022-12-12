import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../pages/Dashboard.vue';
import Auth from '../pages/Auth.vue';
import SingIn from '../components/SingIn.vue';
import SingUp from '../components/SingUp.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   {
    path: "/", 
    component: Dashboard,
   },
   {
    path: "/Auth",
    component: Auth,
    children: [
      {
        path: 'singup',
        component: SingUp,
      },
      {
        path: 'singin',
        component: SingIn,
      },
    ],
   },
  ]
})

export default router
