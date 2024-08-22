import { fetchData } from '../../api/api';
import { mapGetters } from 'vuex';

export const SupermarketsCategoriesProductsMixin = {
  data() {
    return {
      supermarkets: [],
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
          await this.fetchCategoriesAndProducts(newSupermarket.supermarket_uuid);
        } else {
          this.supermarketsWithCategories = [];
        }
      },
      immediate: true,
    },
  },
  methods: {
    async fetchSupermarkets() {
      try {
        this.supermarkets = await fetchData('/supermarkets');
      } catch (error) {
        console.error('Failed to fetch supermarkets:', error);
      }
    },
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
    getSupermarketImageUrl(supermarket_name) {
      const imageMap = {
        'Continente': '/icons/supermarkets/stores/continente.png',
        'Pingo Doce': '/icons/supermarkets/stores/pingo_doce.png',
        'Auchan': '/icons/supermarkets/stores/auchan.png',
        'Mercadona': '/icons/supermarkets/stores/mercadona.png',
      };
      return imageMap[supermarket_name] || '/icons/supermarkets/stores/default.png';
    },
    getSupermarketImageUrlUuid(supermarket_uuid) {
      const imageMap = {
        'c3dc5c28-afc4-4680-9fd6-b39132f82612': '/icons/supermarkets/stores/continente.png',
        'fadf51d4-30c4-42f8-82e5-6ce8bb6c7fb3': '/icons/supermarkets/stores/pingo_doce.png',
        '058e6b43-4b66-4b7f-b18a-b861830a1703': '/icons/supermarkets/stores/auchan.png',
      };
      return imageMap[supermarket_uuid] || '/icons/supermarkets/stores/default.png';
    },
  },
};
