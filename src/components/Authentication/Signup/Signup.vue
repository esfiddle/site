<template>
    <div class='sign-up'>
        <p>Let's create a new account!</p>
        <form @submit.prevent="registerUser">
          <input type="text" placeholder="Firstname" v-model="userData.firstname" /><br>
          <input type="text" placeholder="Lastname" v-model="userData.lastname" /><br>
          <input type="text" placeholder="Username" v-model="userData.username" /><br>
          <input type="email" placeholder="Email" v-model="userData.email" /><br>
          <input type="password" placeholder="Choose a password" v-model="userData.password" /><br>
          <button>Create account</button>
      </form>
        <span>or go back to <router-link to='/login'>login</router-link>.</span>
    </div>
</template>

<script>
import firebase from 'firebase';
import db from '@/firestore.js'; //eslint-disable-line

export default {
  name: 'signup',
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

input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
}

button {
    margin: 10px;
    width: 10%;
    cursor: pointer;
}

span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
}
</style>
