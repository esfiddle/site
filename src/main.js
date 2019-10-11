import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

import './index.css';


Vue.config.productionTip = false;

let app = '';

firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    new Vue({
      router,
      store,
      firebase,
      render: h => h(App),
    }).$mount('#app')
  }
});
