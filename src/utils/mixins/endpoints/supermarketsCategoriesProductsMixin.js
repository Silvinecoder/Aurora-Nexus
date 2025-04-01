import { fetchData } from "@/api/api";
import { mapGetters } from "vuex";
import { supermarketHelper } from "../helpers/supermarketHelper";

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
      isLoadingData: false,
    };
  },
  computed: {
    ...mapGetters(["getSelectedSupermarket"]),
    categoriesWithProducts() {
      if (
        !this.supermarketsWithCategories ||
        this.supermarketsWithCategories.length === 0 ||
        !this.selectedSupermarket
      ) {
        return [];
      }
      const supermarketData = this.supermarketsWithCategories.find(
        (s) => s.supermarket_uuid === this.selectedSupermarket.supermarket_uuid
      );
      return supermarketData ? supermarketData.categories : [];
    },
  },
  watch: {
    getSelectedSupermarket: {
      async handler(newSupermarket) {
        if (newSupermarket) {
          this.isLoadingData = true;
          try {
            this.supermarketsWithCategories =
              await this.loadCategoriesAndProducts(newSupermarket);
          } catch (error) {
            console.error("Error loading categories and products:", error);
          } finally {
            this.isLoadingData = false;
          }
        } else {
          this.supermarketsWithCategories = [];
        }
      },
      immediate: true,
    },
  },
  methods: {
    async fetchSupermarkets() {
      this.isLoadingData = true;
      try {
        this.supermarkets = await fetchData("/supermarkets");
      } catch (error) {
        console.error("Failed to fetch supermarkets:", error);
      } finally {
        this.isLoadingData = false;
      }
    },
  },
};
