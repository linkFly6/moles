<style lang="sass">
  .task-index {
    .select-type {
      vertical-align: middle;
      margin-bottom: 0;
      width: 120px;
      text-align: center;
    }
    /*.active {
      background-color: rgba(204, 204, 206, 0.87);
    }*/

    .menu-bar {
      padding: 6px 0;
    }

    .compress-options {
      &.jsOpen {
        height: 105px;
      }
    }
    .btn-box {
      padding: 10px 0;
      text-align: right;
    }
  }
</style>

<template>
  <div class="container-main task-index">
    <div class="main-box">
      <div class="menu-bar">
        <mu-raised-button label="新建" />
      </div>
      <div class="layout-context">
      </div>
    </div>
    <magic-bar ref="magicBar"></magic-bar>
  </div>
</template>
<script>
  import MagicBar from '../../components/MagicBar';
  import _ from 'lodash';
  /*
  存在 userData 目录(app.getPath('userData'))
  windows: C:\Users\linkFly\AppData\Roaming\moles
  */
  import storage from 'electron-json-storage';
  import { ipcRenderer, remote } from 'electron';

  //本地存储key（文件名称）
  const STORAGENAME = '';
  // 本地存储配置
  var localConfigs = {};

  export default {
    data() {
      return {

      };
    },
    components: {
      MagicBar
    },
    events: {
    },
    created() {
    },
    mounted() {

    },
    methods: {
      createNewProject() {
        var win = BrowserWindow({
          center: true,
          width: 400,
          height: 600,
          maxWidth: 400,
          height: 600,
          minimizable: false,
          maximizable: false,
          alwaysOnTop: true,
          fullscreen: false,
          fullscreenable: false
        });
        
      }
    }
  }
</script>