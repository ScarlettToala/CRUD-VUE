import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/views/Home.vue")
    },
    {
      path: "/productos",
      name: "Productos",
      component: () => import("@/views/Productos.vue")
    },
    {
      path: "/productosNode",
      name: "ProductosNode",
      component: () => import("@/views/ProductosCRUDNODE.vue")
    }
  ],
})

export default router
