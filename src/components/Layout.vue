<style lang="sass">
  #layout {
    height: 100%;
    width: 100%;
    display: flex;
    .view {
      overflow-x: hidden;
      overflow-y: auto;
      position: relative;
    }
    .main {
      width: 100%;
      flex: 1;
    }
  }
</style>

<template>
  <div id="layout">
    <div class="view menu">
      <router-view class="menus" name="menu"></router-view>
    </div>
    <section class="view main">
      <router-view class="content" name="content"></router-view>
    </section>
  </div>
</template>
<script>;
  export default {
    data() {
      return {};
    },
    components: {
    },
    events: {
    },
    mounted() {

    },
    updated() {

    },
    methods: {
    }
  }
</script>