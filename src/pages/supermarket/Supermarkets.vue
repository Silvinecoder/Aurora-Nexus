<template>
  <div class="page_container">
    <SideBar />
    <div class="content">
      <div class="top_container">
        <div class="navigation">
          <Search />
          <Button :goToShoppingList="true" />
        </div>
      </div>

      <div class="layout_style">
        <Carousel :selectedSupermarket="selectedSupermarket" @supermarket-selected="handleSupermarketSelected" />

        <div v-if="selectedSupermarket && categoriesWithProducts.length">
          <div class="cards__category_container" v-for="category in categoriesWithProducts"
            :key="category.category_uuid">

            <CategoryTitle v-if="hasProducts(category)" :categoryName="category.category_name"
              :showButton="showMoreButton(category)" :isExpanded="showAllProducts(category.category_uuid)"
              @toggleExpand="toggleShowAll" :hasMoreThanTenProducts="category.products.length > 10" />

            <div class="cards_container" v-if="hasProducts(category)">
              <Card v-for="product in visibleProducts(category)" :key="product.product_uuid" :product="product"
                :isAddedToCart="isProductInCart(product.product_uuid)" :addToCart="addToCart"
                :removeFromCart="removeFromCart" />
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
import Button from "@/components/Buttons.vue";
import Carousel from "@/components/Carousel.vue";
import Card from "@/components/Card.vue";
import CategoryTitle from '../../components/CategoryTitle.vue';
import Search from "@/components/Search.vue";
import SideBar from "@/components/SideBar.vue";
import { SupermarketsCategoriesProductsMixin } from "@/utils/mixins/supermarketsCategoriesProductsMixin";
import { mapGetters, mapActions } from "vuex";

export default {
  components: { Button, Carousel, Card, CategoryTitle, Search, SideBar },
  mixins: [SupermarketsCategoriesProductsMixin],
  data() {
    return {
      supermarketsWithCategories: [],
      expandedCategories: {},
    };
  },
  computed: {
    ...mapGetters(['getSelectedSupermarket', 'isProductInCart']),
    selectedSupermarket() {
      return this.getSelectedSupermarket;
    },
    categoriesWithProducts() {
      const supermarketData = this.supermarketsWithCategories.find(s => s.supermarket_uuid === this.selectedSupermarket.supermarket_uuid);
      return supermarketData ? supermarketData.categories : [];
    },
  },
  methods: {
    ...mapActions(['updateSelectedSupermarket', 'addToCart', 'removeFromCart']),
    async handleSupermarketSelected(supermarket) {
      await this.updateSelectedSupermarket(supermarket);
      await this.loadCategoriesAndProducts();
    },
    hasProducts(category) {
      return category.products && category.products.length > 0;
    },
    visibleProducts(category) {
      return this.expandedCategories[category.category_uuid]
        ? category.products
        : category.products.slice(0, 10);
    },
    showMoreButton(category) {
      return category.products.length > 10;
    },
    showAllProducts(categoryUUID) {
      return !!this.expandedCategories[categoryUUID];
    },
    toggleShowAll(categoryName) {
      const category = this.categoriesWithProducts.find(cat => cat.category_name === categoryName);
      if (category) {
        this.expandedCategories[category.category_uuid] = !this.expandedCategories[category.category_uuid];
      }
    }
  }
};
</script>
