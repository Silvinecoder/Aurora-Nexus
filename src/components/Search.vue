<template>
<<<<<<< HEAD
  <div class="searchContainer">
    <input
      class="searchInput"
      type="search"
      placeholder="Search..."
      v-model="searchQuery"
      id="searchBar"
    />
    <ul class="searchContainerList">
      <li v-for="item in displayedItems" :key="item.id">
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchQuery: "",
      items: [],
      limit: 4,
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter((item) => {
        return item.title
=======
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
>>>>>>> main
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });
    },
    displayedItems() {
      return this.filteredItems.slice(0, this.limit);
    },
  },
<<<<<<< HEAD
  methods: {
    showMore() {
      this.limit = this.filteredItems.length;
    },
  },
  created() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
        this.items = json;
        console.log(json);
      });
  },
};
</script>
=======
};
</script> -->
>>>>>>> main
