<!-- Buttons.vue -->
<template>
  <button @click="goBack">Go Back</button>
</template>

<script>
// Buttons.vue
export const ButtonFunctions = {
  methods: {
    goBack() {
      console.log("Go back clicked");
      // Add functionality to go back in the browser's history
      window.history.back();
    }
  }
};

</script>
