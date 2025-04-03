import { fetchData } from "../config/db_config";

export const ProductsMixin = {
  data() {
    return {
      products: [],
    };
  },
  methods: {
    // This method is being utilised in the search.vue component where it fetches all the products that have supermarket as reference
    async getProducts() {
      try {
        const response = await fetchData("/products");
        this.products = response.map((product) => {
          return {
            ...product,
            supermarkets: product.supermarkets,
          };
        });
      } catch (error) {
        console.error("Failed to fetch all products:", error);
      }
    },
  },
};
