<style lang="sass">
  .magicBar {
    $border: 1px solid #cdcfdb;
    background: #eeeef2;
    width: 100%;
    font-size: 12px;
    position: relative;
    .m-box {
      background: #eeeef2;
      border-top: $border;
      display: flex;
      flex-direction: column;
      // 如果 lock 的话，这几个 css 应该去掉，因为它要在页面中占据空间
      position: absolute;
      z-index: 12;
      width: 100%;
      bottom: 28px;
      .mb-bar-title {
        background: #1d8ce0;
        padding: 1px 10px;
        color: #fff;
        display: flex;
        justify-content:space-between;
        .opratorBtns {
          width: initial;
          .o-btn {
            color: #fff;
            vertical-align: middle;
            line-height: 1;
            display:inline-block;
            text-align: center;
            width: 22px;
            &:hover {
              color: #000;
            }
            .icon-moles{
              font-size: 12px;
            }
          }
        }
      }
      .mb-options {
        padding: 1px 10px;
        .checkbox {
          display: inline-block;
          color: rgba(0, 0, 0, 0.54);
          font-size: 12px;
          border: 1px solid #cdcfdb;
          padding:0 5px;
          line-height: 16px;
          .icon-moles {
            padding-right: 2px;
          }
          &:hover,
          &.active {
            border: 1px solid #1d8ce0;  
          }
          &.error {
            .icon-moles {
              color: #e72211;
            }
          }
          &.warning {
            .icon-moles {
              color: #ffce06;
            }
          }
          &.info {
            .icon-moles {
              color: #209ae4;
            }
          }
        }
      }
      
      .mb-context{
        flex: 1;
        border-bottom: $border;
        border-top: $border;
        height: 150px;
        padding: 3px 10px;
        overflow-x: hidden;
        overflow-y: auto;
        p {
          margin: 0;
          padding: 0;
          text-align: justify;
          line-height: 1.8;
          color: rgba(0, 0, 0, 0.54);
        }
        .error{
          color: #FF4949;
        }
        .warning{
          color: #F7BA2A;
        }
      }
    }
    .statusBar {
      $menuColor: #007acd;
      padding: 3px 10px;
      .toggle-btn {
          display: inline-block;
          color: rgba(0, 0, 0, 0.54);
          &:hover {
            &:after {
              background: $menuColor;
            }
          }
          &.active,
          &:active {
            color: $menuColor;
            &:after {
              background: $menuColor;
            }
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
  }
</style>

<template>
  <div class="magicBar">
    <div class="m-box" v-show="isOpen">
      <div class="mb-header">
        <div class="mb-bar-title">
          <div class="name">输出{{ messages.length ? ' ('+ messages.length +')': '' }}</div>
          <div class="opratorBtns">
            <!--<a href="javascript:;" class="o-btn"><i class="icon-moles im-suoxiao1"></i></a>-->
            <a title="锁定显示" class="o-btn" @click="toggleLock"><i class="icon-moles" :class="{ 'im-iconfontlock': isLock, 'im-jiesuo': !isLock }"></i></a>
            <a title="关闭" class="o-btn" @click="close"><i class="icon-moles im-guanbi"></i></a>
          </div>
        </div>
        <div class="mb-options">
          <a class="checkbox clear" @click="clear"><i class="icon-moles im-yuandian"></i><span>清空</span></a>
          <a class="checkbox error"><i class="icon-moles im-cuowu"></i><span>错误 {{errorCount}}</span></a>
          <a class="checkbox warning"><i class="icon-moles im-8"></i><span>警告 {{warningCount}}</span></a>
          <a class="checkbox info"><i class="icon-moles im-unie60a"></i><span>信息 {{infoCount}}</span></a>
        </div>
      </div>
      <div class="mb-context">
        <p v-for="item in messages" :class="{ 'error': item.type === 'error', 'warning': item.type === 'warning' }">{{ item.message }}</p>
      </div>
    </div>
    <div class="statusBar">
      <mu-flexbox>
        <mu-flexbox-item class="info">
          <a class="toggle-btn" :class="{ 'active': isOpen }" @click="toggleOpen">输出{{ messages.length ? ' ('+ messages.length +')': '' }}</a>
        </mu-flexbox-item>
      </mu-flexbox>
    </div>
  </div>
</template>
<script>;
  export default {
    data() {
      return {
        errorCount: 0,
        warningCount: 0,
        infoCount: 0,
        messages: [],
        isOpen: this.open,
        isLock: this.lock
      };
    },
    props: {
      // 是否打开
      open: {
        type: Boolean,
        default: false
      },
      // 是否锁定显示
      lock: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      messages(newVal) {

      }
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
      // 写普通信息
      log(...messages) {
        this.infoCount += this.pushMessage('info', messages)
      },
      // 写错误
      error(...messages) {
        this.errorCount += this.pushMessage('error', messages)
      },
      // 写警告
      warning(...messages) {
        this.warningCount += this.pushMessage('warning', messages)
      },
      pushMessage(type, messages) {
        var messageCount = 0
        messages.forEach(function (message) {
          if (Array.isArray(message)) {
            messageCount += this.pushMessage(type, message);
            return;
          }
          let tmps = message.split('\n').map(item => { return { type: type, message: item } });
          messageCount += tmps.length;
          this.messages.push.apply(this.messages, tmps);
        }, this);
        return messageCount;
      },
      clear() {
        this.messages = [];
        this.errorCount = this.warningCount = this.infoCount = 0;
        this.$emit('clear')
      },
      toggleOpen() {
        this.isOpen = !this.isOpen
      },
      close() {
        this.isOpen = false
      },
      toggleLock() {
        this.isLock = !this.isLock
      }
    }
  }
</script>