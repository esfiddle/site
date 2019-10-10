<template>
  <div v-bind:class='[`blog blog-${themeState}`]'>
    <h1>Blog</h1>

  </div>
</template>

<script>

export default {
  name: 'Blog',
  computed: {
    themeState() {
      return this.$store.state.theme;
    },
  },
};
</script>

<style scoped>
.blog {
  background: #fff;
  padding: 60px;
}

.blog-dark {
  background: var(--dark);
  color: #fff;
}
</style>
