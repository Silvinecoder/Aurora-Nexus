<template>
  <div class="navigation">
    <Buttons :GoBack="true" />
    <Search />
    <Buttons :goToShoppingList="true" />
  </div>

  <div class="products__body">
    <div class="carousel__container">
      <Carousel :imageUrl="'/icons/supermarkets/lidl_3x.png'" :imageAlt="'Lidl Logo'" />
      <Carousel :imageUrl="'/icons/supermarkets/aldi_3x.png'" :imageAlt="'Lidl Logo'" />
      <Carousel :imageUrl="'/icons/supermarkets/continente_3x.png'" :imageAlt="'Lidl Logo'" />
      <Carousel :imageUrl="'/icons/supermarkets/minipreco_3x.png'" :imageAlt="'Lidl Logo'" />
      <Carousel :imageUrl="'/icons/supermarkets/pingoDoce_3x.png'" :imageAlt="'Lidl Logo'" />
    </div>

    <div class="detailed_cards__category_container">
      <CategoryTitle :categoryName="categoryName" :goToCategory="goToCategory" :showButton="false" />
      <div class="detailed_cards_container">
        <DetailedCard v-for="product in categoryProducts" :key="product.product_uuid" :product="product" :addToCart="addToCart" :removeFromCart="removeFromCart" />
      </div>
    </div>
  </div>
</template>

<script>
import { fetchData } from '../api/api'; 


import Search from "../components/Search.vue";
import Buttons from "../components/Buttons.vue";
import Carousel from "../components/Carousel.vue";
import CategoryTitle from '../components/CategoryTitle.vue'
import categoryAndProductsMixin from '../components/mixins/categoryAndProductsMixin.js'
import DetailedCard from "../components/DetailedCard.vue";

export default {
  mixins: [categoryAndProductsMixin],
  components: { Buttons, Search, Carousel, DetailedCard, CategoryTitle },
  data() {
    return {
      categoryName: this.$route.params.categoryName,
      categoryProducts: [],
    };
  },
  created() {
    this.fetchCategoriesAndProducts();
    this.categoryProducts = this.categories[this.categoryName].products;
  },
  methods: {
    async fetchCategoriesAndProducts() {
      try {
        const data = await fetchData();
        this.categories = data;
        this.categoryProducts = this.categories[this.categoryName].products;
      } catch (error) {
        console.error(error);
      }
    },
    addToCart(product) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      console.log('cart', cart);
      console.log('Product added to cart:', product);
      this.isAddedToCart = true;
    },
    removeFromCart(product) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart = cart.filter((item) => item.product_uuid !== product.product_uuid);
      localStorage.setItem('cart', JSON.stringify(cart));
      console.log('cart', cart);
      console.log('Product removed from cart:', product);
      this.isAddedToCart = false;
    },
    goToCategory() {
      this.$router.push('/category');
      console.log('Category button clicked');
    }
  },
  created() {
    this.fetchCategoriesAndProducts();
  }
};
</script>