<style lang="sass" scoped>
  @import "../sass/global.scss";
  %backface {
    -webkit-overflow-scrolling: touch;
    -webkit-backface-visibility: hidden;
  }
  
  %preserve {
    transform-style: preserve-3d;
    transition: .6s;
  }
  
  .box-index {
    .banner-box {
      width: 100%;
      margin: 20px auto 30px;
      @extend %backface;
      .banner {
        margin: 0 auto;
        position: relative;
        perspective: 1000px;
        @extend %backface;
        width: 500px;
        height: 176px;
        @media screen and (min-width: $screen-lg-width) {
          width: 45%;
          height: 300px;
        }
        div {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0px;
          left: 0px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
          @extend %preserve;
        }
      }
      img {
        /*box-shadow: 0 4px 4px -2px rgba(0,0,0,0.4);*/
        position: absolute;
        left: 0px;
        top: 0px;
        -webkit-box-reflect: below -10px -webkit-gradient(linear, 0 0, 0 100%, from(transparent), color-stop(.88, transparent), to(white));
        width: 100%;
        height: 100%;
        @extend %preserve;
      }
      span {
        position: absolute;
        top: 0px;
        z-index: 999;
        right: 70px;
        height: 25px;
        width: 70px;
        border: 1px solid #fff;
        color: #fff;
      }
      .i-box1 {
        z-index: 1;
        opacity: 0;
        transform: translateX(-550px) translateZ(-300px) rotateY(20deg);
        @media screen and (min-width: $screen-lg-width) {
          transform: translateX(-600px) translateZ(-300px) rotateY(20deg);
        }
      }
      .i-box2 {
        z-index: 2;
        transform: translateX(-450px) translateZ(-250px) rotateY(45deg);
        @media screen and (min-width: $screen-lg-width) {
          transform: translateX(-500px) translateZ(-250px) rotateY(45deg);
        }
      }
      .i-box3 {
        z-index: 10;
        opacity: 1;
        visibility: visible;
        /*box-shadow: 0 0px 10px 50px rgba(0, 0, 0, 0.3);*/
      }
      .i-box4 {
        z-index: 2;
        transform: translateX(450px) translateZ(-250px) rotateY(-45deg);
        @media screen and (min-width: $screen-lg-width) {
          transform: translateX(550px) translateZ(-250px) rotateY(-45deg);
        }
      }
      .i-box5 {
        z-index: 1;
        opacity: 0;
        transform: translateX(550px) translateZ(-300px) rotateY(-20deg);
        @media screen and (min-width: $screen-lg-width) {
          transform: translateX(650px) translateZ(-250px) rotateY(-45deg);
        }
        /*background-color: #ddd*/
      }
    }
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
      //老黄历
      .almanac {
        .almanac-t {
          width: 100%;
          min-height: 314px;
          th.good,
          th.bad {
            text-align: center;
            font-size: 32px;
            font-weight: 200;
            line-height: 2;
            letter-spacing: 1px;
          }
          td.good,
          td.bad {
            padding: 10px 25px;
          }
          th.good {
            background-color: #ffee44;
            border-right: 1px solid #fff;
          }
          th.bad {
            background-color: #ff4444;
            color: #fafafa;
          }
          td.good {
            background-color: #ffffaa;
            border-right: 1px solid #fff;
          }
          td.bad {
            background-color: #ffddd3;
          }
          .a-name {
            font-size: 22px;
            padding: 10px 0;
            font-weight: 600;
          }
          .a-des {
            color: #444;
          }
        }
        .almanac-i {
          .txt-dire {
            /*font-weight: bold;*/
            padding: 0 2px;
          }
          width: 100%;
          th {
            width: 100px;
            text-align: right;
          }
          td,
          th {
            vertical-align: top;
          }
        }
        .almanac-today {
          text-align: center;
          font-size: 18px;
          padding: 5px 0 25px;
          color: #666;
        }
        .almanac-des {
          padding: 50px 0 0 20px;
          color: #888;
          li {
            list-style: disc;
          }
        }
      }
    }
  }
