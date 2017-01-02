<style lang="sass">
  .menus {
    width: 160px;
    height: 100%;
    // border-right: 1px solid #a8d7fa;
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
      border-radius: 0;
      color: rgba(0, 0, 0, 0.54);
      width: 100%;
      height: 60px;
      .mu-flat-button-wrapper {
        justify-content: flex-start;
        padding-left: 10px;
      }
      &.active {
        background-color: rgba(204,204,206,.87);
      }
    }
  }
</style>

<template>
  <div class="menus">
    <ul class="list">
      <li>
        <mu-flat-button label="快速压缩" class="menu-item" label-class="text" icon="directions" :class="{ active : actionName === 'quickCompress' }" @click="toQuickCompress" />
      </li>
      <li>
        <mu-flat-button label="快速编译" class="menu-item" label-class="text" icon="cached" :class="{ active : actionName === 'quickCompile' }" @click="toQuickCompile" />
      </li>
      <li>
        <mu-flat-button label="代码格式化" class="menu-item" label-class="text" icon="text_fields" :class="{ active : actionName === 'format' }" @click="toFormat" />
      </li>
      <li>
        <mu-flat-button label="图片Base64" class="menu-item" label-class="text" icon="image" :class="{ active : actionName === 'imageBase64' }" @click="toImageBase64" />
      </li>
      <li>
        <mu-flat-button label="图片压缩" class="menu-item" label-class="text" icon="camera_front" :class="{ active : actionName === 'imageCompress' }" @click="toImageCompress" />
      </li>
    </ul>
  </div>
</template>
<script>;
export default {
  data () {
    return {
      actionName: 'quickCompress'
    };
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
    toQuickCompress () {
      this.actionName = 'quickCompress';
    },
    toQuickCompile () {
      this.actionName = 'quickCompile';
    },
    toFormat () {
      this.actionName = 'format';
    },
    toImageBase64 () {
      this.actionName = 'imageBase64';
    },
    toImageCompress () {
      this.actionName = 'imageCompress';
    },
  }
}
</script>