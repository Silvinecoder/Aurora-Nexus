// categoryAndProductsMixin.js
import { fetchData } from '../../api/api.js';

export default {
  data() {
    return {
      categories: {},
      categoryProducts: [], // Add this line
    };
  },
  methods: {
    async fetchCategoriesAndProducts() {
      try {
        const data = await fetchData();
        this.categories = data;
        if (this.categoryName && data[this.categoryName]) {
          this.categoryProducts = data[this.categoryName].products;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.fetchCategoriesAndProducts();
  },
};