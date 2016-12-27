<style lang="sass" scoped>
  .nav-box {
    background: #f7f7f9;
    /*-webkit-user-select: none;
    -webkit-app-region: drag!important;*/
    .row {
      // 因为干掉了系统的标题栏，所以得让导航栏可以模拟的像标题栏一样可以拖动
      // 注意 mac os 10.12.1 中，如果打开开发者工具，则就不能拖动了，这应该是个 bug
      -webkit-user-select: none;
      -webkit-app-region: drag;
    }
    .noDrag {
      // drag 是继承属性
      -webkit-app-region: no-drag;
    }
    .navbar {
      padding-left: 59px;// mac os 的最小化/最大化按钮
      width: 100%;
      -webkit-box-align: start;
      justify-content: flex-start;
      align-items: flex-start;
      text-align: left;
      cursor: default!important;
      .nav-item {
        max-width: 128px;
        vertical-align: middle;
        height: 56px;
      }
      .nav-more {}
      .home-logo {
        margin: 0 auto;
        width: 24px;
        height: 24px;
      }
      .menus {
        background: transparent;
      }
      .nav-item {
        max-width: 100px;
      }
    }
  }
</style>

<template>
  <div class="nav-box">
    <mu-paper class="navbar">
      <mu-row gutter>
        <mu-col width="100" tablet="40" desktop="40" class="noDrag">
          <mu-bottom-nav :value="bottomNav" @change="handleChange" class="menus">
            <mu-bottom-nav-item value="home" title="首页" class="nav-item">
              <img src="../resource/logo.png" class="home-logo" />
            </mu-bottom-nav-item>
            <mu-bottom-nav-item value="task" title="任务" icon="input" class="nav-item" />
            <mu-bottom-nav-item value="build" title="编译" icon="swap_calls" class="nav-item" />
            <mu-bottom-nav-item value="compress" title="压缩" icon="text_fields" class="nav-item" />
            <mu-bottom-nav-item value="plugs" title="插件" icon="list" class="nav-item" />
          </mu-bottom-nav>
        </mu-col>
        <mu-col width="100" tablet="20" desktop="20">
        </mu-col>
        <mu-col width="100" tablet="28" desktop="28">
          <mu-text-field icon="search" hintText="搜索插件" class="noDrag" />
          <mu-icon-menu icon="more_vert" :anchorOrigin="{ horizontal: 'right', vertical: 'top'}" :targetOrigin="{horizontal: 'left', vertical: 'top'}"
            class="nav-more noDrag" style="vertical-align:middle;">
            <mu-menu-item title="Refresh" />
            <mu-menu-item title="Send feedback" />
            <mu-menu-item title="Settings" />
            <mu-menu-item title="Help" />
            <mu-menu-item title="Sign out" />
          </mu-icon-menu>
        </mu-col>
      </mu-row>
    </mu-paper>
  </div>
</template>
<script>
export default {
  data () {
    return {
      bottomNav: 'home'
    }
  },
  components: {
  },
  events: {
    
  },
  updated () {
    
  },
  mounted () {
    
  },
  methods: {
    handleChange (value, item) {
      this.bottomNav = value;
      
      if (value) {
        this.$emit('change', value);
      }
      this.$emit('itemClick', item);
    }
  }
}
</script>