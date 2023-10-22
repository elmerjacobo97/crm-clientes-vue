import { createRouter, createWebHistory } from 'vue-router'
import ClientsView from '../views/ClientsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ClientsView,
      props: {
        title: 'Listado de clientes'
      }
    },
    {
      path: '/new-client',
      name: 'new-client',
      component: () => import('../views/NewClientView.vue'),
      props: {
        title: 'Nuevo cliente'
      }
    },
    {
      path: '/edit-client/:id', // routing dinámico
      name: 'edit-client',
      component: () => import('../views/EditClientView.vue'),
      props: {
        title: 'Editar cliente'
      }
    }
  ]
})

export default router
