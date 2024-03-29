<template>
  <div class="image_card" :key="product.product_uuid">
    <div class="image_card__image_button_container">
      <img :src="product.image" :alt="product.name" />
    </div>
    <div class="image_card__title">
      <p>{{ product.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product'],
};
</script>
