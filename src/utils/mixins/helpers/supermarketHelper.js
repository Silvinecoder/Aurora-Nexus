// supermarketHelper.js
import { fetchData } from "@/api/api";
import { mapActions } from "vuex";

export const supermarketHelper = {
  methods: {
    ...mapActions(["updateSelectedSupermarket"]),

    async loadCategoriesAndProducts(selectedSupermarket) {
      if (!selectedSupermarket) {
        console.warn("No supermarket selected");
        return [];
      }

      try {
        const categoriesWithProducts = await this.fetchCategoriesAndProducts(
          selectedSupermarket.supermarket_uuid
        );
        const filteredCategories = categoriesWithProducts.filter(
          (category) => category.products && category.products.length > 0
        );
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

    async fetchCategoriesAndProducts(supermarket_uuid) {
      try {
        const categories = await fetchData(
          `/supermarkets/${supermarket_uuid}/categories`
        );
        const categoriesWithProducts = await Promise.all(
          categories.map(async (category) => {
            try {
              const products = await fetchData(
                `/supermarkets/${supermarket_uuid}/categories/${category.category_uuid}/products`
              );
              return { ...category, products };
            } catch (error) {
              console.error(
                `Error fetching products for category ${category.category_name}:`,
                error
              );
              return { ...category, products: [] };
            }
          })
        );

        return categoriesWithProducts;
      } catch (error) {
        console.error("Error fetching categories:", error.message);
        throw error;
      }
    },

    selectSupermarket(supermarket) {
      this.updateSelectedSupermarket(supermarket);
    },

    getSupermarketImageUrl(supermarket_name) {
      const formattedName = supermarket_name.toLowerCase().replace(/\s+/g, "_");
      const imageMap = {
        continente: "/icons/supermarkets/stores/continente.png",
        pingo_doce: "/icons/supermarkets/stores/pingo_doce.png",
        auchan: "/icons/supermarkets/stores/auchan.png",
        mercadona: "/icons/supermarkets/stores/mercadona.png",
      };
      return imageMap[formattedName];
    },

    groupProductsBySupermarket() {
      this.groupedProducts = {};
      this.supermarketsWithCategories.forEach((supermarket) => {
        supermarket.categories.forEach((category) => {
          category.products.forEach((product) => {
            const supermarketUUID = supermarket.supermarket_uuid;
            const uuidArray = Array.isArray(supermarketUUID)
              ? supermarketUUID
              : [supermarketUUID];
            uuidArray.forEach((uuid) => {
              if (!this.groupedProducts[uuid]) {
                this.groupedProducts[uuid] = [];
              }
              if (this.isProductInCart(product.product_uuid)) {
                const productWithSupermarket = {
                  ...product,
                };
                this.groupedProducts[uuid].push(productWithSupermarket);
              }
            });
          });
        });
      });
    },
  },
};
