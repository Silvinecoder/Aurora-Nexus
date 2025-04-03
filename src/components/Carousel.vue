<template>
  <div class="carousel__container">
    <button class="carousel" v-for="supermarket in supermarkets" :key="supermarket.supermarket_uuid"
      @click="$emit('supermarket-selected', supermarket)"
      :class="{ 'not-selected': selectedSupermarket && selectedSupermarket.supermarket_uuid !== supermarket.supermarket_uuid }">
      <img :src="getSupermarketImageUrl(supermarket.supermarket_name)" :alt="supermarket.supermarket_name"
        class="supermarket-logo" />
    </button>
  </div>
</template>

<script>
import { SupermarketsCategoriesProductsMixin } from '../api/endpoints/supermarkets';
import { supermarketImageHelper } from '../utils/helpers/SupermarketImageHelper';

export default {
  mixins: [SupermarketsCategoriesProductsMixin, supermarketImageHelper],
  props: {
    selectedSupermarket: Object,
  },
  mounted() {
    this.fetchSupermarkets();
  },
};
</script>
