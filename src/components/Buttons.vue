<template>
  <div class="buttons_container">
    <button class="home_button" v-if="goHomeButton" @click="goHome">
      <img src="/src/assets/global/san-logo.png" alt="San logo">
    </button>

    <button class="standard_icon bubble_icon" v-if="goToSupermarketButton" @click="supermarket">
      <svg class="supermarket_icon">
        <use xlink:href="../assets/icons/supermarket/supermarket-icon.svg#supermarket__icon"></use>
      </svg>
    </button>

    <button class="standard_icon bubble_icon" v-if="goToShoppingList" @click="shoppingList">
      <svg class="list_icon">
        <use xlink:href="/icons/supermarkets/assets/list.svg#list__icon"></use>
      </svg>
    </button>

    <button v-if="product && !isAddedToCart" @click="addToCart(product)">
      <svg>
        <use xlink:href="../assets/icons/supermarket/add.svg#add__icon"></use>
      </svg>
    </button>

    <button v-if="product && isAddedToCart" @click="removeFromCart(product)">
      <svg>
        <use xlink:href="../assets/icons/supermarket/minus.svg#minus__icon"></use>
      </svg>
    </button>

    <button class="close_button standard_icon" @click="closeButton" v-if="closeButton">
      <svg>
        <use xlink:href="../assets/icons/supermarket/close-icon.svg#close__icon"></use>
      </svg>
    </button>

    <button class="see_all__button" v-if="seeAllButton">
      <svg>
        <use xlink:href="../assets/icons/supermarket/see-all.svg#see_all__icon"></use>
      </svg>
      <p>See All</p>
    </button>

    <button class="see_less__button"  v-if="seeLessButton">
      <svg>
        <use xlink:href="../assets/icons/supermarket/see-less.svg#see_less__icon"></use>
      </svg>
      <p>See Less</p>
    </button>

    <button class="shopping_list__delete" @click="clearCart" v-if="clearCart">
      Delete All
    </button>

    <button class="supermarket_toggle_add__button"  v-if="supermarketToggleAdd">
      <svg>
        <use xlink:href="../assets/icons/supermarket/supermarket-toggle-add.svg#supermarket_toggle_add__icon"></use>
      </svg>
    </button>

    <button class="supermarket_toggle_close__button"  v-if="supermarketToggleClose">
      <svg>
        <use xlink:href="../assets/icons/supermarket/supermarket-toggle-close.svg#supermarket_toggle_close__icon"></use>
      </svg>
    </button>

    <button class="supermarket_accordion_closed__button"  v-if="supermarketAccordionClosed">
      <svg>
        <use xlink:href="../assets/icons/supermarket/supermarket-accordion-closed.svg#supermarket_accordion_closed__icon"></use>
      </svg>
    </button>

    <button class="supermarket_accordion_open__button"  v-if="supermarketAccordionOpen">
      <svg>
        <use xlink:href="../assets/icons/supermarket/supermarket-accordion-open.svg#supermarket_accordion_open__icon"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    goToSupermarketButton: {
      type: Boolean,
      default: false,
    },
    goToShoppingList: {
      type: Boolean,
      default: false,
    },
    goHomeButton: {
      type: Boolean,
      default: false,
    },
    product: {
      type: Object,
      required: false,
    },
    addToCart: {
      type: Function,
      required: false,
    },
    removeFromCart: {
      type: Function,
      required: false,
    },
    isAddedToCart: {
      type: Boolean,
      required: false,
    },
    seeAllButton: {
      type: Boolean,
      default: false,
    },
    seeLessButton: {
      type: Boolean,
      default: false,
    },
    closeButton: {
      type: Function,
      required: false,
    },
    clearCart: {
      type: Function,
      required: false,
    },
    supermarketToggleAdd: {
      type: Boolean,
      default: false,
    },
    supermarketToggleClose: {
      type: Boolean,
      default: false,
    },
    supermarketAccordionOpen: {
      type: Boolean,
      default: false,
    },
    supermarketAccordionClosed: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    supermarket() {
      this.$router.push('/supermarket');
    },
    goHome() {
      this.$router.push('/');
    },
    shoppingList() {
      this.$router.push('/supermarket/shopping-list');
    },
  },
};
</script>
