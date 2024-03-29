<template>
    <button class="back_arrow standard_icon" v-if="GoBack" @click="goBack">
      <svg>
        <use xlink:href="../assets/icons/standard/back-arrow.svg#back_arrow__icon"></use>
      </svg>
    </button>
    
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
    goToShoppingList: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    shoppingList() {
      this.$router.push('/shopping-list');
    }
  },
};
</script>
