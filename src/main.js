import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

import './index.css';


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  firebase,
  render: h => h(App),
}).$mount('#app');
