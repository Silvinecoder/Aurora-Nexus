export const supermarketImageHelper = {
  methods: {
    getSupermarketImageUrl(supermarket_name) {
      if (!supermarket_name) {
        console.error("No supermarket name provided");
        return "";
      }
      const formattedName = supermarket_name.toLowerCase().replace(/\s+/g, "_");
      console.log("Formatted name:", formattedName); // Debugging
      const imageMap = {
        continente: "/icons/supermarkets/stores/continente.png",
        pingo_doce: "/icons/supermarkets/stores/pingo_doce.png",
        auchan: "/icons/supermarkets/stores/auchan.png",
        mercadona: "/icons/supermarkets/stores/mercadona.png",
      };
      const imageUrl = imageMap[formattedName];
      console.log("Image URL:", imageUrl); // Debugging
      return imageUrl; // Return empty string if no match found
    },
  },
};
