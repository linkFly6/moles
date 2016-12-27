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
        height: 200px;
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
      transform: rotate3d(0, 0, 0, .1deg); // fix 滚动条太快导致错位的bug
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
</style>

<template>
  <div class="banner-box">
    <div class="banner" id="b-box">
      <div class='i-box1' title="1" @click="bannerClick($event)" data-index="1"><a href='javascript:;'><span>title1</span><img src="http://sandbox.runjs.cn/uploads/rs/376/tz2ofdap/1.jpg" /></a></div>
      <div class='i-box2' title="2" @click="bannerClick($event)" data-index="2"><a href='javascript:;'><span>title2</span><img src="http://sandbox.runjs.cn/uploads/rs/376/tz2ofdap/2.jpg" /></a></div>
      <div class='i-box3' title="3" @click="bannerClick($event)" data-index="3"><a href='javascript:;'><span>title3</span><img src="http://sandbox.runjs.cn/uploads/rs/376/tz2ofdap/3.jpg" /></a></div>
      <div class='i-box4' title="4" @click="bannerClick($event)" data-index="4"><a href='javascript:;'><span>title4</span><img src="http://sandbox.runjs.cn/uploads/rs/376/tz2ofdap/4.jpg" /></a></div>
      <div class='i-box5' title="5" @click="bannerClick($event)" data-index="5"><a href='javascript:;'><span>title5</span><img src="http://sandbox.runjs.cn/uploads/rs/376/tz2ofdap/5.jpg" /></a></div>
    </div>
  </div>
</template>
<script>
//当前焦点图索引
var currIndex = 3,
    $bannerBox = document.getElementById('b-box'),
    $bannerChild = $bannerBox && $bannerBox.children,
    bannerLength = $bannerChild && $bannerChild.length,
    temp,
    createClassName = function (index) {
        return 'i-box' + index;
    },
    move2Right = function () {
        temp = $bannerChild[bannerLength - 1];
        //$bannerChild.removeAttr('class');
        for (let i = bannerLength - 1; i > 0; i--) {
            $bannerChild[i] = $bannerChild[i - 1];
            $bannerChild[i].className = createClassName(i + 1);
            $bannerChild[i].dataset.index = i + 1;
        }
        $bannerChild[0] = temp;
        $bannerChild[0].className = createClassName(1);
        $bannerChild[0].dataset.index = 1;
    },
    move2Left = function () {
        temp = $bannerChild[0];
        [].forEach.call($bannerChild, (item) => {
          item.className = '';
        });
        for (let i = 0; i < bannerLength - 1; i++) {
            //if ($bannerChild[i + 1]) {
            $bannerChild[i] = $bannerChild[i + 1];
            $bannerChild[i].className = createClassName(i + 1);
            $bannerChild[i].dataset.index = i + 1;
            //}
        }
        temp.className = createClassName(bannerLength);
        temp.dataset.index = bannerLength;
        $bannerChild[bannerLength - 1] = temp;
    }
export default {
  data () {
    return {};
  },
  mounted () {
    $bannerBox = document.getElementById('b-box');
    $bannerChild = [].slice.call($bannerBox.children, 0); // 注意 HTMLConection 和 Array
    bannerLength = $bannerChild.length;
  },
  components: {
  },
  events: {
    
  },
  methods: {
    bannerClick (e) {
      var clickIndex = e.currentTarget.dataset.index;
      if (clickIndex == currIndex - 1) {
          move2Right();
      } else if (clickIndex == currIndex + 1) {
          move2Left();
      } else if (currIndex === clickIndex) {
          alert(`您点击了 ${currIndex}`)
      };
    }
  }
}
</script>