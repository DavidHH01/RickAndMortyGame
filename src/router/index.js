import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import InformacionView from '../views/InformacionView.vue'
import JuegoView from '../views/JuegoView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: AboutView
  },
  {
    path: '/detalles',
    name: 'detalles',
    component: InformacionView
  },
  {
    path: '/juego',
    name: 'juego',
    component: JuegoView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
