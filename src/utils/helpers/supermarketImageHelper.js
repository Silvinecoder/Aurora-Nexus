export const supermarketImageHelper = {
  methods: {
    getSupermarketImageUrl(supermarket_name) {
      if (!supermarket_name) {
        return console.error("No supermarket name provided");
      }
      const formattedName = supermarket_name.toLowerCase().replace(/\s+/g, "_");
      const imageMap = {
        continente: "/icons/supermarkets/stores/continente.png",
        pingo_doce: "/icons/supermarkets/stores/pingo_doce.png",
        auchan: "/icons/supermarkets/stores/auchan.png",
        mercadona: "/icons/supermarkets/stores/mercadona.png",
      };
      const imageUrl = imageMap[formattedName];
      return imageUrl;
    },
  },
};
