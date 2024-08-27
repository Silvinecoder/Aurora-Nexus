<template>
  <div class="page_container">
    <SideBar />
    <div class="content">
      <div class="top_container">
        <div class="navigation">
          <Search />
          <Buttons :goToShoppingList="true" />
        </div>
      </div>

      <div class="layout_style">
        <Carousel :selectedSupermarket="selectedSupermarket" @supermarket-selected="handleSupermarketSelected" />

        <div v-if="selectedSupermarket && categoriesWithProducts.length">
          <div class="cards__category_container" v-for="category in categoriesWithProducts"
            :key="category.category_uuid">

            <div class="cards__category_title__button__container">
              <h4 class="cards__category_title">{{ category.category_name }}</h4>
              <router-link :to="getCategoryLink(category.category_uuid)">See all</router-link>
            </div>

            <div class="cards_container" v-if="hasProducts(category)">
              <Card v-for="product in category.products" :key="product.product_uuid" :product="product" />
            </div>
          </div>
        </div>


        <div v-else class="no_supermarket_selected">
          <p>Please select a supermarket</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Buttons from "@/components/Buttons.vue";
import Carousel from "@/components/Carousel.vue";
import Card from "@/components/Card.vue";
import { SupermarketsCategoriesProductsMixin } from "@/utils/mixins/supermarketsCategoriesProductsMixin";
import SideBar from "@/components/SideBar.vue";
import { mapGetters, mapActions } from "vuex";
import Search from "@/components/Search.vue";

export default {
  components: { Buttons, Carousel, Card, SideBar, Search },
  mixins: [SupermarketsCategoriesProductsMixin],
  data() {
    return {
      isSideBarOpen: false,
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
    },
    getCategoryLink() {
      return (categoryUUID) => {
        return `/supermarket/${this.selectedSupermarket.supermarket_uuid}/category/${categoryUUID}`;
      };
    },
  },
  methods: {
    ...mapActions(['updateSelectedSupermarket']),
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