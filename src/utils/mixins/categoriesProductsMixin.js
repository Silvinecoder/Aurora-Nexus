import { fetchData } from '../../api/api';

export const CategoriesMixin = {
  data() {
    return {
      supermarketsWithCategories: [],
    };
  },
  methods: {
    async fetchCategoriesAndProductsUnderSupermarket() {
      if (!this.supermarkets || this.supermarkets.length === 0) {
        console.warn('No supermarkets available to fetch categories.');
        return;
      }

      try {
        const supermarketPromises = this.supermarkets.map(async (supermarket) => {
          const categories = await fetchData(`/supermarkets/${supermarket.supermarket_uuid}/categories`);

          const categoryPromises = categories.map(async (category) => {
            const products = await fetchData(`/supermarkets/${supermarket.supermarket_uuid}/categories/${category.category_uuid}/products`);
            return { ...category, products: products || [] };
          });

          const categoriesWithProducts = await Promise.all(categoryPromises);
          return { ...supermarket, categories: categoriesWithProducts };
        });

        this.supermarketsWithCategories = await Promise.all(supermarketPromises);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    }
  }
};
