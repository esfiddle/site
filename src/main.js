import { createApp, h } from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

import './index.css';


const app = '';

firebase.auth().onAuthStateChanged((user) => { // eslint-disable-line no-unused-vars
  if (!app) {
    createApp({
      firebase,
      render: () => h(App),
    }).use(router).use(store).mount('#app');
  }
});
