<template>
  <div class="buttons_container">
    <!-- Back Arrow Button -->
    <button class="back_arrow standard_icon" v-if="GoBack" @click="goBack">
      <svg>
        <use xlink:href="../assets/icons/supermarket/back-arrow.svg#back_arrow__icon"></use>
      </svg>
    </button>

    <!-- Go to Shopping List Button -->
    <button class="standard_icon bubble_icon" v-if="goToShoppingList" @click="shoppingList">
      <svg>
        <use xlink:href="/icons/supermarkets/assets/list.svg#list__icon"></use>
      </svg>
    </button>

    <!-- Burger Button -->
    <button class="standard_icon burger_button" v-if="BurgerButton">
      <svg>
        <use xlink:href="../assets/icons/standard/burgerButton.svg#burger_button__icon"></use>
      </svg>
    </button>

    <!-- Add to Cart Button -->
    <button v-if="product && !isAddedToCart" @click="addToCart(product)">
      <svg>
        <use xlink:href="../assets/icons/supermarket/add.svg#add__icon"></use>
      </svg>
    </button>

    <!-- Remove from Cart Button -->
    <button v-if="product && isAddedToCart" @click="removeFromCart(product)">
      <svg>
        <use xlink:href="../assets/icons/supermarket/minus.svg#minus__icon"></use>
      </svg>
    </button>

    <!-- Close dropDown -->
    <button class="close_button standard_icon" @click="closeButton" v-if="closeButton">
      <svg>
        <use xlink:href="../assets/icons/supermarket/close-icon.svg#close__icon"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    BurgerButton: {
      type: Boolean,
      default: false,
    },
    GoBack: {
      type: Boolean,
      default: false,
    },
    goToShoppingList: {
      type: Boolean,
      default: false,
    },
    goToCategory: {
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
    closeButton: {
      type: Function,
      required: false,
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    shoppingList() {
      this.$router.push('/supermarket/shopping-list');
    },
  },
};
</script>
