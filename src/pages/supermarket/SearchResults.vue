<template>
  <!-- <div class="searchContainer">
    <Search @update="handleSearchUpdate" />
    <div v-if="searchQuery.length" class="detailedCardContainer">
      <DetailedCard
        v-for="product in displayedItems"
        :key="product.product_uuid"
        :product="product"
        :add-to-cart="addToCart"
        :remove-from-cart="removeFromCart"
      />
    </div>
  </div> -->
</template>

<!-- <script>
import Search from "../../components/Search.vue";
import DetailedCard from "../../components/DetailedCard.vue";

export default {
  components: { Search, DetailedCard },
  data() {
    return {
      searchQuery: '',
      displayedItems: [],
    };
  },
  methods: {
    handleSearchUpdate({ searchQuery, displayedItems }) {
      console.log('Search query and displayed items updated in SearchResults:', searchQuery, displayedItems);
      this.searchQuery = searchQuery;
      this.displayedItems = displayedItems;
    },
    addToCart(product) {
      this.$store.dispatch('addToCart', product.product_uuid);
    },
    removeFromCart(product) {
      this.$store.dispatch('removeFromCart', product.product_uuid);
    },
  },
};
</script> -->
