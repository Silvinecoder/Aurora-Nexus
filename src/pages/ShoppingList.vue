<template>
  <div class="navigation">
    <Buttons :GoBack="true" />
    <Search />
  </div>

  <div v-if="products.length === 0">Your shopping list is empty.</div>
    <div v-else>
      <!-- Reuse the Card component to display products -->
      <Card :products="products" />
  </div>

</template>

<script>
import Buttons from "../components/Buttons.vue";
import Search from "../components/Search.vue";
import Card from "../components/Card.vue";

export default {
  components: { Buttons, Search, Card },

  data() {
    return {
      products: []
    };
  },
  mounted() {
    // Retrieve products from local storage
    this.products = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('products', this.products);
  }
};

</script>