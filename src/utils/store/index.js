import { createStore } from "vuex";

export default createStore({
  state: {
    cart: [],
    selectedCategory: "",
    selectedSupermarket: null,
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
  },
  getters: {
    getSelectedSupermarket: (state) => state.selectedSupermarket,
    getSelectedCategory: (state) => state.selectedCategory,
    isProductInCart: (state) => (product_uuid) => {
      return state.cart.some(item => item.product_uuid === product_uuid);
    },
  },
});
