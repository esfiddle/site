<template>
  <div class='login'>
    <div>Log In</div>
    <form @submit.prevent="login">
      <input type="email" placeholder="Email" v-model="email" /><br>
      <input type="password" placeholder="Password" v-model="password" /><br>
      <button>Login</button>
    </form>
    <button @click='login'>Log In</button>
    <p>Or <router-link to='/signup'>Sign Up</router-link></p>
  </div>
</template>

<script>
import router from '@/router.js'; // eslint-disable-line
import firebase from 'firebase'; // eslint-disable-line
import db from "@/firestore.js"; // eslint-disable-line

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      successMessage: 'Log in succeeded.',
      errorMessage: 'Log in failed.',
    };
  },
  methods: {
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          console.log(user);
        })
        .catch((err) => {
          this.errorMessage = err.message;
        });
    },
  },
};
</script>

<style scoped>
.login {
    margin-top: 80px;
}

input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
}

button {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
}

p {
    margin-top: 40px;
    font-size: 13px;
}

p a {
    text-decoration: underline;
    cursor: pointer;
}
</style>
