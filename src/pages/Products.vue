<template>
  <div class="navigation">
    <Search />
    <Buttons :includeGoBack="true" />
  </div>

  <div class="carousel__container">
    <Carousel />
    <Carousel />
    <Carousel />
    <Carousel />
    <Carousel />
  </div>

  <div class="cards__container">
    <Card />
    <Card />
    <Card />
  </div>
</template>

<script>
import SearchBar from "../components/Search.vue";
import Buttons from "../components/Buttons.vue";
import Carousel from "../components/Carousel.vue";
import Card from "../components/Card.vue";

export default {
  components: { Buttons, SearchBar, Carousel, Card },
};
</script>