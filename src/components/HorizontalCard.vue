<template>
  <div class="horizontal_card" :key="product.product_uuid">
    <img class="product_image" :src="product.image" :alt="product.name" />
    <div class="card_body" :key="product.product_uuid">
      <h4 class="card_title">{{ product.name }}</h4>

      <div class="price_button_container">
        <p>{{ product.price }}</p>
        <Buttons 
          :product="product" 
          :addToCart="addToCart" 
          :removeFromCart="removeFromCart" 
          :isAddedToCart="isAddedToCart"
        />
      </div>

      <SupermarketLogo :supermarket_uuids="product.supermarket_uuids" />
    </div>
  </div>
</template>

<script>
import Buttons from "./Buttons.vue";
import SupermarketLogo from "./SupermarketLogo.vue";

export default {
  components: { Buttons, SupermarketLogo },
  props: {
    product: {
      type: Object,
      required: true,
    },
    addToCart: {
      type: Function,
      required: true,
    },
    removeFromCart: {
      type: Function,
      required: true,
    },
    isAddedToCart: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
