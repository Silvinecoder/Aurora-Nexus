<template>
<<<<<<< HEAD
  <button class="carousel">
    <img :src="imageUrl" :alt="imageAlt">
  </button>
</template>


<script>
export default {
  props: ['imageUrl', 'imageAlt']
}
</script>
=======
  <div class="carousel__container">
    <button
      class="carousel"
      v-for="supermarket in supermarkets"
      :key="supermarket.supermarket_uuid"
      @click="selectSupermarket(supermarket)"
      :class="{ 'not-selected': selectedSupermarket && selectedSupermarket.supermarket_uuid !== supermarket.supermarket_uuid }"
    >
      <img :src="getSupermarketImageUrl(supermarket.supermarket_name)" :alt="supermarket.supermarket_name">
    </button>
  </div>
</template>

<script>
import { SupermarketsMixin } from '../utils/mixins/supermarketsMixin.js';

export default {
  mixins: [SupermarketsMixin],
  mounted() {
    this.fetchSupermarkets();
  },
};
</script>
>>>>>>> main
