<template>
  <div class="search_dropdown_container">
    <div class="search_container">
      <input class="search_input" type="search" placeholder="Search..." v-model="searchQuery" id="searchBar"
        @input="updateSearchQuery" ref="searchInput" />
    </div>
    <div class="dropdown_container" v-if="searchQuery && displayedProducts.length > 0">
      <Button :closeButton="closeDropdown" />
      <div class="horizontal_card_container" v-for="product in displayedProducts" :key="product.product_uuid">
        <HorizontalCard :product="product" :isAddedToCart="isProductInCart(product.product_uuid)" :addToCart="addToCart" :removeFromCart="removeFromCart" />
      </div>
    </div>
  </div>
</template>
<script>
import { ProductsMixin } from '@/utils/mixins/productsMixin';
import Fuse from 'fuse.js';
import HorizontalCard from '@/components/HorizontalCard.vue';
import Button from '@/components/Buttons.vue';
import { mapActions, mapGetters } from 'vuex';

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
    ...mapGetters(['isProductInCart']),
    filteredItems() {
      if (!this.searchQuery.trim()) return [];
      const results = this.fuse.search(this.searchQuery);
      return results.map(result => result.item);
    },
    displayedProducts() {
      return this.filteredItems;
    },
  },
  methods: {
    ...mapActions(['addToCart', 'removeFromCart']),
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
        displayedProducts: this.displayedProducts,
      });
    },
    handleSearchUpdate({ searchQuery, displayedProducts }) {
      this.searchQuery = searchQuery;
      this.displayedProducts = displayedProducts;
    },
    closeDropdown() {
      this.searchQuery = '';
      this.isDropdownOpen = false;
    },
    showMore() {
      this.limit = this.filteredItems.length;
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
