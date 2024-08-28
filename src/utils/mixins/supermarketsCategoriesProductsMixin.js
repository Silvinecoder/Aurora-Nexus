import { fetchData } from '../../api/api';
import { mapGetters, mapActions } from 'vuex';

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
          await this.loadCategoriesAndProducts();
        } else {
          this.supermarketsWithCategories = [];
        }
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions(['updateSelectedSupermarket']),

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
          supermarket_uuid: selectedSupermarket.supermarket_uuid,  // Ensure supermarket_uuid is included
          categories: filteredCategories
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
          
          // Add supermarket_uuid to each product
          const productsWithSupermarketUUID = products.map(product => ({
            ...product,
            supermarket_uuids: [supermarket_uuid]  // Add supermarket_uuid here
          }));

          return { ...category, products: productsWithSupermarketUUID || [] };
        }));
      } catch (error) {
        console.error('Error fetching categories or products:', error.message);
        throw error;
      }
    },

    selectSupermarket(supermarket) {
      this.updateSelectedSupermarket(supermarket);
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
  },
};
