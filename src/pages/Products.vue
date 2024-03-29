<template>
  <div class="navigation">
    <Search />
    <Buttons :goToShoppingList="true" />
  </div>

  <div class="products__body">
    <div class="carousel__container">
      <Carousel :imageUrl="'/icons/supermarkets/lidl_3x.png'" :imageAlt="'Lidl Logo'" />
      <Carousel :imageUrl="'/icons/supermarkets/aldi_3x.png'" :imageAlt="'Aldi Logo'" />
      <Carousel :imageUrl="'/icons/supermarkets/continente_3x.png'" :imageAlt="'Continente Logo'" />
      <Carousel :imageUrl="'/icons/supermarkets/minipreco_3x.png'" :imageAlt="'Minipreco Logo'" />
      <Carousel :imageUrl="'/icons/supermarkets/pingoDoce_3x.png'" :imageAlt="'Pingo Doce Logo'" />
    </div>

    <div class="image_cards__category_container" v-for="(category, categoryName) in categories" :key="categoryName">
      <CategoryTitle :categoryName="categoryName" :goToCategory="goToCategory" :showButton="true" />
      <div class="image_cards_container">
        <Card v-for="product in category.products" :key="product.product_uuid" :product="product"
          :addToCart="addToCart" />
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
  created() {
    this.fetchCategoriesAndProducts();
  },
  methods: {
    addToCart(product) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      console.log('cart', cart);
      console.log('Product added to cart:', product);
    },
    goToCategory(categoryName) {
      this.$router.push({ name: 'Category', params: { categoryName: categoryName } });
      console.log('Category button clicked');
    }
  }
};
</script>