import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Cars from '../views/Cars.vue';
import AdminLogin from '../views/AdminLogin.vue';
import Car from '../views/Car.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cars',
    name: 'Cars',
    component: Cars
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import('../views/About.vue')
  },
  {
    path: '/admin',
    name: 'AdminLogin',
    component: AdminLogin
  },

  {
    path: '/car/:id',
    name: 'Car',
    component: Car
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
