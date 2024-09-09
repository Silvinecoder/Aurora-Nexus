<template>
  <div :class="supermarketToggleClass">
    <Button :supermarketToggleAdd="true" v-if="!isOpen" @click="toggleContent()">Open</button>
    <Button :supermarketToggleClose="true" v-else @click="toggleContent()">Close</Button>

    <!-- Supermarkets logo accordion -->
    <div v-if="isOpen" class="content">
      <img v-for="uuid in supermarket_uuids" :key="uuid" :src="getSupermarketImageUrl(uuid)" :alt="uuid" />
    </div>
  </div>
</template>

<script>
import { ProductsMixin } from '@/utils/mixins/productsMixin';
import Button from '@/components/Buttons.vue';

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
    getSupermarketImageUrl(supermarket_uuid) {
      return this.getSupermarketImageUrlUuid(supermarket_uuid);
    }
  }
};
</script>
