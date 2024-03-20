<template>
  <button class="button-xl" v-if="includeGoBack" @click="goBack">Go Back</button>
  <button v-if="includeRestart" @click="restart">Restart</button>
</template>

<script>
export default {
  props: {
    includeGoBack: {
      type: Boolean,
      default: false,
    },
    includeRestart: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    goBack() {
      console.log("back");
    },
    restart() {
      console.log("restart");
    },
  },
};
</script>
