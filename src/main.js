import "./scss/styles.scss";
import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import store from "./utils/store/index";

// Import your components for routing
import Home from "../src/pages/Home.vue";
import SupermarketsPage from "./pages/supermarket/Supermarkets.vue";
import ShoppingList from "../src/pages/supermarket/ShoppingList.vue";

// Create a router instance
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/home", component: Home },
    { path: "/supermarkets", component: SupermarketsPage },
    { path: "/supermarket/shopping-list", component: ShoppingList },
  ],
});

// Mount the app with the router and Vuex store
const app = createApp(App);
app.use(router);
app.use(store); // Use the Vuex store
app.mount("#app");
