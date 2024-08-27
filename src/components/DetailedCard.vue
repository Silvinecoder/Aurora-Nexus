<template>
  <div class="detailed_card" :key="product.product_uuid">
    <div class="detailed_card__image_container">
      <img class="detailed_card__image" :src="product.image" :alt="product.name" />
    </div>
    <div class="detailed_card__details_container">
      <p class="detailed_card__title">{{ product.name }}</p>

    </div>
    <div class="detailed_card" :key="product.product_uuid">
      <Buttons :product="product" :addToCart="addToCart" :removeFromCart="removeFromCart" />
    </div>
  </div>
  <hr class="detailed_card_hr" />
</template>

<script>
import SupermarketLogo from '@/components/SupermarketLogo.vue';
import Buttons from '@/components/Buttons.vue';

export default {
  components: { SupermarketLogo, Buttons },
  props: ['product', 'addToCart', 'removeFromCart'],
};
</script>