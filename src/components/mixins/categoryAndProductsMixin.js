// categoryAndProductsMixin.js
import { fetchData } from '../../api/api.js';

export default {
  data() {
    return {
      categories: {},
    };
  },
  methods: {
    async fetchCategoriesAndProducts() {
      try {
        const data = await fetchData();
        this.categories = data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.fetchCategoriesAndProducts();
  },
};