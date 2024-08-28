<template>
  <div class="cards__category_title__button__container">
    <h4 class="cards__category_title">{{ categoryName }}</h4>
    <Button v-if="hasMoreThanTenProducts && !isExpanded" @click="handleClick" :seeAllButton="true"/>
    <Button v-if="hasMoreThanTenProducts && isExpanded" @click="handleClick" :seeLessButton="true"/>
  </div>
</template>

<script>
import Button from '@/components/Buttons.vue';
export default {
  components: { Button },
  props: {
    categoryName: String,
    isExpanded: Boolean,
    hasMoreThanTenProducts: Boolean,
  },
  methods: {
    handleClick() {
      this.$emit('toggleExpand', this.categoryName);
    }
  }
}
</script>
