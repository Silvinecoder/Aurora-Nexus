import { createStore } from "vuex";

export default createStore({
  state: {
    cart: [],
    selectedCategory: "",
    selectedSupermarket: null,
    groupedProducts: {},
    supermarketState: {},
    allProducts: []
  },
  mutations: {
    addToCart(state, product) {
      const isProductInCart = state.cart.some(
        (item) => item.product_uuid === product.product_uuid
      );
      if (!isProductInCart) {
        state.cart.push(product);
      }
    },
    removeFromCart(state, product) {
      state.cart = state.cart.filter(
        (item) => item.product_uuid !== product.product_uuid
      );
    },
    clearCart(state) {
      state.cart = [];
    },
    setSelectedCategory(state, category) {
      state.selectedCategory = category;
    },
    setSelectedSupermarket(state, supermarket) {
      state.selectedSupermarket = supermarket;
    },
    updateGroupedProducts(state, groupedProducts) {
      state.groupedProducts = groupedProducts;
    },
    updateSupermarketState(state, supermarketState) {
      state.supermarketState = supermarketState;
    },
    updateAllProducts(state, products) {
      state.allProducts = products;
    },
  },
  actions: {
    addToCart({ commit, dispatch }, product) {
      commit("addToCart", product);
      dispatch("groupProductsBySupermarket", this.state.allProducts);
    },
    removeFromCart({ commit, dispatch }, product) {
      commit("removeFromCart", product);
      dispatch("groupProductsBySupermarket", this.allProducts);
    },
    clearCart({ commit }) {
      commit("clearCart");
    },
    updateSelectedCategory({ commit }, category) {
      commit("setSelectedCategory", category);
    },
    updateSelectedSupermarket({ commit }, supermarket) {
      commit("setSelectedSupermarket", supermarket);
    },
    groupProductsBySupermarket({ commit, getters }, allProducts) {
      const groupedProducts = {};
      const supermarketState = {};
    
      allProducts
        .filter(product => getters.isProductInCart(product.product_uuid))
        .forEach(product => {
          const supermarketUUIDs = product.supermarket_uuids || product.supermarket_uuid;
          const uuids = Array.isArray(supermarketUUIDs) ? supermarketUUIDs : [supermarketUUIDs];
          uuids.forEach(uuid => {
            if (!groupedProducts[uuid]) groupedProducts[uuid] = [];
            groupedProducts[uuid].push(product);
          });
        });
    
      commit("updateGroupedProducts", groupedProducts);
      commit("updateSupermarketState", supermarketState);
    }
  },
  getters: {
    getSelectedSupermarket: (state) => state.selectedSupermarket,
    getSelectedCategory: (state) => state.selectedCategory,
    isProductInCart: (state) => (product_uuid) => {
      return state.cart.some(item => item.product_uuid === product_uuid);
    },
    cartIsEmpty: (state) => {
      return state.cart.length === 0;
    }
  }
});
