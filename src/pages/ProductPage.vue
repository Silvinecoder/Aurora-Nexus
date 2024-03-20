<template>
  <div>
    <SearchBar />
    <Buttons :includeGoBack="true" />
    <Icons :includesupermarket="true" />
  </div>
</template>

<script>
import SearchBar from "../components/SearchBar.vue";
import Buttons from "../components/Buttons.vue";
import Icons from "../components/Icons.vue";

export default {
  components: { Buttons, SearchBar, Icons },
};
</script>
