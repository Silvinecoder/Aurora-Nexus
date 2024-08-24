<template>
  <div class="search_container">
    <Search @update="handleSearchUpdate" />
    <div v-if="searchQuery.length" class="detailedCardContainer">
      <li
        v-for="product in displayedItems"
        :key="product.product_uuid"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
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
  },
};
</script>
