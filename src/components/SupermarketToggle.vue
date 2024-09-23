<template>
  <div :class="supermarketToggleClass">
    <Button :supermarketToggleAdd="true" v-if="!isOpen" @click="toggleContent">Open</Button>
    <Button :supermarketToggleClose="true" v-else @click="toggleContent">Close</Button>
  </div>
</template>

<script>
import Button from '@/components/Buttons.vue';

export default {
  components: { Button },
  props: {
    isOpen: {
      type: Boolean,
      default: true 
    }
  },
  computed: {
    supermarketToggleClass() {
      return {
        supermarket_toggle: true,
        "supermarket_toggle--open": this.isOpen
      };
    }
  },
  methods: {
    toggleContent() {
      this.$emit('toggle');
    }
  }
};
</script>
