import { fetchData } from "@/api/api";

export const ProductsMixin = {
  data() {
    return {
      products: [],
      product: null,
    };
  },
  methods: {
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
    async getProduct(product_uuid) {
      if (!product_uuid) {
        console.error("Product UUID is required to fetch product.");
        return;
      }
      try {
        this.product = await fetchData(`/products/${product_uuid}`);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    },
  },
};
