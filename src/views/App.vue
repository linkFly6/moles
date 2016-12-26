<style>

</style>

<template>

  <div id="app">
    <router-link to="/home">Go to Home</router-link>
    <router-link to="/">Go to /</router-link>
    <router-link to="/test">Go to test</router-link>
    <router-view></router-view>
  </div>

</template>
<script>
export default {
  data () {
    return {
    }
  },
  components: {
  },
  ready: function () {

  },
  events: {
  },
  methods: {
  }
}
</script>