import { fetchData } from '@/api/api';

export const ProductsMixin = {
  data() {
    return {
      allProducts: [], 
    };
  },
  methods: {
    async getProducts() {
      try {
        const products = await fetchData('/products');
        this.allProducts = products;
      } catch (error) {
        console.error('Failed to fetch all products:', error.message);
      }
    },

    getSupermarketImageUrlUuid(supermarket_uuid) {
      const imageMap = {
        'c3dc5c28-afc4-4680-9fd6-b39132f82612': '/icons/supermarkets/stores/continente.png',
        'fadf51d4-30c4-42f8-82e5-6ce8bb6c7fb3': '/icons/supermarkets/stores/pingo_doce.png',
        '058e6b43-4b66-4b7f-b18a-b861830a1703': '/icons/supermarkets/stores/auchan.png',
        // Add more mappings as needed
      };
      return imageMap[supermarket_uuid] || '/icons/supermarkets/stores/default.png';
    }
  },
};
