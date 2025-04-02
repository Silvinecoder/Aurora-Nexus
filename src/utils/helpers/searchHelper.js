import Fuse from "fuse.js";

export const searchHelper = {
  data() {
    return {
      searchQuery: "",
      fuse: null,
    };
  },
  methods: {
    /**
     * Initializes the Fuse.js search instance with the provided items.
     * @param {Array} items - The array of items to search through.
     **/
    initializeSearch(items) {
      if (!items || items.length === 0) {
        console.warn("No items available to initialize search");
        return;
      }

      this.fuse = new Fuse(items, {
        keys: ["name"],
        includeScore: true,
        threshold: 0.3,
      });

      this.displayedProducts = items;
    },

    getFilteredItems(query) {
      if (!this.fuse) return [];
      if (!query || !query.trim()) return this.displayedProducts;

      const results = this.fuse.search(query);
      return results.map((result) => result.item);
    },

    updateSearchQuery() {
      this.displayedProducts = this.getFilteredItems(this.searchQuery);
    },
  },
};
