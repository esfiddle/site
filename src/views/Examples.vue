<template>
  <div v-bind:class='[`examples examples-${themeState}`]'>
    <h1>Examples</h1>
  </div>
</template>

<script>
import store from '@/store.js'; // eslint-disable-line

export default {
  name: 'Examples',
  computed: {
    themeState() {
      return this.$store.state.theme;
    },
  },
};
</script>

<style scoped>
.examples {
  background: #fff;
  padding: 60px;
}

.examples-dark {
  background: var(--dark);
  color: #fff;
}
</style>
