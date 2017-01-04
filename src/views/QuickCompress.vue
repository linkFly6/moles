<style lang="sass">
  .quick-compress {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    .main-box {
      overflow-y: auto;
      flex:1;
    }
    .box {
      padding:15px;
    }
    .cell {
      display: inline-block;
      margin-right: 10px;
    }
    .content-menu-bar {
      /*border-bottom: 1px solid rgba(0,0,0,.12);*/
      padding-bottom: 5px;
      margin: 0 15px;
      padding: 5px 0;
      .select-type {
        vertical-align: middle;
        margin-bottom: 0;
        width: 120px;
        text-align: center;
      }
      /*.active {
        background-color: rgba(204, 204, 206, 0.87);
      }*/
    }
    .compress-options {
      background: #fafafa;
      box-shadow:inset 0 1px 1px 0 #c7c7c7;
      overflow: hidden;
      height: 1px;
      transition: height linear .2s;
      border-bottom: 1px solid #eee;
      &.jsOpen {
        height: 105px;
      }

      .opt-box {
        padding: 15px;
      }
    }
    .textarea {
      border: 1px solid #ccc;
      display: block;
      background: #fff url('../resource/logo-text.png') no-repeat  90% 80%;
      box-shadow:inset 0 1px 1px rgba(0,0,0,.075);
      resize: none;
      transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
      border-radius: 4px;
      padding: 6px 12px;
      width: 100%;
      outline: 0;
      height: 200px;
      &:focus {
        border-color: #66afe9;
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
      }
      &::-webkit-input-placeholder {
        color: #ccccce;
      }
    }
    .btn-box {
      padding: 10px 0;
      text-align: right;
    }
  }
</style>

<template>
  <div class="quick-compress">
    <div class="main-box">
      <div class="content-menu-bar">
        <span class="cell">压缩类型：</span>
        <mu-select-field v-model="compressType" class="select-type cell">
          <mu-menu-item value="js" title="JavaScript" />
          <mu-menu-item value="css" title="CSS" />
          <mu-menu-item value="html" title="HTML" />
        </mu-select-field>
        <mu-raised-button label="压缩选项" class="cell" :class="{ hover: openOptionsBar }" @click="toggleOptionsBar" />
      </div>
      <!--压缩选项文档：http://www.xv90.com/post-113.html  ，  http://blog.fens.me/nodejs-uglifyjs2-js/-->
      <div class="compress-options" :class="{ jsOpen: openOptionsBar && compressType ==='js' }">
        <div class="opt-box jsOptions">
          <mu-row class="options-bar">
            <mu-col width="100" tablet="50" desktop="20">
              <mu-switch label="合并多个变量声明" title="合并多个变量声明，加入连续的var语句&#10;关闭后易于压缩代码调试，但会降低压缩率" v-model="jsOptions.join_vars" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="20">
              <mu-switch label="函数声明置顶" title="函数声明置顶&#10;关闭后易于压缩代码调试，但会降低压缩频率" v-model="jsOptions.hoist_funs" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="20">
              <mu-switch label="变量声明置顶" title="变量声明置顶&#10;关闭后易于压缩代码调试，但会降低压缩频率" v-model="jsOptions.hoist_vars" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="20">
              <mu-switch label="删除调试语句" title="删除调试器和调试语句（debugger）&#10;例如console.log" v-model="jsOptions.drop_debugger" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="20">
              <mu-switch label="删除运行不到的代码" title="删除运行不到的代码" v-model="jsOptions.dead_code" />
            </mu-col>
          </mu-row>
          <mu-row class="options-bar">
            <mu-col width="100" tablet="50" desktop="20">
              <mu-switch label="删除没用的声明" title="删除没用的变量、函数" v-model="jsOptions.unused" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="20">
              <mu-switch label="优化循环" title="优化循环&#10;当我们可以静态的判断条件的取值时，针对do,while和for循环的优化" v-model="jsOptions.loops" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="20">
              <mu-switch label="优化if-else表达式" title="优化if-else表达式" v-model="jsOptions.if_return" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="20">
              <mu-switch label="优化条件表达式" title="优化条件表达式（转换成二元）" v-model="jsOptions.conditionals" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="20">
              <mu-switch label="优化常量表达式" title="优化常量表达式（尝试去计算常量表达式）" v-model="jsOptions.evaluate" />
            </mu-col>
          </mu-row>
          <mu-row style="justify-content:flex-start" class="options-bar">
<mu-col width="100" tablet="50" desktop="20">
  <mu-switch label="优化逻辑操作符" title="优化逻辑操作符" v-model="jsOptions.comparisons" />
</mu-col>
<mu-col width="100" tablet="50" desktop="20">
  <mu-switch label="优化布尔表达式" title="优化布尔表达式&#10;例如 - !!a ? b : c = a ? b : c" v-model="jsOptions.booleans" />
</mu-col>
<mu-col width="100" tablet="50" desktop="20">
  <mu-switch label="智能对象转换" title="类似a['foo'] 智能优化为 a.foo" v-model="jsOptions.properties" />
</mu-col>
</mu-row>
</div>
</div>
<div class="box">
  <mu-snackbar v-if="toast" message="成功复制代码" @close="hideToast" style="position: absolute;"/>
  <div>
    <textarea class="textarea" placeholder="要压缩的代码" v-model.trim="oldCodeSource"></textarea>
  </div>
  <div class="btn-box">
    <mu-raised-button label="压缩" :class="{ hover: loading }" @click="compress" primary>
      <mu-circular-progress :size="20" color="#fff" style="padding-left:10px;line-height:20px;" v-show="loading" :disabled="loading"/>
