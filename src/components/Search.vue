<template>
  <div class="search_dropdown_container">
    <div class="search_container">
      <input class="search_input" type="search" placeholder="Search..." v-model="searchQuery" id="searchBar"
        @input="updateSearchQuery" ref="searchInput" />
    </div>
    <div class="dropdown_container" v-if="searchQuery && displayedItems.length > 0">
      <Button :closeButton="closeDropdown" />
      <div class="horizontal_card_container" v-for="item in displayedItems" :key="item.product_uuid">
        <HorizontalCard :product="item" :addToCart="addToCart" :removeFromCart="removeFromCart" :isAddedToCart="isProductInCart(item.product_uuid)" />
      </div>
    </div>
  </div>
</template>
<script>
import { ProductsMixin } from '@/utils/mixins/productsMixin';
import Fuse from 'fuse.js';
import HorizontalCard from '@/components/HorizontalCard.vue';
import Button from '@/components/Buttons.vue';

export default {
  components: { HorizontalCard, Button },
  mixins: [ProductsMixin],
  data() {
    return {
      searchQuery: '',
      fuse: null,
      allProducts: [],
      isDropdownOpen: false,
    };
  },
  async mounted() {
    await this.getProducts();
    this.$nextTick(() => this.$refs.searchInput.focus());
    this.initializeFuse();
    document.addEventListener('mousedown', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('mousedown', this.handleClickOutside);
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
    handleSearchUpdate({ searchQuery, displayedItems }) {
      this.searchQuery = searchQuery;
      this.displayedItems = displayedItems;
    },
    closeDropdown() {
      this.searchQuery = '';
      this.isDropdownOpen = false;
    },
    showMore() {
      this.limit = this.filteredItems.length;
    },
    isProductInCart(productUUID) {
      return this.$store.state.cart.some(item => item.product_uuid === productUUID);
    },
    addToCart(product) {
      this.$store.dispatch('addToCart', product);
    },
    removeFromCart(product) {
      this.$store.dispatch('removeFromCart', product);
    },
    handleClickOutside(event) {
      const dropdown = this.$el.querySelector('.dropdown_container');
      const searchInput = this.$refs.searchInput;
      
      if (dropdown && !dropdown.contains(event.target) && searchInput && !searchInput.contains(event.target)) {
        this.closeDropdown();
      }
    }
  },
};
</script>
