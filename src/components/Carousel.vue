<template>
  <div class="carousel__container">
    <button
      class="carousel"
      v-for="supermarket in supermarkets"
      :key="supermarket.supermarket_uuid"
      @click="$emit('supermarket-selected', supermarket)"
      :class="{ 'not-selected': selectedSupermarket && selectedSupermarket.supermarket_uuid !== supermarket.supermarket_uuid }"
    >
      <img :src="getSupermarketImageUrl(supermarket.supermarket_name)" :alt="supermarket.supermarket_name">
    </button>
  </div>
</template>

<script>
import { SupermarketsCategoriesProductsMixin } from '@/utils/mixins/supermarketsCategoriesProductsMixin';

export default {
  mixins: [SupermarketsCategoriesProductsMixin],
  props: {
    selectedSupermarket: Object, 
  },
  mounted() {
    this.fetchSupermarkets();
  },
};
</script>
