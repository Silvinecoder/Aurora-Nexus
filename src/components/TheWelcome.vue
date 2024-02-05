<template>
  <div class="container">
    <div class="searchContainer">
      <input
        type="search"
        placeholder="Search..."
        v-model="searchQuery"
        id="searchBar"
      />
    </div>
    <div class="productContainer">
      <ul>
        <li v-for="item in displayedItems" :key="item.id">
          {{ item.title }}
        </li>
      </ul>
      <button
        @click="showMore"
        v-show="displayedItems.length < filteredItems.length"
      >
        Show More
      </button>
    </div>
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
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });
    },
    displayedItems() {
      return this.filteredItems.slice(0, this.limit);
    },
  },
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
