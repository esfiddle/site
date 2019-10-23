<template>
  <div>
      <button class='button'>{{ buttonText }}</button>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    buttonText: String,
  },
};
</script>

<style>
.button {
  text-transform: uppercase;
  outline: 0;
  background: #4CAF50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
}

button:hover,button:active,button:focus {
  background: #43A047;
}

.header__user .button {
  padding: 0 20px;
}

.header__user button:hover,button:active,button:focus {
  background: #43A047;
}

/* .button__social .button {
  width: 75px;
  background: #fff;
  padding: 10px;
  border-radius: 100%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  outline: 0;
  border: 0;
} */

.button-light {

}

.button-dark {

}

</style>
