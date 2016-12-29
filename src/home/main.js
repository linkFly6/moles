import Vue from 'vue';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import '../fonts/materialIcon.scss';
import '../fonts/icon-moles-font.css';
import VueRouter from 'vue-router';
import App from '../views/App';
import routes from './routers';


Vue.use(VueRouter);
Vue.use(MuseUI);


const router = new VueRouter({
  // mode: 'history',
  // routers  // 我屮艸芔茻！！！！TM 调试了一个小时多，是 routes 不是 routers
  routes
});


// const router = new VueRouter({
//   hashbang: true,
//   // history: true,
//   history: false,
//   saveScrollPosition: true
//   // suppressTransitionError: true
// });

// Router(router);

new Vue({
  el: '#app',
  router,
  render: r => r(App)
});
//.$mount('#app');