<template>
  <div>
    <Search />
    <Buttons :includeGoBack="true" />
    <Icons :includesupermarket="true" />
    <div class="cards__container">
      <Card />
      <Card />
      <Card />
    </div>
  </div>
</template>

<script>
import SearchBar from "../components/Search.vue";
import Buttons from "../components/Buttons.vue";
import Icons from "../components/Icons.vue";
import Card from "../components/Card.vue";

export default {
  components: { Buttons, SearchBar, Icons, Card },
};
</script>