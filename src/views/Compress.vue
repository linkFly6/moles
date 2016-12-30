<style lang="sass">
  .quick-compress {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    .box{
      flex: 1;
    }
  }
  
  .magicBar {
    $border: 1px solid #cdcfdb;
    background: #eeeef2;
    width: 100%;
    font-size: 12px;
    .m-box {
      border-top: $border;
      display: flex;
      flex-direction: column;
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
        max-height: 150px;
        padding: 3px 10px;
        overflow-x: hidden;
        overflow-y: scroll;
        p {
          margin: 0;
          padding: 0;
          text-align: justify;
          line-height: 1.8;
          color: #F7BA2A;
        }
        .error{
          color: #FF4949;
        }
        .warning{
          color: rgba(0, 0, 0, 0.54);
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
  <div class="quick-compress">
    <div class="box">
      <mu-icon-button icon="android" />
    </div>
    <div class="magicBar">
      <div class="m-box">
        <div class="mb-header">
          <div class="mb-bar-title">
            <div class="name">输出</div>
            <div class="opratorBtns">
              <a href="javascript:;" class="o-btn"><i class="icon-moles im-suoxiao1"></i></a>
              <a href="javascript:;" class="o-btn"><i class="icon-moles im-iconfontlock im-jiesuo"></i></a>
              <a href="javascript:;" class="o-btn"><i class="icon-moles im-guanbi"></i></a>
            </div>
          </div>
          <div class="mb-options">
            <a href="javascript:;" class="checkbox error"><i class="icon-moles im-cuowu"></i><span>错误 0</span></a>
            <a href="javascript:;" class="checkbox warning"><i class="icon-moles im-8"></i><span>警告 0</span></a>
            <a href="javascript:;" class="checkbox info"><i class="icon-moles im-unie60a"></i><span>信息 0</span></a>
          </div>
        </div>
        <div class="mb-context">
          <p class="error">这是错误信息</p>
          <p class="warning">先阶段主要的学习目标是机器学习。自己在学的同时，也选修了学校的数据挖掘课。到现在也接触到了查不多一半的算法了。给我的感受就是，光学算法实在是没意思。机器学习就是用来用的。所以刚刚开始学习的园友可以结合一些工具来学习，一开始不用急着学例如python这样的语言。可以学着使用matlab和WEKA这样的工具，把重点放在算法本身和训练数据上。至于编程的工作可以放到以后。
            下面推荐一些机器学习的视频和书籍，有些自己已经看完了，有的还没有。其实干货知乎上一搜一大把，机器学习该怎么入门？，可是给我的感觉，资料太多眼花缭乱。所以我就把我现在看到过的列了出来。
          </p>
          <p>Do you use VS Code on multiple machines and wish you could easily share settings? Even using VS Code in a VM on
            the same machine will make it so your settings, snippets, etc. aren't the same. This extension solves this synchronization
            problem and is one of the highest rated in the Marketplace. The extension uses a private Gist on GitHub to share
            your VS Code settings, snippets, keybindings, etc across different machines. You can also make the Gist public
            to share your settings with others.</p>
        </div>
      </div>
      <div class="statusBar">
        <mu-flexbox>
          <mu-flexbox-item class="info">
            <a class="toggle-btn" href="javascript:;">输出</a>
          </mu-flexbox-item>
        </mu-flexbox>
      </div>
    </div>
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