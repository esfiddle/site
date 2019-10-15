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

.button-light {

}

.button-dark {

}

</style>
