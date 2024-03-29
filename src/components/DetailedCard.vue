<template>
  <div class="detailed_card" :key="product.product_uuid">
    <div class="detailed_card__image_container">
      <img class="detailed_card__image" :src="product.image" :alt="product.name" />
    </div>
    <div class="detailed_card__details_container">
      <h2 class="detailed_card__title">{{ product.name }}</h2>
      <SupermarketLogo :supermarket="product.supermarket" />
      <!-- Add code for displaying reviews and shopping markets here -->
    </div>
    <div class="detailed_card__button_container">
      <button class="standard_icon" @click="addToCart">
        <svg>
          <use xlink:href="../assets/icons/standard/add.svg#add__icon"></use>
        </svg>
      </button>
    </div>
  </div>
  <hr class="detailed_card_hr" />
</template>

<script>
import SupermarketLogo from './SupermarketLogo.vue';

export default {
  components: { SupermarketLogo },
  props: ['product', 'addToCart'],
};
</script>