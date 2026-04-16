import { createRouter, createWebHistory } from "vue-router";
import Layout from "../components/layout/indexComponent.vue";

const routes = [
  {
    path: "/login",
    name: "home",
    component: () => import("../views/loginPage.vue"),
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("../views/DashboardPage.vue"),
      },
      {
        path: "new-game",
        name: "new-game",
        component: () => import("../views/NewGamePage.vue"),
      },
      {
        path: "save-load",
        name: "save-load",
        component: () => import("../views/SaveLoadPage.vue"),
      },
      {
        path: "character",
        name: "character",
        component: () => import("../views/CharacterPage.vue"),
      },
      {
        path: "map",
        name: "map",
        component: () => import("../views/MapPage.vue"),
      },
      {
        path: "achievements",
        name: "achievements",
        component: () => import("../views/AchievementsPage.vue"),
      },
      {
        path: "settings",
        name: "settings",
        component: () => import("../views/SettingsPage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
