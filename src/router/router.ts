import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
// import { useAuthStore } from "@/stores/authStore";

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('@/pages/LandingPage/LandingView.vue'),
  },
  // {
  //   path: "/home",
  //   name: "home",
  //   component: () => import("@/pages/HomePage/HomeView.vue"),
  //   meta: {
  //     title: "Home",
  //     guard: "auth",
  //   },
  // },
  // {
  //   path: "/admin",
  //   name: "admin",
  //   component: () => import("@/pages/AdminPage/AdminView.vue"),
  //   meta: {
  //     title: "Admin Dashboard",
  //     /*  guard: 'auth' */
  //   },
  //   redirect: "/admin/dashboard",
  //   children: [
  //     {
  //       path: "dashboard",
  //       name: "admin-dashboard",
  //       component: () =>
  //         import("@/pages/AdminPage/components/AdminDashboard.vue"),
  //       meta: {
  //         title: "Admin Dashboard",
  //         /*  guard: 'auth' */
  //       },
  //     },
  //     {
  //       path: "billing",
  //       name: "admin-billing",
  //       component: () =>
  //         import("@/pages/AdminPage/components/AdminBilling.vue"),
  //       meta: {
  //         title: "Admin Billing",
  //         /*  guard: 'auth' */
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/signin",
  //   name: "login",
  //   component: () => import("@/pages/auth/LoginView.vue"),
  //   meta: {
  //     title: "Login",
  //     guard: "guest",
  //   },
  // },
  // // Registration
  // {
  //   path: "/signup",
  //   name: "register",
  //   component: () => import("@/pages/auth/RegisterView.vue"),
  //   meta: {
  //     title: "User Registration",
  //     guard: "guest",
  //   },
  // },
  // // Error Pages
  // {
  //   path: "/access-denied",
  //   name: "access-denied",
  //   component: () => import("@/pages/errors/AccessDenied.vue"),
  //   meta: {
  //     title: "Access Denied",
  //   },
  // },
  // {
  //   path: "/business-owner",
  //   name: "business-owner",
  //   component: () => import("@/pages/BusinessOwnerPage/BusinessOwnerView.vue"),
  //   meta: {
  //     title: "Business Owner Dashboard",
  //     /*  guard: 'auth' */
  //   },
  // },
  // {
  //   path: "/business-owner/pick-location",
  //   name: "gmap-location-picker",
  //   component: () =>
  //     import("@/pages/BusinessOwnerPage/GmapPickLocationView.vue"),
  //   meta: {
  //     title: "Pick Your Location",
  //     /*   guard: 'auth' */
  //   },
  // },
  // {
  //   path: "/:pathMatch(.*)*",
  //   redirect: "/page-not-found",
  // },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// // Navigation guards
// router.beforeEach((to, _from, next) => {
//   const authStore = useAuthStore();
//   const isAuthenticated = authStore.isAuthenticated;

//   // Check if the route requires authentication
//   if (to.meta.guard === "auth" && !isAuthenticated) {
//     // Redirect to login if not authenticated
//     next({ name: "login" });
//   }
//   // Check if the route is for guests only (like login/register)
//   else if (to.meta.guard === "guest" && isAuthenticated) {
//     // Redirect to home if already authenticated
//     next({ name: "home" });
//   } else {
//     next();
//   }
// });

export default router
