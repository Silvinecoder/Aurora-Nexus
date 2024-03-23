<template>
    <div class="navigation">
      <Buttons :GoBack="true" />
      <Search />
      <Buttons :goToShoppingList="true" />
    </div>

    <div class="products__body">
      <div class="carousel__container">
        <Carousel />
        <Carousel />
        <Carousel />
        <Carousel />
        <Carousel />
      </div>
      <h2 class="category__titles">{{ category.titles }}</h2>
      <div class="cards__container">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
</template>

<script>
import Search from "../components/Search.vue";
import Buttons from "../components/Buttons.vue";
import Carousel from "../components/Carousel.vue";
import Card from "../components/Card.vue";

export default {
  components: { Buttons, Search, Carousel, Card },

  data() {
    return {
      category: {
        titles: "Products",
      },
    };
  },
};
</script>