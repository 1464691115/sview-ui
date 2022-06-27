<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs

import { ref } from "vue";

// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
const show = ref(true);
</script>

<template>
  <s-overlay v-model="show" />
  <!-- <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
</template>

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
