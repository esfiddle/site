import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    theme: '',
  },
  mutations: {
    currentTheme(state, theme) {
      !theme ? state.theme = 'light' : state.theme = 'dark';
    },
  },
  getter: {
    theme: state => state.theme,
  },
  actions: {

  },
});
