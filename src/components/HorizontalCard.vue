<template>
  <div class="horizontal_card" :key="product.product_uuid">
    <img class="product_image" :src="product.image" :alt="product.name" />
    <div class="card_body" :key="product.product_uuid">
      <h4 class="card_title">{{ product.name }}</h4>

      <div class="price_button_container">
        <p>{{ product.price }}</p>
        <Button 
          :product="product" 
          :isAddedToCart="isAddedToCart"
          :addToCart="addToCart" 
          :removeFromCart="removeFromCart" 
        />
      </div>

      <SupermarketLogo v-if="showSupermarketLogo" :supermarket_uuids="product.supermarket_uuids" />
    </div>
  </div>
</template>

<script>
import Button from "@/components/Buttons.vue";
import SupermarketLogo from "@/components/SupermarketLogo.vue";

export default {
  components: { Button, SupermarketLogo },
  props: {
    product: {
      type: Object,
      required: true,
    },
    isAddedToCart: {
      type: Boolean,
      required: false,
    },
    addToCart: {
      type: Function,
      required: false,
    },
    removeFromCart: {
      type: Function,
      required: false,
    },
    showSupermarketLogo: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
};
</script>