</style>

<template>
  <div class="box-index">
    <div class="banner-box">
      <div class="banner" id="b-box">
        <div class='i-box1' ng-click="bannerClick($event)" data-index="1"><a href='javascript:;'><span>title1</span><img src="http://sandbox.runjs.cn/uploads/rs/376/tz2ofdap/1.jpg" /></a></div>
        <div class='i-box2' ng-click="bannerClick($event)" data-index="2"><a href='javascript:;'><span>title2</span><img src="http://sandbox.runjs.cn/uploads/rs/376/tz2ofdap/2.jpg" /></a></div>
        <div class='i-box3' ng-click="bannerClick($event)" data-index="3"><a href='javascript:;'><span>title3</span><img src="http://sandbox.runjs.cn/uploads/rs/376/tz2ofdap/3.jpg" /></a></div>
        <div class='i-box4' ng-click="bannerClick($event)" data-index="4"><a href='javascript:;'><span>title4</span><img src="http://sandbox.runjs.cn/uploads/rs/376/tz2ofdap/4.jpg" /></a></div>
        <div class='i-box5' ng-click="bannerClick($event)" data-index="5"><a href='javascript:;'><span>title5</span><img src="http://sandbox.runjs.cn/uploads/rs/376/tz2ofdap/5.jpg" /></a></div>
      </div>
    </div>
    <div class="main-box">
      <h4 class="center mudule-title">快速通道</h4>
      <div class="row quick-box">
        <div class="col-md-3">
          <a href="javascript:;" class="quick-btn bg">
            <h3 class="mar">快速压缩</h3>
            <p>快速压缩JS/CSS/HTML</p>
          </a>
        </div>
        <div class="col-md-3">
          <a href="javascript:;" class="quick-btn q-logo sass">
            <div>
              <img src="../resource/logo-sass-b6e1ef6e.svg" height="50" width="130" />
            </div>
            <p>Sass编译</p>
            <p>粘贴Sass快速编译成Css</p>
          </a>
        </div>

        <div class="col-md-3">
          <a href="javascript:;" class="quick-btn bg b-1">
            <div style="padding-top:11px;">
              <img src="../resource/babel.png" height="61" width="122" />
            </div>
            <p>JavaScript编译</p>
            <p>粘贴JavaScript快速编译</p>
          </a>
        </div>
        <div class="col-md-3">
          <a href="javascript:;" class="quick-btn q-logo">
            <div>
              <img src="../resource/gulp-white-text.svg" height="50" width="130" />
            </div>
            <p>任务管理</p>
            <p>配置压缩、编译等任务</p>
          </a>
        </div>
      </div>
      <h4 class="center mudule-title">程序员老黄历</h4>
      <div class="row almanac">
        <div class="col-md-8">
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
                    <li ng-repeat="item in almanac.goodEvents">
                      <div class="a-name">{{item.name}}</div>
                      <div class="a-des">{{item.des}}</div>
                    </li>
                  </ul>
                </td>
                <td valign="top" class="bad">
                  <ul>
                    <li ng-repeat="item in almanac.badEvents">
                      <div class="a-name">{{item.name}}</div>
                      <div class="a-des">{{item.des}}</div>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-md-4">
          <ul class="almanac-today">
            <li>{{almanac.date| date : '今天是yyyy年MM月dd日'}}</li>
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
                  <i ng-repeat="item in almanac.stars track by $index" class="fa" ng-class="{'fa-star':item,'fa-star-o':!item}"></i>
                </td>
              </tr>
            </tbody>
          </table>
          <ul class="almanac-des">
            <li>本老黄历仅面向程序员</li>
            <li>本老黄历内容是程序生成的，因为只有这样程序员才会信</li>
            <li>原作者Twitter @fake_faith</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  components: {
  },
  ready: function () {

  },
  events: {
  },
  methods: {
  }
}
</script>