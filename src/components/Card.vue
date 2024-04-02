<template>
  <div class="image_card" :key="product.product_uuid">
    <div class="image_card__image_button_container">
      <img :src="product.image" :alt="product.name" />
      <div class="detailed_card" :key="product.product_uuid">
        <Buttons :product="product" :addToCart="addToCart" :removeFromCart="removeFromCart" />
      </div>
    </div>
    <div class="image_card__title">
      <p>{{ product.name }}</p>
    </div>
  </div>
</template>

<script>
import Buttons from './Buttons.vue';

export default {
  components: { Buttons },
  props: ['product', 'addToCart', 'removeFromCart'],
};
</script>
