<template>
  <div class="supermarket_logo" :class="supermarketLogoClass">
    <!-- Accordion button -->
    <button @click="toggleContent()">
      <Button :supermarketAccordionOpen="true" v-if="isOpen"></Button>
      <Button :supermarketAccordionClosed="true" v-else></Button>
    </button>

    <!-- Supermarkets logo accordion -->
    <div v-if="isOpen" class="content">
        <img v-for="uuid in supermarket_uuids" :key="uuid" :src="getSupermarketImageUrl(uuid)" :alt="uuid" class="supermarket-logo" />
    </div>
  </div>
</template>

<script>
import { ProductsMixin } from '@/utils/mixins/productsMixin';
import Button from "@/components/Buttons.vue";

export default {
  mixins: [ProductsMixin],
  components: { Button },
  props: {
    supermarket_uuids: {
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
    },
    getSupermarketImageUrl(supermarket_uuid) {
      return this.getSupermarketImageUrlUuid(supermarket_uuid);
    }
  }
};
</script>
