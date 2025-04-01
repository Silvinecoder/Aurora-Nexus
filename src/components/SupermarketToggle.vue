<template>
  <div :class="supermarketToggleClass">
    <Button :supermarketToggleAdd="true" v-if="!isOpen" @click="toggleContent()">Open</button>
    <Button :supermarketToggleClose="true" v-else @click="toggleContent()">Close</Button>

    <!-- Supermarkets logo accordion -->
    <div v-if="isOpen" class="content">
      <img v-for="name in supermarket_names" :key="name" :src="getSupermarketImageUrl(name)" :alt="name"
        class="supermarket-logo" />
    </div>
  </div>
</template>

<script>
import { supermarketImageHelper } from '@/utils/mixins/helpers/SupermarketImageHelper';
import Button from '@/components/Buttons.vue';

export default {
  mixins: [supermarketImageHelper],
  components: { Button },
  props: {
    supermarket_names: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isOpen: true
    };
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
      this.isOpen = !this.isOpen;
    },
  }
};
</script>
