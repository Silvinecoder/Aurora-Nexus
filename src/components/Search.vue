<template>
  <div>
    <div class="searchContainer">
      <input
        class="searchInput"
        type="search"
        placeholder="Search..."
        v-model="searchQuery"
        id="searchBar"
        @input="updateSearchQuery"
        ref="searchInput"
      />
    </div>
    <div v-if="searchQuery && displayedItems.length > 0">
      <!-- Render the displayed items -->
      <div v-for="item in displayedItems" :key="item.product_uuid">
        {{ item.name }}
      </div>
    </div>
    <div v-else-if="searchQuery">
      <p>No products found.</p>
    </div>
  </div>
</template>

<script>
import { ProductsMixin } from "../utils/mixins/productsMixin";
import Fuse from 'fuse.js';

export default {
  mixins: [ProductsMixin],
  data() {
    return {
      searchQuery: "",
      fuse: null,
      allProducts: [],
    };
  },
  async mounted() {
    await this.getProducts();
    this.$nextTick(() => this.$refs.searchInput.focus());
    this.initializeFuse();
  },
  computed: {
    filteredItems() {
      if (!this.searchQuery.trim()) return [];
      const results = this.fuse.search(this.searchQuery);
      return results.map(result => result.item);
    },
    displayedItems() {
      return this.filteredItems;
    },
  },
  methods: {
    initializeFuse() {
      this.fuse = new Fuse(this.allProducts, {
        keys: ['name'],
        includeScore: true,
        threshold: 0.3,
      });
    },
    updateSearchQuery() {
      this.$emit("update", {
        searchQuery: this.searchQuery,
        displayedItems: this.displayedItems,
      });
    },
    showMore() {
      this.limit = this.filteredItems.length;
    },
  },
};
</script>
