import { fetchData } from '../api';

export const AttributesMixin = {
  data() {
    return {
      attributes: [],
      attributesWithProducts: [],
    };
  },
  methods: {
    async fetchAttributes() {
      try {
        this.attributes = await fetchData('/attributes');
      } catch (error) {
        console.error('Failed to fetch attributes:', error);
      }
    },
    async fetchAttributesWithProducts() {
      try {
        this.attributesWithProducts = await fetchData('/attributes/products');
      } catch (error) {
        console.error('Failed to fetch attributes with products:', error);
      }
    },
  },
};
