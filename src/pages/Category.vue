<template>
  <div class="navigation">
    <Buttons :GoBack="true" />
    <Search />
    <Buttons :goToShoppingList="true" />
  </div>

  <div class="products__body">
    <div class="carousel__container">
      <Carousel v-for="supermarket in supermarkets" :key="supermarket.id" :imageUrl="supermarket.imageUrl"
        :imageAlt="supermarket.alt" />
    </div>

    <div class="detailed_cards__category_container">
      <CategoryTitle :categoryName="categoryName" :goToCategory="goToCategory" :showButton="false" />
      <div class="detailed_cards_container">
        <DetailedCard v-for="product in categoryProducts" :key="product.product_uuid" :product="product"
          :addToCart="addToCart" :removeFromCart="removeFromCart" />
      </div>
    </div>
  </div>
</template>

<script>
import Search from "../components/Search.vue";
import Buttons from "../components/Buttons.vue";
import Carousel from "../components/Carousel.vue";
import CategoryTitle from '../components/CategoryTitle.vue';
import categoryAndProductsMixin from '../components/mixins/categoryAndProductsMixin.js'
import DetailedCard from "../components/DetailedCard.vue";

export default {
  mixins: [categoryAndProductsMixin],
  components: { Buttons, Search, Carousel, DetailedCard, CategoryTitle },
  data() {
    return {
      categoryName: '',
      supermarkets: [
        { id: 1, imageUrl: '/icons/supermarkets/lidl_3x.png', alt: 'Lidl Logo' },
        { id: 2, imageUrl: '/icons/supermarkets/aldi_3x.png', alt: 'Aldi Logo' },
        { id: 3, imageUrl: '/icons/supermarkets/continente_3x.png', alt: 'Continente Logo' },
        { id: 4, imageUrl: '/icons/supermarkets/minipreco_3x.png', alt: 'Minipreço Logo' },
        { id: 5, imageUrl: '/icons/supermarkets/pingoDoce_3x.png', alt: 'Pingo Doce Logo' }
      ],
    };
  },
  methods: {
    addToCart(product) {
      this.$store.dispatch('addToCart', product);
    },
    removeFromCart(product) {
      this.$store.dispatch('removeFromCart', product);
    },
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.categoryName = to.params.categoryName;
      vm.fetchCategoriesAndProducts();
    });
  },
};
</script>
