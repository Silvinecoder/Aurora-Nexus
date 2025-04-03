<template>
  <img v-for="name in supermarket_names" :key="name" :src="getSupermarketImageUrl(name)" :alt="name"
    class="supermarket-logo" />
</template>

<script>
import { supermarketImageHelper } from '../utils/helpers/SupermarketImageHelper';
import Button from '../components/Buttons.vue';

export default {
  mixins: [supermarketImageHelper],
  components: { Button },
  props: {
    supermarket_names: {
      type: Array,
      required: true
    }
  },
};
</script>
