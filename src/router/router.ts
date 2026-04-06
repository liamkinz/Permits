import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import OuterLayout from '@/layout/OuterLayout.vue'
import InnerLayout from '@/layout/InnerLayout.vue'

// Landing Routes
import LandingView from '@/pages/LandingPage/LandingView.vue'

// Auth Routes
import AuthPage from '@/pages/auth/Auth.vue'

// Admin Routes
// import AdminView from '@/pages/AdminPage/AdminView.vue'
import DashboardView from '@/pages/AdminPage/dashboard/DashboardView.vue'
import AdminPermits from '@/pages/AdminPage/permits/components/AdminPermits.vue'

// Error Routes
import AccessDenied from '@/pages/errors/AccessDenied.vue'
import NotFound from '@/pages/errors/404.vue'
import HomePage from '@/pages/HomePage/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: OuterLayout,
      children: [
        {
          path: '',
          name: 'landing',
          component: LandingView,
          meta: { requiresGuest: true },
        },
      ],
    },
    {
      path: '/home',
      component: InnerLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomePage,
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: '/auth',
      component: OuterLayout,
      children: [
        {
          path: '',
          name: 'login',
          component: AuthPage,
          meta: { requiresGuest: true },
        },
        {
          path: 'register',
          name: 'register',
          component: AuthPage,
          meta: { requiresGuest: true },
        },
      ],
    },
    {
      path: '/admin',
      component: InnerLayout,
      children: [
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          component: DashboardView,
          meta: { requiresAuth: true },
        },
        {
          path: 'permits',
          name: 'admin-permits',
          component: AdminPermits,
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: '/access-denied',
      name: 'access-denied',
      component: AccessDenied,
      meta: { title: 'Access Denied' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'page-not-found',
      component: NotFound,
      meta: { title: 'Page Not Found' },
    },
  ],
})

// Navigation Guard
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated

  // If route requires auth and user is NOT logged in -> redirect to login
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' })
  }
  // If route requires guest (login/register) and user IS logged in -> redirect to home
  else if (to.meta.requiresGuest && isAuthenticated) {
    next({ name: 'home' })
  }
  // Otherwise, allow navigation
  else {
    next()
  }
})

export default router
