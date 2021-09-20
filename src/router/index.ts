import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/game/war',
    name: 'game war',
    component: () => import('@/views/games/War.vue'),
  },
  {
    path: '/game/cwar',
    name: 'game canvas war new',
    component: () => import('@/views/games/NewCanvasWar.vue'),
  },
  {
    path: '/game/canvaswar',
    name: 'game canvas war',
    component: () => import('@/views/games/CanvasWar.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
