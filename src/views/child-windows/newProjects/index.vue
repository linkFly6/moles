<style lang="sass">
  html,body {
    height: 100%;
    overflow: hidden;
  }
  .newProjects {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 3rem;
    ul, li { 
      list-style: none; 
      margin: 0;
      padding: 0;
    }
    .projects {
      flex: 1;
      li {
        display: flex;
        align-items: center;
        padding: 1rem;
        cursor: pointer;
        transition: all linear .2s;
        &:hover {
          background: #f3f4f5;
        }
        &:active, &.active {
          background: #1d8ce0;
          .select-box, .des, .ico {
            color: rgba(255, 255, 255, 0.7)!important; 
          }
        }
      }
    
      .options-box {
        flex: 1;
      }
      .select-box {
          color: #666;
      }
      
      .ico {
        width: 4.6rem;
      }
      .title {
        font-size: 1.4rem;
      }
      .icon-moles {
        font-size: 3rem;
        font-weight: bold;
        vertical-align: middle;
      }
      .tag {
        font-size: 12px;
        max-width: 70px;
        text-align: right;
      }
      .des {
        padding: 10px 0;
        font-size: 12px;
        color: #bababa;
        line-height: 1rem;
        text-align: left;
        text-align: justify;
      }
    }
    .btnBar {
      padding: 1rem;
      border-top: 1px solid #ebebeb;
      text-align: center;
    }
  }
</style>
<template>
  <div class="newProjects">
    <ul class="projects">
      <li :class="{ active: selectedIndex == 0 }" @click="select(0)">
        <div class="ico" style="color: #cf4646;">
<i class="icon-moles im-Fm8RVIQuNz"></i>
</div>
<div class="options-box">
  <mu-flexbox class="select-box">
    <mu-flexbox-item class="title">
      选择入口文件
    </mu-flexbox-item>
    <mu-flexbox-item class="tag">
      WEBPACK
    </mu-flexbox-item>
  </mu-flexbox>
  <div class="des">基于 webpack。选择一个文件作为入口，运行入口文件，所依赖的项根据配置进行编译转换。</div>
</div>
</li>
<li :class="{ active: selectedIndex == 1 }" @click="select(1)">
  <div class="ico" style="color: #6c94d9;">
<i class="icon-moles im-zujian"></i>
</div>
<div class="options-box">
  <mu-flexbox class="select-box">
    <mu-flexbox-item class="title">
      选择文件夹
    </mu-flexbox-item>
    <mu-flexbox-item class="tag">
      GULP
    </mu-flexbox-item>
  </mu-flexbox>
  <div class="des">基于 gulp。选择一个文件夹，监听这个文件夹中文件的改动，每次改动运行任务。</div>
</div>
</li>
</ul>
<div class="btnBar">
  <mu-raised-button label="确认" :disabled="!~selectedIndex" primary />
  <mu-raised-button label="取消" @click="close" />
</div>
</div>
</template>
<script>
  /*
  存在 userData 目录(app.getPath('userData'))
  windows: C:\Users\linkFly\AppData\Roaming\moles
  */
  import storage from 'electron-json-storage';
  import { ipcRenderer } from 'electron';

  //本地存储key（文件名称）
  const STORAGENAME = '';
  // 本地存储配置
  var localConfigs = {};

  export default {
    data() {
      return {
        selectedIndex: -1
      };
    },
    components: {

    },
    events: {
    },
    created() {
    },
    mounted() {

    },
    methods: {
      select(index) {
        this.selectedIndex = index;
      },
      close() {
        ipcRenderer.send('childs-async-new-projects-config');
      }
    }
  }
</script>