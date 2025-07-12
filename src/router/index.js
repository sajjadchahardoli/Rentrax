import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'default',
      component: () => import('../layouts/default.vue'),
      children: [
        {
          path: '',
          redirect: { name: 'testPricing' },
        },
        {
          path: '/test',
          name: 'test',
          component: () => import('../views/TestView.vue'),
          children: [
            {
              path: '/test',
              redirect: { name: 'testPricing' },
            },
            {
              path: 'pricing',
              name: 'testPricing',
              component: () => import('../views/test-view/Pricing.vue'),
            },
            {
              path: 'tax',
              name: 'testTax',
              component: () => import('../views/test-view/Tax.vue'),
            },
            {
              path: 'items',
              name: 'testItems',
              component: () => import('../views/test-view/Items.vue'),
            },
          ],
        },
      ],
    },
  ],
})

export default router
