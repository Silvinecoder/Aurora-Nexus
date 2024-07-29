import { fetchData } from '../../api/api';

export const SupermarketsMixin = {
  data() {
    return {
      supermarkets: [],
      selectedSupermarket: null,
    };
  },
  methods: {
    async fetchSupermarkets() {
      try {
        this.supermarkets = await fetchData('/supermarkets');
      } catch (error) {
        console.error('Failed to fetch supermarkets:', error);
      }
    },
    selectSupermarket(supermarket) {
      this.selectedSupermarket = supermarket;
      this.$emit('supermarket-selected', supermarket);
    },
    getSupermarketImageUrl(supermarket_name) {
      const imageMap = {
        'Continente': '/icons/supermarkets/stores/continente.png',
        'Pingo Doce': '/icons/supermarkets/stores/pingo_doce.png',
        'Auchan': '/icons/supermarkets/stores/auchan.png',
        'Mercadona': '/icons/supermarkets/stores/mercadona.png',
      };
      return imageMap[supermarket_name]
    }
  },
};
