import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/admin',
      component: () => import('../views/AdminPage.vue')
    },
    {
      path: '/login',
      component: () => import('../views/LoginPage.vue')
    }
  ]
})

export default router
