<template>
  <div class="page_container">
    <SideBar />
    <div class="content">
      <div class="top_container">
        <div class="navigation">
          <Search />
          <Button :goToSupermarketButton="true" />
        </div>
      </div>
      <div class="layout_style">
        <Button class="shopping_list_delete_button" :clearCart="clearCart" />

        <div class="check_list" v-if="cartIsEmpty">Your shopping list is empty.</div>
        <div class="grouped_shopping_list" v-else>
          <div v-for="(products, supermarket_uuid) in groupedProducts" :key="supermarket_uuid"
            class="supermarket_section">
            <div class="supermarket_toggle__image">
              <!-- Pass the current state and listen for toggle event -->
              <SupermarketToggle :isOpen="supermarketState[supermarket_uuid]"
                @toggle="toggleSupermarket(supermarket_uuid)" />
              <img :src="getSupermarketImageUrlUuid(supermarket_uuid)" :alt="supermarket_uuid" />
            </div>
            <!-- Show or hide cards based on state -->
            <div v-if="supermarketState[supermarket_uuid]" class="horizontal_card__shopping_list">
              <section v-for="product in products" :key="product.product_uuid">
                <HorizontalCard :product="product" :isAddedToCart="true" :addToCart="addToCart"
                  :removeFromCart="removeFromCart" :showSupermarketLogo="true" />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import Button from "@/components/Buttons.vue";
import Search from "@/components/Search.vue";
import HorizontalCard from "@/components/HorizontalCard.vue";
import SideBar from "@/components/SideBar.vue";
import SupermarketToggle from "@/components/SupermarketToggle.vue";
import { ProductsMixin } from '@/utils/mixins/productsMixin';

export default {
  components: { Button, Search, HorizontalCard, SideBar, SupermarketToggle },
  mixins: [ProductsMixin],

  data() {
    return {
      groupedProducts: {},
    };
  },

  computed: {
    ...mapGetters(['isProductInCart', 'supermarketState']),
    ...mapState({
      cart: state => state.cart,
    }),
    cartIsEmpty() {
      return this.cart.length === 0;
    },
  },

  methods: {
    ...mapActions(['clearCart', 'addToCart', 'removeFromCart']),

    toggleSupermarket(supermarket_uuid) {
      // Update supermarket state logic here
      const currentState = this.supermarketState[supermarket_uuid];
      this.$store.dispatch('updateSupermarketState', {
        [supermarket_uuid]: !currentState,
      });
    },

    groupProductsBySupermarket() {
      this.groupedProducts = this.allProducts
        .filter(product => this.isProductInCart(product.product_uuid))
        .reduce((acc, product) => {
          const supermarketUUIDs = product.supermarket_uuids || product.supermarket_uuid;
          const uuids = Array.isArray(supermarketUUIDs) ? supermarketUUIDs : [supermarketUUIDs];

          uuids.forEach(uuid => {
            if (!acc[uuid]) acc[uuid] = [];
            acc[uuid].push(product);
          });

          return acc;
        }, {});
    },
  },

  async mounted() {
    await this.getProducts();
    this.groupProductsBySupermarket();
  },

  watch: {
    cart: {
      handler() {
        this.groupProductsBySupermarket();
      },
      deep: true
    }
  }
};
</script>