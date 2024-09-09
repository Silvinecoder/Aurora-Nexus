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
            <SupermarketToggle :supermarket_uuids="[supermarket_uuid]" />

            <div class="horizontal_card__shopping_list">
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
    ...mapGetters(['isProductInCart']),
    ...mapState({
      cart: state => state.cart,
    }),
    cartIsEmpty() {
      return this.cart.length === 0;
    },
  },

  methods: {
    ...mapActions(['clearCart', 'addToCart', 'removeFromCart']),

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
