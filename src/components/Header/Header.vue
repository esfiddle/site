<!-- eslint-disable max-len -->
<template>
  <div v-bind:class='[`header header-${themeState}`]'>
    <div class='header__box'>
      <!-- <SearchBox /> -->
      <!-- Theme switcher adapted from https://codepen.io/michellebarker/pen/GzzrGJ -->
      <input type='checkbox' id='themeSwitch' name='theme-switch' class='theme-switch__input' @change='switchTheme' />
      <label for='themeSwitch' class='theme-switch__label'>
        <span>Switch theme</span>
      </label>
    </div>
    <div class='header__box'>
      <router-link to='/home'>
        <div v-bind:class='[`header__logo header__logo-${themeState}`]' />
      </router-link>
    </div>
    <div class='header__box header__navigation'>
      <router-link to='/examples'>Examples</router-link>
      <router-link to='/editor'>Editor</router-link>
      <router-link to='/about'>About</router-link>
      <router-link to='/blog'>Blog</router-link>
      <a @click.prevent.stop="logout">Logout</a>
      <LoginButton class='header__user' />
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import store from '@/store.js'; // eslint-disable-line
import LoginButton from '@/components/Authentication/Login/LoginButton/LoginButton.vue';

export default {
  name: 'Header',
  components: {
    LoginButton,
  },
  computed: {
    themeState() {
      return this.$store.state.theme;
    },
  },
  methods: {
    switchTheme(event) {
      this.$store.commit('currentTheme', event.target.checked);
    },
    logout() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login');
      });
    },
  },
};
</script>

<style scoped>
/*Default styles are for the light theme*/
.header {
  z-index: 9999;
  display: flex;
  height: 60px;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transition: 200ms background ease, 200ms border ease, 200ms color ease;
}
.header__box {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header__box:first-child {
  justify-content: flex-start;
}
.header__box:last-child {
  justify-content: flex-end;
}

/* Theme Switcher */
 /* Toggle switch */
.theme-switch__label {
  background: var(--bg, white);
  color: var(--text, black);
}

.wrapper {
  max-width: 700px;
  margin: 0 auto;
}

.theme-switch__input:checked ~ main,
.theme-switch__input:checked ~ label {
  --text: white;
}

.theme-switch__input:checked ~ main {
  --gradDark: hsl(198, 44%, 11%);
  --gradLight: hsl(198, 39%, 29%);
}

.theme-switch__input,
.theme-switch__label {
  position: absolute;
  z-index: 1;
}

.theme-switch__input {
  opacity: 0;
}

.theme-switch__input:hover + .theme-switch__label,
.theme-switch__input:focus + .theme-switch__label {
  background-color: lightSlateGray;
}

.theme-switch__input:hover + .theme-switch__label span::after,
.theme-switch__input:focus + .theme-switch__label span::after {
  background-color: #d4ebf2;
}

.theme-switch__label {
  padding: 20px;
  margin: 50px;
  transition: background-color 200ms ease-in-out;
  width: 100px;
  height: 50px;
  border-radius: 50px;
  text-align: center;
  background-color: slateGray;
  box-shadow: -4px 4px 15px inset rgba(0, 0, 0, 0.4);
}

.theme-switch__label::before, .theme-switch__label::after {
  font-size: 2rem;
  position: absolute;
  transform: translate3d(0, -50%, 0);
  top: 50%;
}

.theme-switch__label::before {
  content: '\263C';
  right: 100%;
  margin-right: 10px;
  color: orange;
}

.theme-switch__label::after {
  content: '\263E';
  left: 100%;
  margin-left: 10px;
  color: lightSlateGray;
}

.theme-switch__label span {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 0;
  width: 100%;
}

.theme-switch__label span::after {
  position: absolute;
  top: calc(100% + 15px);
  left: 5px;
  width: 40px;
  height: 40px;
  content: '';
  border-radius: 50%;
  background-color: lightBlue;
  transition: transform 200ms, background-color 200ms;
  box-shadow: -3px 3px 8px rgba(0, 0, 0, 0.4);
}

.theme-switch__input:checked ~ .theme-switch__label {
  background-color: lightSlateGray;
}
.theme-switch__input:checked ~ .theme-switch__label::before {
  color: lightSlateGray;
}
.theme-switch__input:checked ~ .theme-switch__label::after {
  color: turquoise;
}
.theme-switch__input:checked ~ .theme-switch__label span::after {
  transform: translate3d(50px, 0, 0);
}

/* Search box */
.header__search {
  position: relative;
  padding-left: 12px;
}
.header__search > input {
  box-sizing: border-box;
  font: inherit;
  width: 280px;
  padding: 8px;
  padding-right: 32px;
  background: #f3f3f3;
  border-radius: 3px;
  border: 1px solid transparent;
  transition: 200ms all ease;
}
.header__search > input::placeholder {
  color: inherit;
}
.header__search > .material-icons {
  position: absolute;
  top: 8px;
  right: 4px;
  pointer-events: none;
}

/* Logo */
.header__logo {
  background-image: url(../../assets/logo.png);
  background-size: 214px 62px;
  width: 214px;
  height: 31px;
  position: relative;
}

.header__logo-dark {
  background-position: 0px -31px;
}

/* Navigation Links */
.header__navigation {
  padding-right: 4px;
  align-items: stretch;
}
.header__navigation > * {
  display: block;
  padding: 16px;
  color: inherit;
  text-decoration: none;
  font-size: 18px;
  position: relative;
  opacity: 1;
  transition: 200ms background ease;
  line-height: 28px;
}
.header__navigation .active {
  background: rgba(0, 0, 0, 0.03);
  pointer-events: none;
}

/* Dark theme */

.header.header-dark {
  background: var(--dark);
  border-color: rgba(255, 255, 255, 0.3);
  color: white;
}

/* Search box */
.header.header-dark .header__search > input {
  background: transparent;
  border-color: white;
  color: white;
}

/* Logo */
.header__logo::after {
  content: '';
  width: 100%;
  height: 100%;
  /*background-image: url(@/assets/logo.png);*/
  background-size: 214px 62px;
  background-position: 0 -31px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: 200ms opacity ease;
}
.header.header-dark .header__logo::after {
  opacity: 1;
}

/* Navigation Links */
.header.header-dark .header__navigation .active {
  background: rgba(0, 0, 0, 0.2);
}
</style>
