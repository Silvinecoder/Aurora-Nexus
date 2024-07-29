<template>
  <div class="home_container">
    <div class="welcome_container">
      <h4>Hello,</h4>
      <h1>Cris</h1>
      <p>PostCode, Country</p>
    </div>

    <div class="buttons_container">
      <button class="shopping_list_button" :class="{ active: $route.path.startsWith('/supermarket/shopping-list') }"
        @click="shoppingListPage">
        Shopping List
      </button>
      <button class="settings_button" :class="{ active: $route.path.startsWith('/settings') }" @click="settingsPage">
        Settings
      </button>
    </div>

    <button>Donation</button>
    <Card></Card>
  </div>
</template>

<script>
export default {
  methods: {
    shoppingListPage() {
      this.$router.push('/supermarket/shopping-list');
    },
    settingsPage() {
      this.$router.push('/settings');
    },
  },
};
</script>
