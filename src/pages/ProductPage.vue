<template>
  <div>
    <SearchBar />
    <Buttons :includeGoBack="true" />
  </div>
</template>

<script>
import SearchBar from "../components/SearchBar.vue";
import Buttons from "../components/Buttons.vue";

export default {
  components: { Buttons, SearchBar },
};
</script>
