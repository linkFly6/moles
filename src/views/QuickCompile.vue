<style lang="sass">
  .quick-compile {
    .select-type {
      vertical-align: middle;
      margin-bottom: 0;
      width: 120px;
      text-align: center;
    }
    .menu-bar {
      padding: 12px 0;
    }
    /*.active {
      background-color: rgba(204, 204, 206, 0.87);
    }*/
    .compile-options {
      &.parsetOpen {
        height: 82px;
      }
      &.optionsOpen {
        height: 134px;
      }
    }
    .btn-box {
      padding: 10px 0;
      text-align: right;
    }
  }
</style>

<template>
  <div class="container-main quick-compile">
    <div class="main-box">
      <div class="menu-bar">
        <mu-raised-button label="转换器" class="cell" :class="{ hover: openBarIndex === 0 }" @click="toggleOptionsBar(0)" />
        <mu-raised-button label="编译选项" class="cell" :class="{ hover: openBarIndex === 1 }" @click="toggleOptionsBar(1)" :disabled="!showBabelPlugsBar"
        />
      </div>
      <!--压缩选项文档：http://www.xv90.com/post-113.html  ，  http://blog.fens.me/nodejs-uglifyjs2-js/-->
      <div class="optionsBar compile-options" :class="{ parsetOpen: openBarIndex === 0, optionsOpen: openBarIndex === 1 }">
        <!--babel parset-->
        <div class="layout-context" v-show="openBarIndex === 0">
          <mu-row class="options-bar">
            <mu-col width="100" tablet="50" desktop="25">
              <mu-switch label="ES2015" v-model="babelParsets.es2015" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="25">
              <mu-switch label="ES2016" v-model="babelParsets.es2016" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="25">
              <mu-switch label="ES2017" v-model="babelParsets.es2017" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="25">
              <mu-switch label="React" v-model="babelParsets.react" />
            </mu-col>
          </mu-row>
          <mu-row class="options-bar">
            <mu-col width="100" tablet="50" desktop="25">
              <mu-switch label="stage-0" v-model="babelParsets['stage-0']" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="25">
              <mu-switch label="stage-1" v-model="babelParsets['stage-1']" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="25">
              <mu-switch label="stage-2" v-model="babelParsets['stage-2']" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="25">
              <mu-switch label="stage-3" v-model="babelParsets['stage-3']" />
            </mu-col>
          </mu-row>
        </div>
        <!--babel plugs-->
        <div class="layout-context" v-show="openBarIndex === 1">
          <mu-row class="options-bar">
            <mu-col width="100" tablet="50" desktop="20">
              <mu-switch label="字符串模板" title="编译字符串模板" v-model="babelOptions.templateLiterals" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="20">
              <mu-switch label="箭头函数" title="编译箭头函数" v-model="babelOptions.arrowFunctions" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="20">
              <mu-switch label="函数块级作用域" title="函数块级作用域" v-model="babelOptions.blockScopedFunctions" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="20">
              <mu-switch label="编译Class" title="编译Class" v-model="babelOptions.classes" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="20">
              <mu-switch label="对象快捷属性" title="对象快捷属性&#10;如obj = { x, y }" v-model="babelOptions.shorthandProperties" />
            </mu-col>
          </mu-row>
          <mu-row class="options-bar">
            <mu-col width="100" tablet="50" desktop="20">
              <mu-switch label="重复属性转换" title="重复属性转换&#10;当检测到属性重复，则采用[对象中括号属性]处理" v-model="babelOptions.shorthandKeys" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="20">
              <mu-switch label="对象中括号属性" title="对象中括号属性&#10;var obj = { ['x'] : 1 }" v-model="babelOptions.computedProperties" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="20">
              <mu-switch label="for...of" title="编译for...of语法" v-model="babelOptions.forOf" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="20">
              <mu-switch label="正则标记(y)" title="正则新的标记/y（sticky-regex） - /^foo/y" v-model="babelOptions.stickyRegex" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="20">
              <mu-switch label="正则标记(u)" title="正则新的标记/u（unicode-regex） - /\u{61}/u" v-model="babelOptions.unicodeRegex" />
            </mu-col>
          </mu-row>
          <mu-row class="options-bar">
            <mu-col width="100" tablet="50" desktop="20">
              <mu-switch label="const常量" title="const常量" v-model="babelOptions.constants" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="20">
              <mu-switch label="扩展运算符" title="扩展运算符&#10;function foo(bar,...values){ }" v-model="babelOptions.spread" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="20">
              <mu-switch label="参数默认值" title="默认参数值和扩展运算符&#10;function (a, b = 1, c :: String) { }" v-model="babelOptions.parameters" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="20">
              <mu-switch label="赋值解构" title="赋值解构&#10;let { foo, bar } = foz();" v-model="babelOptions.destructuring" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="20">
              <mu-switch label="let和const作用域" title="let和const使用块级作用域" v-model="babelOptions.blockScoping" />
            </mu-col>
          </mu-row>
          <mu-row class="options-bar" style="justify-content:flex-start">
            <mu-col width="100" tablet="50" desktop="20">
              <mu-switch label="commonJS" title="编译为commonJS模块&#10;和AMD/UMD编译选项不兼容" v-model="babelOptions.modulesCommonjs" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="20">
              <mu-switch label="AMD" title="编译为AMD模块&#10;和commonJS/UMC编译选项不兼容" v-model="babelOptions.modulesAmd" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="20">
              <mu-switch label="UMD" title="编译为UMD模块&#10;和commonJS/AMD编译选项不兼容" v-model="babelOptions.modulesUmd" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="20">
              <mu-switch label="幂运算" title="幂运算，ES2016 规范" v-model="babelOptions.exponentiationOperator" />
            </mu-col>
            <mu-col width="100" tablet="50" desktop="20">
              <mu-switch label="Runtime" title="通用运行时" v-model="babelOptions.transformRuntime" />
            </mu-col>
          </mu-row>
        </div>
      </div>
      <div class="layout-context">
        <mu-snackbar v-if="toast" message="成功复制代码" @close="hideToast" style="position: absolute;"/>
