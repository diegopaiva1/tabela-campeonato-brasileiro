<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light">
    <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
      <a href="/">
        <img :src="logo" width="100px" :alt="title">
      </a>
    </div>
    <div class="mx-auto">
      <div class="navbar-brand mx-auto">{{ title }}</div>
    </div>
    <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
    </div>
  </nav>
</template>

<script>
  export default {
    props: ['logo', 'title']
  }
</script>

<style>
  .navbar {
    margin-bottom: 1em;
  }
  .navbar-brand.mx-auto {
    font-size: 175%;
    font-weight: bold;
    font-family: Merriweather, serif;
  }
</style>
