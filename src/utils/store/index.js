import { createStore } from "vuex";

export default createStore({
  state: {
    cart: [],
    selectedCategory: "",
    selectedSupermarket: null,
  },
  mutations: {
    addToCart(state, product) {
      state.cart.push(product);
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
      console.log("Setting selected category in store:", category);
      state.selectedCategory = category;
    },
    setSelectedSupermarket(state, supermarket) {
      console.log("Setting selected supermarket in store:", supermarket);
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
      console.log("Updating selected category in store:", category);
      commit("setSelectedCategory", category);
    },
    updateSelectedSupermarket({ commit }, supermarket) {
      console.log("Updating selected supermarket in store:", supermarket);
      commit("setSelectedSupermarket", supermarket);
    },
  },
  getters: {
    getSelectedSupermarket: (state) => state.selectedSupermarket,
    getSelectedCategory: (state) => state.selectedCategory,
  },
});
