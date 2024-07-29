<template>
    <router-view></router-view>

    <Footer />
</template>

<script>
import Footer from './pages/Footer.vue';

export default {
  components: {
    Footer
  }
}
</script>
