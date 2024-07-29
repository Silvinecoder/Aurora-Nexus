import { createStore } from 'vuex';

export default createStore({
  state: {
    cart: [],
  },
  mutations: {
    addToCart(state, productUUID) {
      if (!state.cart.includes(productUUID)) {
        state.cart.push(productUUID);
      }
    },
    removeFromCart(state, productUUID) {
      state.cart = state.cart.filter(item => item !== productUUID);
    },
    clearCart(state) {
      state.cart = [];
    }
  },
  actions: {
    addToCart({ commit }, productUUID) {
      commit('addToCart', productUUID);
    },
    removeFromCart({ commit }, productUUID) {
      commit('removeFromCart', productUUID);
    },
    clearCart({ commit }) {
      commit('clearCart');
    }
  },
});
