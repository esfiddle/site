<template>
  <div class="home">
    <Landing />
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import Landing from '@/components/Landing/Landing.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Landing,
  },
};
</script>
