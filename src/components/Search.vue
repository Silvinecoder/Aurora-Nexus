<template>
  <!-- <div>
    <div class="top_container">
      <div class="layout_style">
        <div class="navigation">
          <Buttons :GoBack="true" />
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
        </div>
      </div>
    </div>
  </div> -->
</template>
<!-- 
<script>
import Buttons from "./Buttons.vue";
import { ProductsMixin } from "../utils/mixins/productsMixin.js";

export default {
  mixins: [ProductsMixin],
  components: {
    Buttons,
  },
  mounted() {
    this.fetchProducts().then(() => {
      this.updateSearchQuery();
    });
    this.$nextTick(function () {
      this.$refs.searchInput.focus();
    });
  },
  data() {
    return {
      searchQuery: '',
      limit: 6,
    };
  },
  methods: {
    updateSearchQuery() {
      this.$emit('update', {
        searchQuery: this.searchQuery,
        displayedItems: this.displayedItems,
      });
    },
    showMore() {
      this.limit = this.filteredItems.length;
    },
  },
  computed: {
    filteredItems() {
      return this.products.filter((item) => {
        return item.name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });
    },
    displayedItems() {
      return this.filteredItems.slice(0, this.limit);
    },
  },
};
</script> -->
