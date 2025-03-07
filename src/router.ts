import { createWebHistory, createRouter } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('./pages/Home.vue')
    },
    {
      name: 'auth-callback',
      path: '/auth/callback',
      component: () => import('./pages/AuthCallback.vue')
    }
  ]
})
