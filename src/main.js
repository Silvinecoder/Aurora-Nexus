import './scss/styles.scss'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

// Import your components for routing
import Products from '../src/pages/Products.vue'
import ShoppingList from '../src/pages/ShoppingList.vue'
import Category from '../src/pages/Category.vue'

// Create a router instance
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Products },
    { path: '/category:categoryName', component: Category, name: 'Category'},
    { path: '/shopping-list', component: ShoppingList },
    // Add more routes as needed
  ]
})

// Mount the app with the router
const app = createApp(App)
app.use(router)
app.mount('#app')


