<template>
  <div class="navigation">
    <Search />
    <Buttons :goToShoppingList="true" />
  </div>

  <div class="products__body">
    <div class="carousel__container">
      <Carousel v-for="supermarket in supermarkets" :key="supermarket.id" :imageUrl="supermarket.imageUrl"
        :imageAlt="supermarket.alt" />
    </div>

    <div class="image_cards__category_container" v-for="(category, categoryName) in categories" :key="categoryName">
      <CategoryTitle :categoryName="categoryName" :goToCategory="goToCategory" :showButton="true" />
      <div class="image_cards_container">
        <Card v-for="product in category.products" :key="product.product_uuid" :product="product"
          :addToCart="addToCart" :removeFromCart="removeFromCart"/>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "../components/Search.vue";
import Buttons from "../components/Buttons.vue";
import Carousel from "../components/Carousel.vue";
import CategoryTitle from '../components/CategoryTitle.vue'
import categoryAndProductsMixin from '../components/mixins/categoryAndProductsMixin.js'
import Card from "../components/Card.vue";

export default {
  mixins: [categoryAndProductsMixin],
  components: { Buttons, Search, Carousel, Card, CategoryTitle },
  data() {
    return {
      categoryName: '', // Initialize categoryName
      supermarkets: [
        { id: 1, imageUrl: '/icons/supermarkets/lidl_3x.png', alt: 'Lidl Logo' },
        { id: 2, imageUrl: '/icons/supermarkets/aldi_3x.png', alt: 'Aldi Logo' },
        { id: 3, imageUrl: '/icons/supermarkets/continente_3x.png', alt: 'Continente Logo' },
        { id: 4, imageUrl: '/icons/supermarkets/minipreco_3x.png', alt: 'Minipreço Logo' },
        { id: 5, imageUrl: '/icons/supermarkets/pingoDoce_3x.png', alt: 'Pingo Doce Logo' }
      ],
    };
  },
  created() {
    this.fetchCategoriesAndProducts();
  },
  methods: {
    addToCart(product) {
      this.$store.dispatch('addToCart', product.product_uuid);
      console.log('Add to cart button clicked');
    },
    removeFromCart(product) {
      this.$store.dispatch('removeFromCart', product.product_uuid);
      console.log('Remove from cart button clicked');
    },
    goToCategory(categoryName) {
      this.$router.push({ name: 'Category', params: { categoryName: categoryName } });
      console.log('Category button clicked');
    }
  }
};
</script>