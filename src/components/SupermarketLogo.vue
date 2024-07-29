<template>
  <div class="supermarket_icons">
    <img :src="logoUrl" :alt="supermarket + ' Logo'" />
  </div>
</template>

<script>
export default {
  props: ['supermarket'],
  computed: {
    logoUrl() {
      return `public/icons/supermarkets/${this.supermarket.toLowerCase()}.png`;
    },
  },
};
</script>