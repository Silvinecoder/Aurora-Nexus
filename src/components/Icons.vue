<template>
  <div v-if="includegastronomy" class="supermarkets_images">
    <img src="" alt="" />
  </div>
  <div v-if="includesupermarket" class="gastronony_images">
    <img src="" alt="" />
    <p></p>
  </div>
  <svg v-if="includestandard" class="standard_icon"></svg>
</template>

<script>
export default {
  props: {
    includegastronomy: {
      type: Boolean,
      default: false,
    },
    includesupermarket: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    gastronony_images() {
      console.log("gastronomy");
    },
    supermarkets_images() {
      console.log("supermarket");
    },
  },
};
</script>
