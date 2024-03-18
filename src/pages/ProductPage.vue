<!-- ProductPage.vue -->
<template>
  <div>
    <ButtonFunctions />
    <SearchBar />
  </div>
</template>

<script>
import { ButtonFunctions } from '../components/Buttons.vue';
import SearchBar from '../components/SearchBar.vue';

export default {
  components: {
    ButtonFunctions,
    SearchBar
  }
};
</script>
