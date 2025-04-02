import { fetchData } from "@/api/config/db_config";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export const SupermarketsCategoriesProductsMixin = {
  data() {
    return {
      supermarkets: [],
      supermarketsWithCategories: [],
      isLoadingData: false,
    };
  },
  computed: {
    ...mapGetters(["getSelectedSupermarket"]),
    // This computed property returns the categories with products for the selected supermarket.
    categoriesForSelectedSupermarket() {
      const supermarketData = this.supermarketsWithCategories.find(
        (s) => s.supermarket_uuid === this.selectedSupermarket.supermarket_uuid
      );
      return supermarketData ? supermarketData.categories : [];
    },
  },
  watch: {
    getSelectedSupermarket: {
      async handler(newSupermarket) {
        this.isLoadingData = !!newSupermarket;
        if (!newSupermarket) {
          this.supermarketsWithCategories = [];
          return;
        }
        try {
          this.supermarketsWithCategories =
            await this.loadCategoriesAndProducts(newSupermarket);
        } catch (error) {
          console.error("Error loading categories and products:", error);
        } finally {
          this.isLoadingData = false;
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
    ...mapActions(["updateSelectedSupermarket"]),

    async loadCategoriesAndProducts(selectedSupermarket) {
      try {
        const categoriesWithProducts = await fetchData(
          `/supermarkets/${selectedSupermarket.supermarket_uuid}/categories/products`
        );
        const filteredCategories = categoriesWithProducts
          .filter(
            (category) => category.products && category.products.length > 0
          )
          .map((category) => ({
            ...category,
            hasMoreThanTenProducts: category.products.length > 10,
          }));

        return [
          {
            supermarket_uuid: selectedSupermarket.supermarket_uuid,
            categories: filteredCategories,
          },
        ];
      } catch (error) {
        console.error("Failed to fetch categories or products:", error.message);
        return [];
      }
    },

    selectSupermarket(supermarket) {
      this.updateSelectedSupermarket(supermarket);
    },
  },
};
