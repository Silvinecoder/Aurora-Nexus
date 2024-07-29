<template>
  <div class="buttons_container">
    <button class="back_arrow standard_icon" v-if="GoBack" @click="goBack">
      <svg>
        <use xlink:href="../assets/icons/supermarket/back-arrow.svg#back_arrow__icon"></use>
      </svg>
    </button>
    
    <button class="standard_icon bubble_icon" v-if="goToShoppingList" @click="shoppingList">
      <svg>
        <use xlink:href="/icons/supermarkets/assets/list.svg#list__icon"></use>
      </svg>
    </button>

    <button class="standard_icon burger_button" v-if="BurgerButton">
      <svg>
        <use xlink:href="../assets/icons/standard/burgerButton.svg#burger_button__icon"></use>
      </svg>
    </button>

    <button v-if="product && !isAddedToCart" @click="addToCart(product)">
      <svg>
        <use xlink:href="../assets/icons/supermarket/add.svg#add__icon"></use>
      </svg>
    </button>

    <button v-if="product && isAddedToCart"  @click="removeFromCart(product)">
      <svg>
        <use xlink:href="../assets/icons/supermarket/minus.svg#minus__icon"></use>
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
    product: {
      type: Object,
      default: null,
    },
    addToCart: {
      type: Function,
      default: null,
    },
    removeFromCart: {
      type: Function,
      default: null,
    },
  },
  computed: {
    isAddedToCart() {
      return this.product && this.$store.state.cart.includes(this.product.product_uuid);
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    // Supermarket
    shoppingList() {
      this.$router.push('/supermarket/shopping-list');
    }
  },
};
</script>
