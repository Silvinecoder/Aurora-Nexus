<template>
  <div class="navigation">
    <Buttons :GoBack="true" />
    <Search />
  </div>

  <h2 class="title">Shopping List</h2>
  <div class="cards__container">
    <Card />
    <Card />
    <Card />
  </div>
</template>

<script>
import Buttons from "../components/Buttons.vue";
import Search from "../components/Search.vue";
import Card from "../components/Card.vue";

export default {
  components: { Buttons, Search, Card }
};

</script>