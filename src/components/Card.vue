<template>
  <div class="card" :key="product.product_uuid">
    <img class="product_image" :src="product.image" :alt="product.name" />
    <div class="card_body" :key="product.product_uuid">
      <h4 class="card_title">{{ product.name }}</h4>

      <div class="price_button_container">
        <p>{{ product.price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import SupermarketLogo from "@/components/SupermarketLogo.vue";

export default {
  components: { SupermarketLogo },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>
