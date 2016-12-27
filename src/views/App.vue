<style>
  html,
  body {
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
  
  #app {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  #nav {
    z-index: 66;
  }
  
  #content {
    flex: 1;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
  }
</style>

<template>
  <div id="app">
    <nav id="nav">
      <navigator></navigator>
    </nav>
    <section id="content">
      <router-view></router-view>
    </section>
  </div>

</template>
<script>
import Navigator from '../components/Navigator'
export default {
  data () {
    return {
    }
  },
  components: {
    Navigator
  },
  mounted: function () {

  },
  events: {
  },
  methods: {
  }
}
</script>