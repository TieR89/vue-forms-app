import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/form-a',
      name: 'formA',
      component: () => import('../views/FormAView.vue'),
    },
    {
      path: '/form-b',
      name: 'formB',
      component: () => import('../views/FormBView.vue'),
    },
    {
      path: '/result',
      name: 'result',
      component: () => import('../views/ResultView.vue'),
    },
  ],
})

export default router
