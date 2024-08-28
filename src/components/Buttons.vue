<template>
  <div class="buttons_container">
    <!-- Home button -->
    <button class="home_button" v-if="goHomeButton" @click="goHome">
      <img src="/src/assets/global/san-logo.png" alt="San logo">
    </button>

    <!-- Back Arrow Button -->
    <button class="standard_icon back_arrow" v-if="goBackButton" @click="goBack">
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

    <!-- See All button-->
    <button class="see_all__button" v-if="seeAllButton">
      <svg>
        <use xlink:href="../assets/icons/supermarket/see-all.svg#see_all__icon"></use>
      </svg>
      <p>See All</p>
    </button>

    <!-- See Less button-->
    <button class="see_less__button"  v-if="seeLessButton">
      <svg>
        <use xlink:href="../assets/icons/supermarket/see-less.svg#see_less__icon"></use>
      </svg>
      <p>See Less</p>
    </button>

    <!-- Delete Cart Button -->
    <button class="shopping_list__delete" @click="clearCart" v-if="clearCart">
      Delete All
    </button>
  </div>
</template>

<script>
export default {
  props: {
    goBackButton: {
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
  },
  methods: {
    goBack() {
      this.$router.go(-1);
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
