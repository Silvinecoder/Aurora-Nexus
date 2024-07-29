<template>
  <div class="category_title__container category_title_and_button_container">
<<<<<<< HEAD
    <h2 class="cards__category_title">{{ categoryName }}</h2>
    <button v-if="showButton" @click="goToCategory(categoryName)">
      See all
=======
    <h4 class="cards__category_title">{{ categoryName }}</h4>
    <button v-if="showButton" @click="goToCategory(categoryName)">
      <p>See all</p>
>>>>>>> main
    </button>
  </div>
</template>

<script>
export default {
  props: ['categoryName', 'goToCategory', 'showButton']
}
</script>