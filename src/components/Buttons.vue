<template>
  <button class="back_arrow standard_icon" v-if="GoBack" @click="goBack">
    <svg>
      <use xlink:href="../assets/icons/standard/back-arrow.svg#back_arrow__icon"></use>
    </svg>
  </button>
  <button v-if="includeRestart" @click="restart">Restart</button>
  <button class="standard_icon" v-if="goToShoppingList" @click="shoppingList">
    <svg>
      <use xlink:href="../assets/icons/standard/list.svg#list__icon"></use>
    </svg>
  </button>
</template>

<script>
export default {
  props: {
    GoBack: {
      type: Boolean,
      default: false,

    },
    includeRestart: {
      type: Boolean,
      default: false,
    },
    goToShoppingList: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    goBack() {
      console.log("back");
    },
    restart() {
      console.log("restart");
    },
    shoppingList() {
      console.log("shopping list");
    }
  },
};
</script>
