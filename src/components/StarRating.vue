<template>
  <div class="star-rating">
    <span 
      v-for="star in maxStars" 
      :key="star" 
      class="star" 
      :class="{ filled: star <= rating }" 
      @mouseover="hover(star)" 
      @mouseleave="clearHover" 
      @click="rate(star)"
    >
      ★
    </span>
  </div>
</template>

<script>
export default {
  props: {
    maxStars: {
      type: Number,
      default: 5
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      rating: this.value,
      hoverRating: 0
    };
  },
  methods: {
    rate(star) {
      this.rating = star;
      this.$emit('input', this.rating);
    },
    hover(star) {
      this.hoverRating = star;
    },
    clearHover() {
      this.hoverRating = 0;
    }
  }
};
</script>

<style scoped>
.star {
  font-size: 24px;
  cursor: pointer;
  color: grey;
}
.star.filled {
  color: gold;
}
</style>
