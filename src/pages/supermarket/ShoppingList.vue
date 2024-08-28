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
      <div class="shopping_list_header">
        <Button :goBackButton="true" />
        <h1>Shopping List</h1>
        <Button :clearCart="clearCart" />
      </div>

      <div class="check_list" v-if="cartIsEmpty">Your shopping list is empty.</div>
      <div class="horizontal_card__shopping_list" v-else>
        <section v-for="product in products" :key="product.product_uuid">
          <SupermarketLogo :supermarket_uuids="product.supermarket_uuids || product.supermarket_uuid" />
          <HorizontalCard :product="product" :isAddedToCart="isProductInCart(product.product_uuid)"
            :addToCart="addToCart" :removeFromCart="removeFromCart" :showSupermarketLogo="false" />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import Button from "@/components/Buttons.vue";
import Search from "@/components/Search.vue";
import HorizontalCard from "@/components/HorizontalCard.vue";
import SideBar from "@/components/SideBar.vue";
import SupermarketLogo from "@/components/SupermarketLogo.vue";

export default {
  components: { Button, Search, HorizontalCard, SideBar, SupermarketLogo },

  computed: {
    ...mapGetters(['isProductInCart']),
    ...mapState({
      products: state => state.cart
    }),
    cartIsEmpty() {
      return this.products.length === 0;
    }
  },
  methods: {
    ...mapActions(['clearCart', 'addToCart', 'removeFromCart']),
  },
};
</script>