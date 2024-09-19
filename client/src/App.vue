<template>
  <div class="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Inter", sans-serif;
}

body {
  background-color: #f7f9fd;
}

.app {
  width: 90%;
  max-width: 992px;
  margin: auto;
}
</style>