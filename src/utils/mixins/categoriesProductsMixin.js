import { fetchData } from '../../api/api';
import { mapGetters } from 'vuex';

export const CategoriesProductsMixin = {
  data() {
    return {
      supermarketsWithCategories: [],
    };
  },
  computed: {
    ...mapGetters(['getSelectedSupermarket']),
  },
  watch: {
    getSelectedSupermarket: {
      async handler(newSupermarket) {
        if (newSupermarket) {
          await this.loadCategoriesAndProducts();
        }
      },
      immediate: true,
    },
  },
  methods: {
    async loadCategoriesAndProducts() {
      const selectedSupermarket = this.getSelectedSupermarket;

      if (!selectedSupermarket) {
        return 'No supermarket selected';
      }

      try {
        const categoriesWithProducts = await this.fetchCategoriesAndProducts(selectedSupermarket.supermarket_uuid);
        const filteredCategories = categoriesWithProducts.filter(category => category.products.length > 0);

        this.supermarketsWithCategories = [{
          ...selectedSupermarket,
          categories: filteredCategories,
        }];
      } catch (error) {
        console.error('Failed to fetch categories or products:', error.message);
      }
    },

    async fetchCategoriesAndProducts(supermarket_uuid) {
      try {
        const categories = await fetchData(`/supermarkets/${supermarket_uuid}/categories`);
        return await Promise.all(categories.map(async (category) => {
          const products = await fetchData(`/supermarkets/${supermarket_uuid}/categories/${category.category_uuid}/products`);
          return { ...category, products: products || [] };
        }));
      } catch (error) {
        console.error('Error fetching categories or products:', error.message);
        throw error;
      }
    },
  },
};
