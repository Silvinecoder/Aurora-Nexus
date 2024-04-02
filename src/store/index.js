import { createStore } from 'vuex';

export default createStore({
  state: {
    cart: []
  },
  getters: {
    categoryProducts: (state) => (categoryName) => {
      return state.cart.filter(product => product.categoryName === categoryName);
    },
  },
  mutations: {
    addToCart(state, product) {
      state.cart.push(product);
    },
    removeFromCart(state, product) {
      state.cart = state.cart.filter(item => item.product_uuid !== product.product_uuid);
    },
    clearCart(state) {
      state.cart = [];
    }
  },
  actions: {
    addToCart({ commit }, product) {
      commit('addToCart', product);
    },
    removeFromCart({ commit }, product) {
      commit('removeFromCart', product);
    },
    clearCart({ commit }) {
      commit('clearCart');
    }
  },
});