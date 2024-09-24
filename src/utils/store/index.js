import { createStore } from "vuex";

export default createStore({
  state: {
    cart: [],
    selectedCategory: "",
    selectedSupermarket: null,
    supermarketState: {},
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
    setSupermarketState(state, payload) {
      state.supermarketState = { ...state.supermarketState, ...payload };
    },
  },
  actions: {
    addToCart({ commit }, product) {
      commit("addToCart", product);
    },
    removeFromCart({ commit }, product) {
      commit("removeFromCart", product);
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
    updateSupermarketState({ commit }, payload) {
      commit("setSupermarketState", payload);
    },
  },
  getters: {
    getSelectedSupermarket: (state) => state.selectedSupermarket,
    getSelectedCategory: (state) => state.selectedCategory,
    isProductInCart: (state) => (product_uuid) => {
      return state.cart.some(item => item.product_uuid === product_uuid);
    },
    supermarketState: (state) => state.supermarketState,
  },
});