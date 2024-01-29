<!-- 1ºtentaiva
  <template>
  <div class="searchContainer">
    <input
      type="search"
      id="searchBar"
      class="search"
      placeholder="Search..."
    />
  </div>

  <div class="product" id="product"><h2>chocolate</h2></div>
</template> -->

<!-- 2ºtentativa
<template>
  <div id="container">
    <input
      type="text"
      v-model="searchQuery"
      @input="search"
      placeholder="Search..."
    />
    <ul>
      <li v-for="item in filteredItems" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      items: [
        { id: 1, name: "chocolate" },
        { id: 2, name: "laranjas" },
        // Add more items as needed
      ],
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter((item) => {
        return item.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    },
  },
  methods: {
    search() {
      // Handle search logic here if needed
    },
  },
};
</script>

<style scoped>
input {
  display: flex;
  position: absolute;
  width: 50%;
  padding: 8px;
  top: 10%;
  left: auto;
  right: 10%;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 5px;
}
</style>
 -->

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
        <li v-for="item in filteredItems" @key="item.id">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchQuery: "",
      items: [
        { id: 1, name: "chocolate" },
        { id: 2, name: "laranja" },
      ],
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter((item) => {
        return item.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    },
    created() {
      fetch("https://jsonplaceholder.typicode.com/posts/1")
        .then((response) => response.json())
        .then((item) => console.log(item));
    },
  },
};
</script>
