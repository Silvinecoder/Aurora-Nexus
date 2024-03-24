<template>
  <div>
    <!-- Iterate over categories -->
    <div v-for="category in categories" :key="category.category">
      <h2>{{ category.category }}</h2>
      <!-- Iterate over products in the category -->
      <div v-for="product in category.products" :key="product.product_uuid">
        <div class="card">
          <img :src="product.image" alt="" />
          <div class="card__title">
            <p>{{ product.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchData } from '../api/api.js';

export default {
  data() {
    return {
      categories: []
    };
  },
  methods: {
    async fetchDataFromAPI() {
      try {
        this.categories = await fetchData();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  },
  mounted() {
    this.fetchDataFromAPI();
  }
};
</script>
