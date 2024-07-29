<template>
  <div>
    <div class="top_container">
      <div class="layout_style">
        <div class="navigation">
          <Search />
        </div>
        <div class="title_and_delete">
          <h3>Shopping List</h3>
          <button>Delete all</button>
        </div>
      </div>
    </div>

    <div class="check_list" v-if="cartIsEmpty">Your shopping list is empty.</div>
    <div v-else>
      <!-- Loop over each product and pass it to the Card component -->
      <Card v-for="product in products" :key="product.product_uuid" :product="product" />
      <button @click="clearCart">Clear Cart</button>
    </div>
  </div>
</template>

<script>
import { fetchData } from '../../api/api';
import { mapState, mapActions } from 'vuex';
import Buttons from "../../components/Buttons.vue";
import Search from "../../components/Search.vue";
import Card from "../../components/Card.vue";

export default {
  components: { Buttons, Search, Card },

  computed: {
    ...mapState({
      products: state => state.cart
    }),
    cartIsEmpty() {
      return this.products.length === 0;
    }
  },
  methods: {
    ...mapActions(['clearCart']),
    async fetchCartData() {
      try {
        const data = await fetchData(); // Call the fetchData function
        // Process the fetched data...
      } catch (error) {
        console.error(error);
      }
    }
  },
  created() {
    this.fetchCartData();
  }
};
</script>
