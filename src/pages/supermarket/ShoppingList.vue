<template>
  <div class="page_container">
    <SideBar />
    <div class="content">
      <div class="top_container">
        <div class="layout_style">
          <div class="navigation">
            <Search />
          </div>
        </div>
      </div>
      <button class="shopping_list__delete" @click="clearCart">Delete all</button>

      <div class="check_list" v-if="cartIsEmpty">Your shopping list is empty.</div>
      <div class="horizontal_card__shopping_list" v-else>
        <HorizontalCard v-for="product in products" :key="product.product_uuid" :product="product" :addToCart="addToCart" :removeFromCart="removeFromCart" />
      </div>
    </div>
  </div>
</template>

<script>
import { fetchData } from '@/api/api';
import { mapState, mapActions } from 'vuex';
import Buttons from "@/components/Buttons.vue";
import Search from "@/components/Search.vue";
import HorizontalCard from "@/components/HorizontalCard.vue";
import SideBar from "@/components/SideBar.vue";

export default {
  components: { Buttons, Search, HorizontalCard, SideBar },

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
        const data = await fetchData();
        return data;
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
