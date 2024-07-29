<template>
  <div class="category_body">
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

    <div class="detailed_cards__category_container" v-if="category">
      <CategoryTitle :categoryName="category.category_name" :showButton="false" />
      <div class="detailed_cards_container">
        <DetailedCard v-for="product in category.products" :key="product.product_uuid" :product="product"
          :addToCart="addToCart" :removeFromCart="removeFromCart" />
      </div>
    </div>
    <div v-else class="no_category_selected">
      <p>Please select a category</p>
    </div>
  </div>
</template>

<script>
import Buttons from "../../components/Buttons.vue";
import Carousel from "../../components/Carousel.vue";
import CategoryTitle from '../../components/CategoryTitle.vue';
import DetailedCard from "../../components/DetailedCard.vue";
import { CategoriesMixin } from '../../utils/mixins/categoriesProductsMixin.js';
import { SupermarketsMixin } from '../../utils/mixins/supermarketsMixin.js';

export default {
  mixins: [CategoriesMixin, SupermarketsMixin],
  components: { Buttons, Carousel, DetailedCard, CategoryTitle },
  data() {
    return {
      category: null,
      selectedSupermarket: null,
    };
  },
  async beforeRouteEnter(to, from, next) {
    next(async vm => {
      try {
        await vm.fetchSupermarkets();
        await vm.fetchCategoriesAndProductsUnderSupermarket();

        const { supermarketUUID, categoryUUID } = to.params;
        vm.selectedSupermarket = vm.supermarketsWithCategories.find(
          supermarket => supermarket.supermarket_uuid === supermarketUUID
        );

        if (vm.selectedSupermarket) {
          vm.category = vm.selectedSupermarket.categories.find(
            category => category.category_uuid === categoryUUID
          );
        } else {
          console.warn('Selected supermarket or categories are not available.');
        }
      } catch (error) {
        console.error('Error in beforeRouteEnter:', error);
      }
    });
  },
  methods: {
    searchPage() {
      this.$router.push('/supermarket/products/search');
    },
    addToCart(product) {
      this.$store.dispatch('addToCart', product.product_uuid);
    },
    removeFromCart(product) {
      this.$store.dispatch('removeFromCart', product.product_uuid);
    },
    async handleSupermarketSelected(supermarket) {
      this.category = null;
      this.selectedSupermarket = supermarket.supermarket_uuid;
      await this.fetchCategoriesAndProductsUnderSupermarket(this.selectedSupermarket);

      const selectedSupermarketWithCategories = this.supermarketsWithCategories.find(
        sm => sm.supermarket_uuid === this.selectedSupermarket
      );

      if (selectedSupermarketWithCategories && selectedSupermarketWithCategories.categories) {
        this.category = selectedSupermarketWithCategories.category_uuid;

        this.$router.push(`/supermarket/${this.selectedSupermarket}/category/${this.category.category_uuid}`);
      } else {
        console.error("Selected supermarket does not have categories or categories are not loaded.");
      }
    }
  }
  };
</script>
