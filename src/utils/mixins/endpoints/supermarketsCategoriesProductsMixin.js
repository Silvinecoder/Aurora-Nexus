import { fetchData } from '@/api/api';
import { mapGetters } from 'vuex';
import { supermarketHelper } from '../helpers/supermarketHelper';

export const SupermarketsCategoriesProductsMixin = {
  mixins: [supermarketHelper],
  data() {
    return {
      supermarkets: [],
      supermarket: null,
      categories: [],
      category: null,
      productsBySupermarket: [],
      productsByCategory: [],
      product: null,
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
          this.supermarketsWithCategories = await this.loadCategoriesAndProducts(newSupermarket);
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
    }
  }
};
