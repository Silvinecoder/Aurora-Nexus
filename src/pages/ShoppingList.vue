<template>
  <div class="page_container">
    <SideBar />
    <div class="shopping_list_content">
      <div class="top_container">
        <div class="navigation">
          <Search />
          <Button :goToSupermarketButton="true" />
        </div>
      </div>
      <div class="layout_style">
        <Button class="shopping_list_delete_button" :clearCart="clearCart" />
        <div class="check_list" v-if="cartIsEmpty">
          <h3>Your shopping list is empty.</h3>
        </div>
        <div class="grouped_shopping_list" v-else>
          <div v-for="(group, supermarket_uuid) in groupedProducts" :key="supermarket_uuid" class="supermarket_section">
            <div class="supermarket_section_toggle">
              <Button :supermarketToggleAdd="true" v-if="!toggleStates[supermarket_uuid]"
                @click="toggleContent(supermarket_uuid)">Open</button>
              <Button :supermarketToggleClose="true" v-else @click="toggleContent(supermarket_uuid)">Close</Button>

              <SupermarketToggle :supermarket_names="[group.supermarketName]" />
            </div>
            <!-- Supermarkets logo accordion -->
            <div v-if="toggleStates[supermarket_uuid]" class="content">
              <div class="horizontal_card__shopping_list">
                <section v-for="product in group.products" :key="product.product_uuid">
                  <HorizontalCard :product="product" :isAddedToCart="true" :addToCart="addToCart"
                    :removeFromCart="removeFromCart" />
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import Button from "../components/Buttons.vue";
import Search from "../components/Search.vue";
import HorizontalCard from "../components/HorizontalCard.vue";
import SideBar from "../components/SideBar.vue";
import SupermarketToggle from "../components/SupermarketToggle.vue";
import { ProductsMixin } from '../api/endpoints/products';
import { supermarketImageHelper } from '../utils/helpers/SupermarketImageHelper';

export default {
  components: { Button, Search, HorizontalCard, SideBar, SupermarketToggle },
  mixins: [ProductsMixin, supermarketImageHelper],

  data() {
    return {
      toggleStates: {},
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
    supermarketToggleClass() {
      return {
        supermarket_toggle: true,
        "supermarket_toggle--open": this.isOpen
      };
    }
  },

  methods: {
    ...mapActions(['clearCart', 'addToCart', 'removeFromCart']),

    groupCartItemsBySupermarket() {
      console.log("Cart contents:", this.cart);

      this.groupedProducts = this.cart.reduce((groups, product) => {
        const supermarketUuid = product.supermarkets?.[0]?.supermarket_uuid;
        const supermarketName = product.supermarkets?.[0]?.supermarket_name;

        if (!groups[supermarketUuid]) {
          groups[supermarketUuid] = {
            supermarketName,
            products: [],
          };
        }

        if (groups[supermarketUuid] && this.toggleStates[supermarketUuid] === undefined) {
          this.toggleStates[supermarketUuid] = true;
        }

        groups[supermarketUuid].products.push(product);

        return groups;
      }, {});
    },
    toggleContent(supermarketUuid) {
      this.toggleStates[supermarketUuid] = !this.toggleStates[supermarketUuid];
    },
  },

  async mounted() {
    if (this.getSelectedSupermarket) {
      await this.loadProductsBySupermarket(this.getSelectedSupermarket);
      this.groupCartItemsBySupermarket();
    }
  },

  watch: {
    // Watch for changes in the list of products
    supermarketsProducts: {
      handler() {
        this.groupCartItemsBySupermarket();
      },
      deep: true
    },
    // Watch for changes in the cart
    cart: {
      handler() {
        this.groupCartItemsBySupermarket();
      },
      immediate: true,
      deep: true
    }
  }
};
</script>
