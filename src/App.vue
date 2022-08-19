<template>
  <!-- <s-overlay v-model="show" /> -->
  <s-input
    v-model="val"
    :custom-props="{
      placeholder: '请输入',
      textAppend: '.com',
      textPrepend: 'https://',
      inputBorder: true,
    }"
    @change="handleChange"
  >
  </s-input>

  <!-- <s-button
    :custom-props="{ text: '测试2', plain: false, type: 'primary', shape: 'square' }"
  /> -->

  <!-- <s-checkbox-group
    v-model="val"
    :custom-props="{
      checkOptions: [
        { name: 'test1', label: '选项' },
        { name: 'test2', label: '选项' },
        { name: 'test3', label: '选项' },
        { name: 'test4', label: '选项' },
      ],
    }"
  >
  </s-checkbox-group> -->
  <!-- <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
</template>

<script setup lang="ts">
import { ref } from "vue";

// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
const show = ref(true);
const val = ref();
function handleChange(e) {
  console.log(val.value);
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

* {
  box-sizing: border-box;
}
</style>
