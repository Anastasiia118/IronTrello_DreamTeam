import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../pages/Dashboard.vue';
import Auth from '../pages/Auth.vue';
import SignIn from '../components/SignIn.vue';
import SignUp from '../components/SignUp.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   {
    path: "/Dashboard", 
    component: Dashboard,
    children: [
      {
        path: "Auth",
        component: Auth,
        children: [
          {
            path: 'signup',
            component: SignUp,
          },
          {
            path: 'signin',
            component: SignIn,
          },
        ],
       },
    ]
   },
   /* {
    path: "/Auth",
    component: Auth,
    children: [
      {
        path: 'signup',
        component: SignUp,
      },
      {
        path: 'signin',
        component: SignIn,
      },
    ],
   }, */
  ]
})

export default router
