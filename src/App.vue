<template>
  <div id="app">
    <Navigation />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
  import Navigation from './components/Navigation.vue';

  export default {
    components: {
      Navigation
    },
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #nav {
    padding: 30px;
  }
  h2 {
    margin: 15px 0;
  }
  .loading-img {
    width: 350px;
    height: 350px;
  }
  .fade-enter-active {
    animation: fade-in 300ms ease-out forwards;
  }
  .fade-leave-active {
    animation: fade-out 300ms ease-out forwards;
  }
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
</style>
