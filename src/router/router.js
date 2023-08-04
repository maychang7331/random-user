import { createRouter, createWebHashHistory } from "vue-router";
import All from "../components/All.vue";

const routes = [
  {
    path: "/all",
    name: "all",
    component: All,
  },
  {
    path: "/favorite",
    name: "favorite",
    component: () => import("../components/Favorite.vue"),
  },
  {
    path: "/:domain(.*)",
    name: "NotFound",
    component: () => import("../components/404.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