</mu-raised-button>
<mu-raised-button label="复制压缩后的代码" :disabled="!newCodeSource" @click="copyToClipboard" />
</div>
<div>
  <textarea class="textarea" placeholder="压缩完毕的代码" v-model.trim="newCodeSource"></textarea>
</div>
</div>
</div>
<magic-bar ref="magicBar"></magic-bar>
</div>
</template>
<script>
  import MagicBar from '../components/MagicBar'
  import _ from 'lodash'
  /*
  存在 userData 目录(app.getPath('userData'))
  windows: C:\Users\linkFly\AppData\Roaming\moles
  */
  import storage from 'electron-json-storage'
  import { ipcRenderer, clipboard } from 'electron'

  //本地存储key（文件名称）
  const STORAGENAME = 'VIEWS_SIM_COMPRESSOR_OPTIONS';
  // 本地存储配置
  var localConfigs = {};

  export default {
    data() {
      return {
        // 显示copy 成功的信息
        toast: false,
        toastTimer: null,


        compressType: 'js',
        openOptionsBar: false,
        oldCodeSource: '', // 压缩前的代码
        newCodeSource: '', // 压缩后的代码
        loading: false,
        jsOptions: {
          join_vars: true,////合并多个变量声明，加入连续的var语句
          hoist_funs: true,//函数声明置顶，多个变量合并不利于压缩代码调试
          hoist_vars: true,//变量声明置顶，多个变量合并不利于压缩代码调试
          drop_debugger: true,//删除调试器和调试语句（debugger）
          dead_code: true,//删除运行不到的代码
          unused: true,//删除没用的声明
          loops: true,//优化循环
          if_return: true,//优化if-else表达式
          conditionals: true,//优化条件表达式（转换成二元）
          evaluate: true,//优化常量表达式（尝试去计算常量表达式）
          comparisons: true,//优化逻辑操作符
          booleans: true,//优化布尔表达式
          properties: false//智能对象转换=>类似a['foo'] 智能优化为 a.foo
        }
      };
    },
    components: {
      MagicBar
    },
    events: {
    },
    watch: {
      jsOptions: {
        // 对象和数组要深度 watch
        handler: _.debounce(function (newOptions) {//函数节流，2s之后才会执行
          localConfigs.JS = newOptions
          storage.set(STORAGENAME, localConfigs, function (error, data) {
            //if (error) throw error;
            if (error) return;//有错误也不抛出
          });
        }, 2000),
        deep: true
      }
    },
    created () {
      // 切换到别的页面，再切换回来，这里会被重复执行，而这里的代码只需要执行一次，所以放到 created
      var me = this
      //从本地存储读取配置
      storage.get(STORAGENAME, function (error, data) {
        if (error) return;//throw error //有错误则不读取了
        if (data != null) {
          try {
            Object.assign(localConfigs, data)
            if (data.JS) {
              me.jsOptions = data.JS
            }
          } catch (error) {
          }
        }
      });
      // 压缩完成 TODO 放到这里也不行， this 改变了
      ipcRenderer.on('tools-async-quick-compressor-js-reply', function (event, err, data, extra, oldBytes, newBytes, timer) {//事件源，错误，压缩后的代码，警告，压缩前bytes，压缩后bytes，压缩耗时（ms）
        me.loading = false;
        var magicBar = me.$refs.magicBar;
        if (err != null) {
          magicBar.error(`压缩异常 - 错误行：${err.line}，错误列：${err.col} `);
          magicBar.error(`错误信息：\n${err.message}`); // \n错误明细：\n${err.stack}
          me.newCodeSource = '';
          return
        }
        if (data != null) {
          magicBar.log('压缩完成');
          magicBar.log(`当前体积：${newBytes}byte | 原始体积：${oldBytes}byte`);
          magicBar.log(`比率：${(newBytes / oldBytes * 100).toFixed(2)}%`);
          magicBar.log(`执行时间：${timer} (ms)`);
          me.newCodeSource = data.code;
        }
      });
    },
    mounted() {
      
    },
    methods: {
      compressChange(selectType) {
        this.compressType = selectType;
      },
      toggleOptionsBar() {
        this.openOptionsBar = !this.openOptionsBar;
      },
      compress() {
        if (this.loading) return;
        if (this.oldCodeSource.length) {
          var magicBar = this.$refs.magicBar;
          magicBar.clear();
          this.loading = true
          switch (this.compressType) {
            case 'js':
              ipcRenderer.send('tools-async-quick-compressor-js', {
                source: this.oldCodeSource,
                options: this.jsOptions
              });
              magicBar.log('正在压缩中');
              break;
            case 'css':

              break;
            case 'html':

              break;
          }
        }
      },
      hideToast() {
        this.toast = false
        clearTimeout(this.toastTimer)
      },
      copyToClipboard() {
        if (!this.newCodeSource) return;
        clipboard.writeText(this.newCodeSource)
        this.toast = true
        clearTimeout(this.toastTimer)
        this.toastTimer = setTimeout(() => { this.toast = false }, 1500)
      }
    }
  }
</script>