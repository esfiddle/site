<template>
  <div class="hello">
    <div>
      <section class='header-change-dark'><Hero /></section>
      <section class='header-change-light landing__fiddle-section'>
        <div class='landing__fiddle-section__header-row'>
          <h1>Popular Examples</h1>
          <router-link to='/examples'>See All</router-link>
        </div>
      </section>
      <section class='header-change-light landing__fiddle-section'>
        <div class='landing__fiddle-section__header-row'>
          <h1>Cool Fiddles</h1>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Hero from './Hero/Hero.vue';

export default {
  name: 'Landing',
  components: {
    Hero,
  },
};
</script>

<style scoped>
.landing__fiddle-section {
  display: block;
  box-sizing: border-box;
  position: relative;
  padding: 40px 0;
}
.landing__fiddle-section:nth-child(2n + 1) {
  background: #f5f5f5;
}

.landing__fiddle-section__header-row {
  padding: 0 40px;
  display: flex;
  align-items: center;
}
.landing__fiddle-section__header-row > h1 {
  flex: 1 1 auto;
  font-size: 3em;
  font-weight: normal;
  margin: 0;
  color: var(--medium-2);
}
.landing__fiddle-section__header-row > a {
  color: var(--medium-1);
  text-decoration: inherit;
  position: relative;
}
.landing__fiddle-section__header-row > a::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  border-bottom: 1px dashed currentColor;
}
</style>
