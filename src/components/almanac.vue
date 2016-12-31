<style lang="sass" scoped>
  //老黄历
  .almanac {
    ul,
    li {
      list-style: none;
      margin: 0;
      padding: 0;
    }
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
        width: 110px;
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
</style>

<template>
  <div class="almanac">
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
                  <li v-for="item in goodEvents">
                    <div class="a-name">{{item.name}}</div>
                    <div class="a-des">{{item.des}}</div>
                  </li>
                </ul>
              </td>
              <td valign="top" class="bad">
                <ul>
                  <li v-for="item in badEvents">
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
          <li>{{ date | filterDate }}</li>
          <li>{{'星期'+week}}</li>
        </ul>
        <table class="almanac-i">
          <tbody>
            <tr>
              <th>座位朝向：</th>
              <td>面向<span class="text-warning txt-dire">{{direction}}</span>写程序，BUG 最少。 </td>
            </tr>
            <tr>
              <th>今日宜饮：</th>
              <td>{{drink}}</td>
            </tr>
            <tr>
              <th>女神亲近指数：</th>
              <td>
                <mu-icon value="star_rate" :size="19" :color="item ? '#f87' : '#ccc'" v-for="item in stars" />
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
  </div>
</template>
<script>
import almanac from '../lib/programmerAlmanac';
import so from '../lib/so';
export default {
  data () {
    return almanac;
    // return {
    //   week: '',
    //   date: null,
    //   direction: '',
    //   drink: '',
    //   stars: '',
    //   goodEvents: [],
    //   badEvents: []
    // }
  },
  components: {
  },
  filters: {
    filterDate (date) {
      return so.dateFormat(date, '今天是yyyy年MM月dd日');
    }
  },
  events: {
  },
  mounted () {

  },
  updated () {

  },
  methods: {
  }
}
</script>