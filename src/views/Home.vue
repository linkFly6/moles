<style lang="sass" scoped>
  @import "../sass/global.scss";
  .box-index {
    .main-box {
      padding: 10px;
      margin: 30px auto;
      width: 80%;
      & ul,
      & li {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      .mudule-title {
        padding: 10px 0;
      }
      //快速入口
      .quick-box {
        padding: 15px 0;
        .quick-btn {
          display: block;
          height: 150px;
          text-align: center;
          border-radius: 5px;
          color: #333;
          border: 1px solid #ccc;
          overflow: hidden;
          text-decoration: none;
          transition: box-shadow linear .3s;
          &:hover {
            box-shadow: 1px 3px 10px #CCC;
          }
        }
        p {
          margin: 0;
        }
        .q-logo {
          background-color: #cf4646;
          color: #fff;
          padding-top: 22px;
        }
        .sass {
          /*background: rgba(0, 0, 0, 0) linear-gradient(135deg, #271b38, #563d7c, #7952b3) repeat scroll 0 0;*/
          /*background: #EEE;*/
          background: #FAFAFA;
          color: #666;
        }
        .mar {
          padding-top: 15px;
          margin-bottom: 1.3rem;
        }
        .bg {
          background: url('../resource/compress-bg.png');
          background-size: 150% 100%;
          color: #fff;
          h3 {
            font-size: 35px;
            font-weight: 200;
            letter-spacing: 1px;
            line-height: 1.2;
          }
        }
        .b-1 {
          background: url('../resource/grey-prism-63478a91.svg');
          color: #666;
          /*background-size: 150% 100%;*/
        }
      }
    }
  }
</style>

<template>
  <div class="box-index">
    <banner></banner>
    <div class="main-box">
      <h4 class="center mudule-title">快速通道</h4>
      <mu-flexbox class="mt8 quick-box">
        <mu-flexbox-item class="flex-demo">
          <a href="javascript:;" class="quick-btn bg">
            <h3 class="mar">快速压缩</h3>
            <p>快速压缩JS/CSS/HTML</p>
          </a>
        </mu-flexbox-item>
        <mu-flexbox-item class="flex-demo">
          <a href="javascript:;" class="quick-btn q-logo sass">
            <div>
              <img src="../resource/logo-sass-b6e1ef6e.svg" height="50" width="130" />
            </div>
            <p>Sass编译</p>
            <p>粘贴Sass快速编译成Css</p>
          </a>
        </mu-flexbox-item>
        <mu-flexbox-item class="flex-demo">
          <a href="javascript:;" class="quick-btn bg b-1">
            <div style="padding-top:11px;">
              <img src="../resource/babel.png" height="61" width="122" />
            </div>
            <p>JavaScript编译</p>
            <p>粘贴JavaScript快速编译</p>
          </a>
        </mu-flexbox-item>
        <mu-flexbox-item class="flex-demo">
          <a href="javascript:;" class="quick-btn q-logo">
            <div>
              <img src="../resource/gulp-white-text.svg" height="50" width="130" />
            </div>
            <p>任务管理</p>
            <p>配置压缩、编译等任务</p>
          </a>
        </mu-flexbox-item>
      </mu-flexbox>
      <h4 class="center mudule-title">程序员老黄历</h4>
      <!--<div class="almanac">
        <mu-row gutter>
          <mu-col width="100" tablet="60" desktop="60">
            <table class="almanac-t">
              <colgroup>
                <col width="50%" />
                <col width="50%" />
              </colgroup>
              <thead>
                <tr>
                  <th class="good">宜</th>
                  <th class="bad">不宜</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td valign="top" class="good">
                    <ul>
                      <li v-for="item in almanac.goodEvents">
                        <div class="a-name">{{item.name}}</div>
                        <div class="a-des">{{item.des}}</div>
                      </li>
                    </ul>
                  </td>
                  <td valign="top" class="bad">
                    <ul>
                      <li v-for="item in almanac.badEvents">
                        <div class="a-name">{{item.name}}</div>
                        <div class="a-des">{{item.des}}</div>
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </mu-col>
          <mu-col width="100" tablet="40" desktop="40">
            <ul class="almanac-today">
              <li>{{ almanac.date | date }}</li>
              <li>{{'星期'+almanac.week}}</li>
            </ul>
            <table class="almanac-i">
              <tbody>
                <tr>
                  <th>座位朝向：</th>
                  <td>面向<span class="text-warning txt-dire">{{almanac.direction}}</span>写程序，BUG 最少。 </td>
                </tr>
                <tr>
                  <th>今日宜饮：</th>
                  <td>{{almanac.drink}}</td>
                </tr>
                <tr>
                  <th>女神亲近指数：</th>
                  <td>
                    <mu-icon value="star_rate" :size="19" :color="item ? '#f87' : '#ccc'" v-for="item in almanac.stars"/>
                  </td>
                </tr>
              </tbody>
            </table>
            <ul class="almanac-des">
              <li>本老黄历仅面向程序员</li>
              <li>本老黄历内容是程序生成的，因为只有这样程序员才会信</li>
              <li>原作者 @fake_faith</li>
            </ul>
          </mu-col>
        </mu-row>
      </div>-->
      <almanac></almanac>
    </div>
  </div>
</template>
<script>

import Almanac from '../components/Almanac'
import Banner from '../components/Banner'

export default {
  data () {
    return {
    }
  },
  components: {
    Almanac,
    Banner
  },
  mounted: function () {
  },
  events: {
  },
  methods: {
  }
}
</script>