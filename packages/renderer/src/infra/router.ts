import { createWebHistory, createRouter } from "vue-router";
import HomeView from "../views/HomeView.vue";

export const routes = [
  // {
  //   path: "/",
  //   name: "/:script/:bid?/:oid?",
  //   // name: "/fap",
  //   //  This is the only page that is NOT lazy-loaded,
  //   //  and that's why 'component: Wizard' statement looks different from others, below.
  //   component: Wizard,
  // },
  {
    path: "/",
    name: "Home",
    component: HomeView
  },
  // {
  //   path: "/manifest",
  //   name: "ManifestView",
  //   component: () => import("../views/ManifestView.vue")
  // },
  // {
  //   path: "/quark-book",
  //   name: "QuarkBookView",
  //   component: () => import("../views/QuarkBookView.vue")
  // },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("../views/NotFoundView.vue")
  }
];

const router = createRouter({
  //
  history: createWebHistory(/*import.meta.env.BASE_URL*/),
  routes
});

export default router;
