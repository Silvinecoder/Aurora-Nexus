import { fetchData } from '../api';

export const AttributesMixin = {
  data() {
    return {
      attributes: [],
      attributesWithProducts: [],
      attributesWithProduct: [],
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
        this.attributesWithProducts = await fetchData(`/attributes/${attribute_uuid}/products`);
      } catch (error) {
        console.error('Failed to fetch attributes with products:', error);
      }
    },
    async fetchAttributesWithProduct() {
      try {
        this.attributesWithProduct = await fetchData(`/attributes/${attribute_uuid}/products/${product_uuid}`)
      } catch (error) {
        console.error('Failed to fetch attributes with product:', error)
      }
    }
  },
};
