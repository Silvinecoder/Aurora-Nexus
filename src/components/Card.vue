<template>
  <div class="card" :key="product.product_uuid">
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
      <!-- Star rating component -->
      <StarRating v-model="rating" />
    </div>
  </div>
</template>

<script>
import Button from "@/components/Buttons.vue";
import StarRating from "@/components/StarRating.vue";

export default {
  components: { Button, StarRating },
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
  },
  data() {
    return {
      rating: 0
    };
  },
  watch: {
    rating(newRating) {
      // Example of handling the rating change, e.g., saving it to the backend
      // You could call a method to handle this if needed
      console.log(`New rating for product ${this.product.product_uuid}: ${newRating}`);
    }
  }
};
</script>
