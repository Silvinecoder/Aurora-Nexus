<template>
  <button class="carousel">
    <img :src="imageUrl" :alt="imageAlt">
  </button>
</template>


<script>
export default {
  props: ['imageUrl', 'imageAlt']
}
</script>