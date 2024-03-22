<template>
  <div class="cardContainer">
    <div class="imageButton">
      <img src="" alt="" />
      <button @click="add"></button>
    </div>
    <div class="text">
      <p></p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    add() {
      console.log("add product");
    },
  },
};
</script>
