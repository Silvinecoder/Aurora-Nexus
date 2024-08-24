<template>
  <div class="products_page_container">
    <SideBar />
    <div class="product_content">
      <div class="top_container">
        <div class="navigation">
            <Search @update="handleSearchUpdate" :addToCart="addToCart" :removeFromCart="removeFromCart" />
          <Buttons :goToShoppingList="true" />
        </div>
      </div>
      <Carousel :selectedSupermarket="selectedSupermarket" @supermarket-selected="handleSupermarketSelected" />

      <div v-if="selectedSupermarket && categoriesWithProducts.length" class="layout_style">
        <div class="cards__category_container" v-for="category in categoriesWithProducts"
          :key="category.category_uuid">
          <h4 class="cards__category_title">{{ category.category_name }}</h4>

          <div class="cards_container" v-if="hasProducts(category)">
            <Card v-for="product in category.products" :key="product.product_uuid" :product="product"
              :addToCart="addToCart" :removeFromCart="removeFromCart"
              :isAddedToCart="isAddedToCart(product.product_uuid)" />
          </div>
        </div>
      </div>

      <div v-else class="no_supermarket_selected">
        <p>Please select a supermarket</p>
      </div>
    </div>
  </div>
</template>

<script>
import Buttons from "../../components/Buttons.vue";
import Carousel from "../../components/Carousel.vue";
import Card from "../../components/Card.vue";
import { SupermarketsCategoriesProductsMixin } from "../../utils/mixins/supermarketsCategoriesProductsMixin";
import SideBar from "../../components/SideBar.vue";
import { mapGetters, mapActions } from "vuex";
import Search from "../../components/Search.vue";

export default {
  components: { Buttons, Carousel, Card, SideBar, Search },
  mixins: [SupermarketsCategoriesProductsMixin],
  data() {
    return {
      isSideBarOpen: false,
      searchQuery: '',
      displayedItems: [],
    };
  },
  computed: {
    ...mapGetters(['getSelectedSupermarket']),
    selectedSupermarket() {
      return this.getSelectedSupermarket;
    },
    categoriesWithProducts() {
      // This will recompute whenever supermarketsWithCategories changes
      const supermarketData = this.supermarketsWithCategories[0];
      return supermarketData ? supermarketData.categories : [];
    }
  },
  methods: {
    ...mapActions(['updateSelectedSupermarket']),
    
    handleSearchUpdate({ searchQuery, displayedItems }) {
      this.searchQuery = searchQuery;
      this.displayedItems = displayedItems;
    },
    
    addToCart(product) {
      this.$store.dispatch('addToCart', product);
    },
    removeFromCart(product) {
      this.$store.dispatch('removeFromCart', product);
    },
    goToCategory(categoryUUID) {
      this.$router.push(`/supermarket/${this.selectedSupermarket.supermarket_uuid}/category/${categoryUUID}`);
    },
    isAddedToCart(productUUID) {
      return this.$store.state.cart.includes(productUUID);
    },
    async handleSupermarketSelected(supermarket) {
      await this.updateSelectedSupermarket(supermarket);  // Ensure async action completes before proceeding
      await this.loadCategoriesAndProducts();  // Load the categories and products for the selected supermarket
    },
    hasProducts(category) {
      return category.products && category.products.length > 0;
    }
  }
};
</script>