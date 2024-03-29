<template>
  <div class="detailed_card" :key="product.product_uuid">
    <div class="detailed_card__image_container">
      <img class="detailed_card__image" :src="product.image" :alt="product.name" />
    </div>
    <div class="detailed_card__details_container">
      <p class="detailed_card__title">{{ product.name }}</p>

      <!-- Add code for displaying reviews and shopping markets here -->
    </div>
    <button v-if="!product.isAddedToCart" class="standard_icon" @click="addToCart(product)">
      <svg>
        <use xlink:href="../assets/icons/standard/add.svg#add__icon"></use>
      </svg>
    </button>
    
    <button  v-else class="standard_icon" @click="removeFromCart(product)">
      <svg>
        <use xlink:href="../assets/icons/standard/minus.svg#minus__icon"></use>
      </svg>
    </button>
  </div>
  <hr class="detailed_card_hr" />
</template>

<script>
import SupermarketLogo from './SupermarketLogo.vue';

export default {
  components: { SupermarketLogo },
  props: ['product', 'addToCart', 'removeFromCart'],
};
</script>