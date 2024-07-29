<<<<<<< HEAD
import './scss/styles.scss'
import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import store from './store/index' // Import your Vuex store instance

// Import your components for routing
import Products from '../src/pages/Products.vue'
import ShoppingList from '../src/pages/ShoppingList.vue'
import Category from '../src/pages/Category.vue'
=======
import "./scss/styles.scss";
import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import store from "./utils/store/index";

// Import your components for routing
import Home from "../src/pages/Home.vue";
import Products from "../src/pages/supermarket/Products.vue";
import Search from "./pages/supermarket/SearchResults.vue";
import ShoppingList from "../src/pages/supermarket/ShoppingList.vue";
import Category from "../src/pages/supermarket/Category.vue";
>>>>>>> main

// Create a router instance
const router = createRouter({
  history: createWebHistory(),
  routes: [
<<<<<<< HEAD
    { path: '/', component: Products },
    { path: '/category/:categoryName', component: Category, name: 'Category'}, // Corrected path for Category component
    { path: '/shopping-list', component: ShoppingList },
    // Add more routes as needed
  ]
})

// Mount the app with the router and Vuex store
const app = createApp(App)
app.use(router)
app.use(store) // Use the Vuex store
app.mount('#app')
=======
    { path: "/home", component: Home },
    { path: "/supermarket/products", component: Products },
    { path: "/supermarket/:supermarketUUID/category/:categoryUUID", name: 'Category', component: Category },
    { path: "/supermarket/products/search", component: Search },
    { path: "/supermarket/shopping-list", component: ShoppingList },
    // Add more routes as needed
  ],
});

// Mount the app with the router and Vuex store
const app = createApp(App);
app.use(router);
app.use(store); // Use the Vuex store
app.mount("#app");
>>>>>>> main
