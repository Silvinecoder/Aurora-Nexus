<template>
  <div class="card">
    <div class="card__image_button_container">
      <img src="https://www.continente.pt/dw/image/v2/BDVS_PRD/on/demandware.static/-/Sites-col-master-catalog/default/dwbfeadb62/images/col/715/7157937-frente.jpg" alt="" />
      <button class="standard_icon" @click="toggleIcon">
        <svg v-if="showAddIcon">
          <use xlink:href="../assets/icons/standard/minus.svg#minus__icon"></use>
        </svg>
        <svg v-else>
          <use xlink:href="../assets/icons/standard/add.svg#add__icon"></use>
        </svg>
      </button>
    </div>
    <div class="card__title">
      <p>Pão de queijo com sementes</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showAddIcon: true
    };
  },
  methods: {
    toggleIcon() {
      this.showAddIcon = !this.showAddIcon;
    }
  }
};
</script>