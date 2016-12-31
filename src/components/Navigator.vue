<style lang="sass">
  $navHeight: 80px;
  $navFontColor: rgba(255, 255, 255, .7);
  .nav-box {
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
      border-radius:0;
      background: rgba(29, 140, 224, 8);
      padding-left: 2rem;
      width: 100%;
      -webkit-box-align: start;
      justify-content: flex-start;
      align-items: flex-start;
      text-align: left;
      cursor: default!important;
      .nav-more {
        height: $navHeight;
        .windowBtns {
            text-align:right;
            .btn {
                display:inline-block;
                color:rgba(255, 255, 255, 0.7);
                height: 30px;
                line-height: 30px;
                width: 46px;
                text-align: center;
                margin-left: -6px;
                transition:background-color linear .2s;
                &:hover {
                  background-color:rgba(0, 0, 0, 0.1);
                  color:#fff;
                }
                &:active { 
                  background-color:rgba(0, 0, 0, 0.3);
                  color:#fff;
                }
            }
            .min { 

            }
            .close { 
                &:hover {
                    background-color:rgba(232, 17, 35, 1);
                }
                &:active { 
                    background-color:rgba(232, 17, 35, .7);
                }
            }
        }
      }
      .home-logo {
        margin: $navHeight/2 auto 0;
        width: 90px;
        display: block;
      }
      .menus {
        background: transparent;
      }
      .nav-item {
        &.logo-item {
          width: 75px;
        }
        height: $navHeight;
        vertical-align: middle;
        .nav-btn {
          height: 100%;
          width: 100%;
          line-height: 100%;
          padding-top: 10px;
          /*color: rgba(0, 0, 0, .54);*/
          color: $navFontColor;
          .icon-moles {
            font-size: 30px;
            line-height: 40px;
            display: block;
          }
          &.active {
            background-color: rgba(0, 0, 0, 0.1);
            color: rgba(245, 222, 179, .9);
          }
        }
        .mu-flat-button-wrapper {
          display: block;
        }
      }
    }
  }
</style>

<template>
  <div class="nav-box">
    <mu-paper class="navbar">
      <mu-row gutter>
        <mu-col width="100" tablet="55" desktop="55" class="noDrag">
          <mu-flexbox :gutter="0" justify="flex-start">
            <mu-flexbox-item class="nav-item logo-item">
              <img src="../resource/logo-text.png" class="home-logo" />
            </mu-flexbox-item>
            <mu-flexbox-item class="nav-item">
              <mu-flat-button label="首页" class="nav-btn" :class="{ active : actionName === 'home' }" @click="toHome">
                <i class="icon-moles im-shouye"></i>
              </mu-flat-button>
            </mu-flexbox-item>
            <mu-flexbox-item class="nav-item">
              <mu-flat-button label="任务" class="nav-btn" :class="{ active : actionName === 'task' }" @click="toTask">
                <i class="icon-moles im-renwu2"></i>
              </mu-flat-button>
            </mu-flexbox-item>
            <mu-flexbox-item class="nav-item">
              <mu-flat-button label="编译" class="nav-btn" :class="{ active : actionName === 'build' }" @click="toBuild">
                <i class="icon-moles im-guizezujian"></i>
              </mu-flat-button>
            </mu-flexbox-item>
            <mu-flexbox-item class="nav-item">
              <mu-flat-button label="压缩" class="nav-btn" :class="{ active : actionName === 'compress' }" @click="toCompress">
                <i class="icon-moles im-shousuo"></i>
              </mu-flat-button>
            </mu-flexbox-item>
            <mu-flexbox-item class="nav-item">
              <mu-flat-button label="插件" class="nav-btn" :class="{ active : actionName === 'plugs' }" @click="toPlugs">
                <i class="icon-moles im-moxingzujian"></i>
              </mu-flat-button>
            </mu-flexbox-item>
          </mu-flexbox>
          <!--<mu-bottom-nav :value="bottomNav" @change="handleChange" class="menus">
            <mu-bottom-nav-item value="home" title="首页" class="nav-item">
              <img src="../resource/logo.png" class="home-logo" />
            </mu-bottom-nav-item>
            <mu-bottom-nav-item value="task" title="任务" icon="input" class="nav-item" />
            <mu-bottom-nav-item value="build" title="编译" icon="swap_calls" class="nav-item" />
            <mu-bottom-nav-item value="compress" title="压缩" icon="text_fields" class="nav-item" />
            <mu-bottom-nav-item value="plugs" title="插件" icon="list" class="nav-item" />
          </mu-bottom-nav>-->
        </mu-col>
        <mu-col width="100" tablet="10" desktop="10">
        </mu-col>
        <mu-col width="100" tablet="28" desktop="28" class="nav-more">
          <div class="windowBtns">
             <a class="btn min noDrag" @click="minWindow"><i class="icon-moles im-suoxiao1"></i></a>
             <a class="btn close noDrag" @click="closeWindow"><i class="icon-moles im-guanbi"></i></a>
          </div>
          <mu-text-field icon="search" hintText="搜索插件" class="noDrag" />
          <mu-icon-menu icon="more_vert" :anchorOrigin="{ horizontal: 'right', vertical: 'top'}" :targetOrigin="{horizontal: 'left', vertical: 'top'}"
            class="noDrag" style="vertical-align:middle;">
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
import { ipcRenderer } from 'electron'
export default {
  data () {
    return {
      actionName: 'home'
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
    minWindow () {
        ipcRenderer.send('window-hide-window');
    },
    closeWindow () {
        ipcRenderer.send('window-close-window');
    },
    toHome () {
      this.actionName = 'home';
      this.$router.push('/');
    },
    toTask () {
      this.actionName = 'task';
    },
    toBuild () {
      this.actionName = 'build';
    },
    toCompress () {
      this.actionName = 'compress';
      // this.$router.push({ name: 'compressQuick' });
      this.$router.push('/compress/quick');
    },
    toPlugs () {
      this.actionName = 'plugs';
    }
  }
}
</script>