<template>
  <div></div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({});
</script>

<style scoped>
/*Default styles are for the white theme*/
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
  /*background-image: url(@/assets/logo.png);*/
  background-size: 214px 62px;
  width: 214px;
  height: 31px;
  position: relative;
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
