<style lang="sass">
  .menus {
    width: 190px;
    height: 100%;
    border-right: 1px solid #a8d7fa;
    background: #f7f7f9;
    .list {
      height: 100%;
      padding: 0;
      margin: 0;
      .text {
        text-align: left;
      }
    }
    .menu-item {
      color: rgba(0, 0, 0, 0.54);
      width: 100%;
      height: 60px;
      .mu-flat-button-wrapper {
        justify-content: flex-start;
        padding-left: 10px;
      }
    }
  }
</style>

<template>
  <div class="menus">
    <ul class="list">
      <li>
        <mu-flat-button label="快速压缩" class="menu-item" label-class="text" icon="directions" />
      </li>
      <li>
        <mu-flat-button label="快速编译" class="menu-item" label-class="text" icon="cached" />
      </li>
      <li>
        <mu-flat-button label="JSON格式化" class="menu-item" label-class="text" icon="text_fields" />
      </li>
    </ul>
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