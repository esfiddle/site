<template>
  <div class='login'>
    <div>Log In</div>
    <form @submit.prevent="login">
      <input type="email" placeholder="Email" v-model="email" /><br>
      <input type="password" placeholder="Password" v-model="password" /><br>
      <Button @click='login' buttonText='Login' />
    </form>
    <p class='message'>Or <router-link to='/signup'>Sign Up</router-link></p>
  </div>
</template>

<script>
import router from '@/router.js'; // eslint-disable-line
import firebase from 'firebase'; // eslint-disable-line
import db from '@/firestore.js'; // eslint-disable-line
import Button from '@/components/Button/Button.vue';

export default {
  name: 'Login',
  components: {
    Button,
  },
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

form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}

form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}

form .message a {
  color: #4CAF50;
  text-decoration: none;
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
