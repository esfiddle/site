<template>
  <div class="profile">
    <h1>Profile</h1>
    <a @click.prevent.stop="logout">Logout</a>
  </div>
</template>

<script>
import firebase from 'firebase';
import store from '@/store.js'; // eslint-disable-line

export default {
  name: 'Profile',
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        store.commit('setAuthorization', false);
        this.$router.replace('home');
      });
    },
  },
};
</script>

<style>
.profile {
  margin-top: 80px;
}
</style>
