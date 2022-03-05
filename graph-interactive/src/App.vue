<template>
  <MainPage />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainPage from './components/MainPage.vue';

export default defineComponent({
  name: "App",
  components: {
    MainPage,
  },
  setup() {

  }
});
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #DDDDDD;
}
</style>