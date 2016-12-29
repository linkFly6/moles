<style lang="sass" scoped>
  .quick-compress {
    position: relative;
    height: 100%;
  }
  
  .statusBar {
    background: #eeeef2;
    position: absolute;
    bottom: 0px;
    width: 100%;
    font-size: 12px;
    padding: 3px 10px;
    .toggle-btn {
      display: inline-block;
      color: rgba(0, 0, 0, 0.54);
      &:hover {
        color: rgba(0, 0, 0, 0.8);
      }
      &:after {
        display: block;
        content: '';
        background: #cbceda;
        height: 4px;
        width: 100%;
      }
    }
  }
</style>

<template>
  <div class="quick-compress">
    <div>
      <mu-icon-button icon="android" />
    </div>
    <div class="statusBar">
      <mu-flexbox>
        <mu-flexbox-item class="info">
          <a class="toggle-btn">信息</a>
        </mu-flexbox-item>
      </mu-flexbox>
    </div>
  </div>
</template>
<script>;
export default {
  data () {
    return {};
  },
  components: {
  },
  events: {
  },
  mounted () {

  },
  updated () {

  },
  methods: {
  }
}
</script>