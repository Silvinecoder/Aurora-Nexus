<template>
  <div class="footer">
    <div class="footer_container">
      <button class="footer_buttons home_button" :class="{ active: $route.path.startsWith('/home') }" @click="homePage">
        <p>Home page</p>
      </button>

      <button class="footer_buttons supermarket_button" :class="{ active: $route.path.startsWith('/supermarket/') }" @click="supermarketPage">
        <p>Products</p>
      </button>

      <button class="footer_buttons restaurants_button" :class="{ active: $route.path.startsWith('/restaurants') }" @click="restaurantsPage">
        <p>Restaurants</p>
      </button>

      <button class="footer_buttons settings_button" :class="{ active: $route.path.startsWith('/settings') }" @click="settingsPage">
        <img :src="settingsClicked" alt="settings">
        <p>Settings</p>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSettingsClicked: false,
    };
  },
  computed: {
    settingsClicked(){
      return this.isSettingsClicked ? '../assets/icons/standard/settings_filled.png' : '../assets/icons/standard/settings.png';
    }
  },
  methods: {
    homePage() {
      this.$router.push('/home');
    },
    supermarketPage() {
      this.$router.push('/supermarket/products');
    },
    restaurantsPage() {
      this.$router.push('/restaurants');
    },
    settingsPage() {
      this.isSettingsClicked = !this.isSettingsClicked;
      this.$router.push('/settings');
    },
  },
};
</script>