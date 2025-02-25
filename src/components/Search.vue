<template>
  <div class="search_dropdown_container">
    <div class="search_container">
      <input class="search_input" type="search" placeholder="Search..." v-model="searchQuery" id="searchBar"
        @input="updateSearchQuery" ref="searchInput" />
    </div>
    <div class="dropdown_container" v-if="searchQuery && displayedProducts.length > 0">
      <Button :closeButton="closeDropdown" />
      <div class="horizontal_card_container" v-for="product in displayedProducts" :key="product.product_uuid">
        <HorizontalCard 
          :product="product" 
          :isAddedToCart="isProductInCart(product.product_uuid)" 
          :addToCart="addToCart" 
          :removeFromCart="removeFromCart" 
          :showSupermarketLogo="shouldShowSupermarketLogo(product)" />
      </div>
    </div>
  </div>
</template>

<script>
import { ProductsMixin } from '@/utils/mixins/endpoints/productsMixin';
import { SupermarketsCategoriesProductsMixin } from '@/utils/mixins/endpoints/supermarketsCategoriesProductsMixin';
import Fuse from 'fuse.js';
import HorizontalCard from '@/components/HorizontalCard.vue';
import Button from '@/components/Buttons.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: { HorizontalCard, Button },
  mixins: [ProductsMixin, SupermarketsCategoriesProductsMixin],
  data() {
    return {
      searchQuery: '',
      fuse: null,
      isDropdownOpen: false,
      supermarketsWithCategories: [],
    };
  },
  async mounted() {
    // Fetch products and supermarkets at the same time
    try {
      await this.fetchProductsAndSupermarkets();
    } catch (error) {
      console.error('Error loading products or supermarkets:', error);
    }

    this.initializeFuse();
    this.$nextTick(() => this.$refs.searchInput.focus());
    document.addEventListener('mousedown', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  },
  computed: {
    ...mapGetters(['isProductInCart']),
    filteredItems() {
      if (!this.fuse || !this.searchQuery.trim()) return [];
      const results = this.fuse.search(this.searchQuery);
      return results.map(result => result.item);
    },
    displayedProducts() {
      return this.filteredItems;
    },
  },
  methods: {
    ...mapActions(['addToCart', 'removeFromCart']),
    
    // Fetch both products and supermarket data
    async fetchProductsAndSupermarkets() {
      try {
        // Fetch products from the products API
        await this.getProducts();

        // Fetch supermarkets categories/products data from supermarket API
        if (this.getSelectedSupermarket) {
          this.supermarketsWithCategories = await this.loadCategoriesAndProducts(this.getSelectedSupermarket);
          this.groupProductsBySupermarket();
        }
      } catch (error) {
        console.error('Error fetching products or supermarkets data:', error);
      }
    },

    initializeFuse() {
      if (!this.products || this.products.length === 0) {
        console.warn('No products available to initialize Fuse');
        return;
      }
      this.fuse = new Fuse(this.products, {
        keys: ['name'],
        includeScore: true,
        threshold: 0.3,
      });
    },

    updateSearchQuery() {
      this.$emit('update', {
        searchQuery: this.searchQuery,
        displayedProducts: this.displayedProducts,
      });
    },

    closeDropdown() {
      this.searchQuery = '';
      this.isDropdownOpen = false;
    },

    handleSearchUpdate({ searchQuery, displayedProducts }) {
      this.searchQuery = searchQuery;
      this.displayedProducts = displayedProducts;
    },

    // New method to determine if supermarket logo should be shown for a product
    shouldShowSupermarketLogo(product) {
      // Check if the product has supermarket data
      return product && product.supermarket_name && product.supermarket_name.length > 0;
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