<textarea class="textarea" placeholder="要转换的代码" v-model.trim="oldCodeSource"></textarea>
<div class="btn-box">
  <mu-raised-button label="转换" :class="{ hover: loading }" @click="compile" primary>
    <mu-circular-progress :size="20" color="#fff" style="padding-left:10px;line-height:20px;" v-show="loading" :disabled="loading"/>
</mu-raised-button>
<mu-raised-button label="复制转换后的代码" :disabled="!newCodeSource" @click="copyToClipboard" />
</div>
<textarea class="textarea" placeholder="转换完成的代码" v-model.trim="newCodeSource"></textarea>
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
  const STORAGENAME = 'VIEWS_SIM_COMPILE_OPTIONS';
  // 本地存储配置
  var localConfigs = {};

  export default {
    data() {
      return {
        // 显示copy 成功的信息
        toast: false,
        toastTimer: null,
        // 配置项
        openBarIndex: -1,
        oldCodeSource: '', // 压缩前的代码
        newCodeSource: '', // 压缩后的代码
        loading: false,
        babelParsets: {
          // http://babeljs.io/docs/plugins/#presets
          'es2015': false,
          'es2016': false,
          'es2017': false,
          'stage-0': false,
          'stage-1': false,
          'stage-2': false,
          'stage-3': false,
          'react': false
        },
        babelOptions: {
          // http://babeljs.io/docs/plugins/
          templateLiterals: true, // 编译字符串模板
          arrowFunctions: true, // 编译箭头函数
          blockScopedFunctions: true, // 函数块级作用域
          classes: true, // 编译Class
          shorthandProperties: true, // 对象快捷属性&#10;如obj = { x, y }
          shorthandKeys: true, // 重复属性转换&#10;当检测到属性重复，则采用[对象中括号属性]处理
          computedProperties: true, // 对象中括号属性&#10;var obj = { ['x'] : 1 }
          forOf: true, // 编译for...of语法
          stickyRegex: true, // 正则新的标记/y（sticky-regex） - /^foo/y
          unicodeRegex: true, // 正则新的标记/u（unicode-regex） - /\u{61}/u
          constants: true, // const常量
          spread: true, // 扩展运算符&#10;function foo(bar,...values){ }
          parameters: true, // 默认参数值和扩展运算符&#10;function (a, b = 1, c :: String) { }
          destructuring: true, // 赋值解构&#10;let { foo, bar } = foz();
          blockScoping: true, // let和const使用块级作用域
          modulesCommonjs: true, // 编译为commonJS模块&#10;和AMD/UMD编译选项不兼容
          modulesAmd: false, // 编译为AMD模块&#10;和commonJS/UMC编译选项不兼容
          modulesUmd: false, // 编译为UMD模块&#10;和commonJS/AMD编译选项不兼容
          exponentiationOperator: false, // 幂运算，ES2016 规范
          transformRuntime: true // 通用运行时
        }
      };
    },
    // 计算属性
    computed: {
      showBabelPlugsBar() {
        var keys = Object.keys(this.babelParsets);
        return keys.every(key => !this.babelParsets[key]);
      }
    },
    components: {
      MagicBar
    },
    events: {
    },
    watch: {
      babelOptions: {
        // 对象和数组要深度 watch
        handler: _.debounce(function (newOptions) {//函数节流，2s之后才会执行
          localConfigs.plugs = babelOptions
          storage.set(STORAGENAME, localConfigs, function (error, data) {
            //if (error) throw error;
            if (error) return;//有错误也不抛出
          });
        }, 2000),
        deep: true
      }
    },
    created() {
      // 切换到别的页面，再切换回来，这里会被重复执行，而这里的代码只需要执行一次，所以放到 created
      var me = this
      //从本地存储读取配置
      storage.get(STORAGENAME, function (error, data) {
        if (error) return;//throw error //有错误则不读取了
        if (data != null) {
          try {
            Object.assign(localConfigs, data)
            if (data.plugs) {
              me.babelOptions = data.plugs
            }
            if (data.parsets) {
              me.babelParsets = data.parsets
            }
          } catch (error) {
          }
        }
      });
      // 压缩完成 TODO 放到这里也不行， this 改变了
      ipcRenderer.on('tools-async-quick-compile-js-reply', function (event, err, data, oldBytes, newBytes, timer) {//事件源，错误，压缩后的代码，压缩前bytes，压缩后bytes，压缩耗时（ms）
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
      toggleOptionsBar(index) {
        this.openBarIndex = this.openBarIndex === index ? -1 : index;
      },
      compile() {
        if (this.loading) return;
        if (this.oldCodeSource.length) {
          var magicBar = this.$refs.magicBar;
          magicBar.clear();
          this.loading = true;
          if (showBabelPlugsBar) {
            // babel plugs 分支
            ipcRenderer.send('tools-async-quick-compile-js', {
              source: this.oldCodeSource,
              plugins: this.babelOptions
            });
          } else {
            // babel parset 分支
            ipcRenderer.send('tools-async-quick-compile-js', {
              source: this.oldCodeSource,
              parsets: this.babelParsets
            });
          }
          magicBar.log('正在编译中');
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