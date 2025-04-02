<template>
  <div class="supermarket_logo" @click="toggleContent()">
    <!-- Accordion button -->
    <Button :supermarketAccordionOpen="true" v-if="isOpen"></Button>
    <Button :supermarketAccordionClosed="true" v-else></Button>

    <!-- Supermarkets logo accordion -->
    <div v-if="isOpen" class="content">
      <img v-for="name in supermarket_names" :key="name" :src="getSupermarketImageUrl(name)" :alt="name"
        class="supermarket-logo" />
    </div>
  </div>
</template>

<script>
import { supermarketImageHelper } from '@/utils/helpers/SupermarketImageHelper';
import Button from "@/components/Buttons.vue";

export default {
  mixins: [supermarketImageHelper],
  components: { Button },
  props: {
    supermarket_names: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      isOpen: true
    };
  },
  computed: {
    supermarketLogoClass() {
      return {
        supermarket_logo: true,
        "supermarket_logo--open": this.isOpen
      };
    }
  },
  methods: {
    toggleContent() {
      this.isOpen = !this.isOpen;
    }
  }

};
</script>
