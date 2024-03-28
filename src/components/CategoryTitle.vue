<template>
  <div class="cards__title_and_button_container">
    <h2 class="cards__category_title">{{ categoryName }}</h2>
    <button v-if="showButton" @click="goToCategory(categoryName)">
      See all
    </button>
  </div>
</template>

<script>
export default {
  props: ['categoryName', 'goToCategory', 'showButton']
}
</script>