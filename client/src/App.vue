<template>
  <div id="app">
    <calendar is-expanded :columns="$screens({ lg: 4, md: 2 }, 1)" :rows="$screens({ lg: 3, md: 6 }, 12)"></calendar>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
