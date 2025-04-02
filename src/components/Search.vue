<template>
  <div class="search_dropdown_container">
    <div class="search_container">
      <input class="search_input" type="search" placeholder="Search..." v-model="searchQuery" id="searchBar"
        @input="updateSearchQuery" ref="searchInput" />
    </div>
    <div class="dropdown_container" v-if="searchQuery && displayedProducts.length > 0">
      <Button :closeButton="closeDropdown" />
      <div class="horizontal_card_container" v-for="product in displayedProducts" :key="product.product_uuid">
        <HorizontalCard :product="product" :isAddedToCart="isProductInCart(product.product_uuid)" :addToCart="addToCart"
          :removeFromCart="removeFromCart" :showSupermarketLogo="false" />
      </div>
    </div>
  </div>
</template>

<script>
import { ProductsMixin } from "@/api/endpoints/productsMixin";
import { searchHelper } from "@/utils/helpers/searchHelper";
import HorizontalCard from "@/components/HorizontalCard.vue";
import Button from "@/components/Buttons.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { HorizontalCard, Button },
  mixins: [searchHelper, ProductsMixin],

  data() {
    return {
      isDropdownOpen: false,
      displayedProducts: [],
    };
  },

  async mounted() {
    try {
      await this.getProducts();
      this.initializeSearch(this.products);
    } catch (error) {
      console.error("Error loading products:", error);
    }

    this.$nextTick(() => this.$refs.searchInput.focus());
    document.addEventListener("mousedown", this.handleClickOutside);
  },

  beforeDestroy() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  },

  computed: {
    ...mapGetters(["isProductInCart"]),
  },

  methods: {
    ...mapActions(["addToCart", "removeFromCart"]),

    closeDropdown() {
      this.searchQuery = "";
      this.isDropdownOpen = false;
    },

    handleClickOutside(event) {
      const dropdown = this.$el.querySelector(".dropdown_container");
      const searchInput = this.$refs.searchInput;

      if (
        dropdown &&
        !dropdown.contains(event.target) &&
        searchInput &&
        !searchInput.contains(event.target)
      ) {
        this.closeDropdown();
      }
    },
  },
};
</script>
