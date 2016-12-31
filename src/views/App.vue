<style>
  html,
  body {
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
    a { cursor:pointer; }

  /* 设置滚动条的样式 */
    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
      background-color:#f5f5f5;
    }
    /* 滚动条滑块 */
    ::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: rgba(0,0,0,0.1);
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
    overflow: hidden;
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