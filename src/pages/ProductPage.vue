<template>
  <div>
    <SearchBar />
    <Buttons :includeGoBack="true" />
    <Icons :includesupermarket="true" />
    <Cards />
  </div>
</template>

<script>
import SearchBar from "../components/SearchBar.vue";
import Buttons from "../components/Buttons.vue";
import Icons from "../components/Icons.vue";
import Cards from "../components/Cards.vue";

export default {
  components: { Buttons, SearchBar, Icons, Cards },
};
</script>
