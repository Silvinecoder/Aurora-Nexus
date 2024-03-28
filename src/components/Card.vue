<template>
  <div class="card" :key="product.product_uuid">
    <div class="card__image_button_container">
      <img class="card__image" :src="product.image" :alt="product.name" />
    </div>
    <div class="card__title">
      <p>{{ product.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product'],
};
</script>
