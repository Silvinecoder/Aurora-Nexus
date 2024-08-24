<template>
  <div class="search_dropdown_container">
    <div class="search_container">
      <input class="search_input" type="search" placeholder="Search..." v-model="searchQuery" id="searchBar"
        @input="updateSearchQuery" ref="searchInput" />
    </div>
    <div class="dropdown_container" v-if="searchQuery && displayedItems.length > 0">
      <button @click="closeDropdown" class="close_button">Close</button>
      <div class="horizontal_card_container" v-for="item in displayedItems" :key="item.product_uuid">
        <HorizontalCard :product="item" :addToCart="addToCart" :removeFromCart="removeFromCart" />
      </div>
    </div>
  </div>
</template>

<script>
import { ProductsMixin } from '../utils/mixins/productsMixin';
import Fuse from 'fuse.js';
import HorizontalCard from './HorizontalCard.vue';

export default {
  components: { HorizontalCard },
  mixins: [ProductsMixin],
  props: {
    addToCart: Function,
    removeFromCart: Function,
  },
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
    closeDropdown() {
      this.searchQuery = '';
    },
    showMore() {
      this.limit = this.filteredItems.length;
    },
  },
};
</script>
