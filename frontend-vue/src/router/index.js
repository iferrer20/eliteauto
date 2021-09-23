import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Cars from '../views/Cars.vue';
import AdminLogin from '../views/AdminLogin.vue';
import Car from '../views/Car.vue';
import Messages from '../views/Messages.vue';

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
  },
  {
    path: '/messages/',
    name: 'Messages',
    component: Messages
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router
