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
            <SupermarketToggle :supermarket_names="products.length > 0 && products[0].supermarkets && products[0].supermarkets.length > 0
              ? [products[0].supermarkets[0].supermarket_name]
              : ['Unknown Supermarket']" />

            <div class="horizontal_card__shopping_list">
              <section v-for="product in products" :key="product.product_uuid">
                <HorizontalCard :product="product" :isAddedToCart="true" :addToCart="addToCart"
                  :removeFromCart="removeFromCart" />
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
import { ProductsMixin } from '@/api/endpoints/productsMixin';
import { supermarketImageHelper } from '@/utils/helpers/SupermarketImageHelper';

export default {
  components: { Button, Search, HorizontalCard, SideBar, SupermarketToggle },
  mixins: [ProductsMixin, supermarketImageHelper],

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
      console.log("Cart contents:", this.cart);

      this.groupedProducts = this.cart.reduce((groups, product) => {
        const supermarketUuid = product.supermarkets?.[0]?.supermarket_uuid;

        if (!groups[supermarketUuid]) {
          groups[supermarketUuid] = [];
        }
        groups[supermarketUuid].push(product);
        return groups;
      }, {});
    }
  },

  async mounted() {
    if (this.getSelectedSupermarket) {
      await this.loadProductsBySupermarket(this.getSelectedSupermarket);
      this.groupProductsBySupermarket();
    }
  },

  watch: {
    // Watch for changes in the list of products
    supermarketsProducts: {
      handler() {
        this.groupProductsBySupermarket();
      },
      deep: true
    },
    // Watch for changes in the cart
    cart: {
      handler() {
        this.groupProductsBySupermarket();
      },
      immediate: true,
      deep: true
    }
  }
};
</script>
