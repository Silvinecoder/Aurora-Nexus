<template>
  <div class="product_body">
    <div class="top_container">
      <div class="layout_style">
        <div class="navigation">
          <button class="search_button searchInput" @click="searchPage">
            Search....
          </button>
          <Buttons :goToShoppingList="true" />
        </div>
        <Carousel @supermarket-selected="handleSupermarketSelected" />
      </div>
    </div>

    <div class="layout_style" v-if="selectedSupermarket">
      <div class="products__body">
        <div class="image_cards__category_container" v-for="category in selectedCategories" :key="category.category_uuid">
          <CategoryTitle v-if="hasProducts(category)" :categoryName="category.category_name"
            :goToCategory="() => goToCategory(category.category_uuid)" :showButton="true" />
          <div class="image_cards_container" v-if="hasProducts(category)">
            <Card v-for="product in category.products" :key="product.product_uuid" :product="product"
              :addToCart="addToCart" :removeFromCart="removeFromCart"
              :isAddedToCart="isAddedToCart(product.product_uuid)" />
          </div>
        </div>
      </div>
    </div>

    <div v-else class="no_supermarket_selected">
      <p>Please select a supermarket</p>
    </div>
  </div>
</template>

<script>
import Buttons from "../../components/Buttons.vue";
import Carousel from "../../components/Carousel.vue";
import CategoryTitle from '../../components/CategoryTitle.vue';
import Card from "../../components/Card.vue";
import { CategoriesMixin } from '../../utils/mixins/categoriesProductsMixin.js';
import { SupermarketsMixin } from '../../utils/mixins/supermarketsMixin.js';

export default {
  components: { Buttons, Carousel, Card, CategoryTitle },
  mixins: [CategoriesMixin, SupermarketsMixin],
  data() {
    return {
      isSideBarOpen: false,
      selectedSupermarket: null,
    };
  },
  computed: {
    selectedCategories() {
      const supermarket = this.supermarketsWithCategories.find(supermarket => supermarket.supermarket_uuid === this.selectedSupermarket?.supermarket_uuid);
      return supermarket ? supermarket.categories : [];
    }
  },
  watch: {
    selectedSupermarket(newVal) {
      if (newVal) {
        this.fetchCategoriesAndProductsUnderSupermarket();
      }
    }
  },
  async created() {
    await this.fetchSupermarkets();
  },
  methods: {
    toggleSideBar() {
      this.isSideBarOpen = !this.isSideBarOpen;
    },
    searchPage() {
      this.$router.push('/supermarket/products/search');
    },
    addToCart(product) {
      this.$store.dispatch('addToCart', product.product_uuid);
    },
    removeFromCart(product) {
      this.$store.dispatch('removeFromCart', product.product_uuid);
    },
    goToCategory(categoryUUID) {
      this.$emit('category-selected', this.categoryName);
      this.$router.push(`/supermarket/${this.selectedSupermarket.supermarket_uuid}/category/${categoryUUID}`);
    },
    isAddedToCart(productUUID) {
      return this.$store.state.cart.includes(productUUID);
    },
    handleSupermarketSelected(supermarket) {
      this.selectedSupermarket = supermarket;
    },
    hasProducts(category) {
      return category.products.length > 0;
    }
  }
};
</script>
