<template>
  <div v-if="isOpen" class="sidebar">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/products">Products</router-link></li>
      <li><router-link to="/restaurants">Restaurants</router-link></li>
      <li><router-link to="/social">Social</router-link></li>
      <li><router-link to="/settings">Settings</router-link></li>
      <li><router-link to="/donations">Make a donation</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
};
</script>