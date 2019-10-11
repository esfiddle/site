<template>
    <div class='sign-up'>
        <h1>Let's create a new account!</h1>
        <form @submit.prevent='registerUser'>
          <input type='text' placeholder='Firstname' v-model='userData.firstname' /><br>
          <input type='text' placeholder='Lastname' v-model='userData.lastname' /><br>
          <input type='text' placeholder='Username' v-model='userData.username' /><br>
          <input type='email' placeholder='Email' v-model='userData.email' /><br>
          <input type='password' placeholder='Choose a password' v-model='userData.password' /><br>
          <Button buttonText='Create account' />
        </form>
        <p class='message'>or go back to <router-link to='/login'>login</router-link>.</p>
    </div>
</template>

<script>
import firebase from 'firebase';
import db from '@/firestore.js'; //eslint-disable-line
import Button from '@/components/Button/Button.vue';

export default {
  name: 'signup',
  components: {
    Button,
  },
  data() {
    return {
      userData: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
      },
      successMessage: 'Sign up succeeded.',
      errorMessage: 'Sign up failed.',
    };
  },
  methods: {
    registerUser() {
      firebase.auth().createUserWithEmailAndPassword(this.userData.email, this.userData.password)
        .then(() => {
          firebase.auth().currentUser.updateProfile({
            displayName: this.userData.username,
          })
            .then(() => {
              db.collection('users').add({
                firstname: this.userData.firstname,
                lastname: this.userData.lastname,
                username: this.userData.username,
                email: this.userData.email,
              })
                .then(() => {
                  this.$router.replace('home');
                })
                .catch((err) => {
                  this.errorMessage = err.message;
                });
            })
            .catch((err) => {
              this.errorMessage = err.message;
            });
        })
        .catch((err) => {
          this.errorMessage = err.message;
        });
    },
  },
};
</script>

<style scoped>
.sign-up {
    margin-top: 80px;
}

h1 {
  margin-bottom: 1em;
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
