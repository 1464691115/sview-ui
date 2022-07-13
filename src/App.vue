<template>
  <!-- <s-overlay v-model="show" /> -->
  <s-input
    v-model="val"
    placeholder="请输入"
    text-append=".com"
    text-prepend="https://"
    @change="handleChange"
  >
    <!-- <template v-slot:></template> -->
  </s-input>
  <!-- <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
</template>

<script setup lang="ts">
import { ref } from "vue";

// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
const show = ref(true);
const val = ref("");
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
</style>
