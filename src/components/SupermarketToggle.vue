<template>
  <div :class="supermarketToggleClass">
    <Button :supermarketToggleAdd="true" v-if="!isOpen" @click="toggleContent()">Open</button>
    <Button :supermarketToggleClose="true" v-else @click="toggleContent()">Close</Button>

    <!-- Supermarkets logo accordion -->
    <div v-if="isOpen" class="content">
      <img 
        v-for="name in supermarket_names"
        :key="name"
        :src="getSupermarketImageUrl(name)" 
        :alt="name" 
        class="supermarket-logo" 
      />
    </div>
  </div>
</template>

<script>
import { SupermarketsCategoriesProductsMixin } from '@/utils/mixins/endpoints/supermarketsCategoriesProductsMixin';
import Button from '@/components/Buttons.vue';

export default {
  mixins: [SupermarketsCategoriesProductsMixin],
  components: { Button },
  props: {
    supermarket_names: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isOpen: false
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
