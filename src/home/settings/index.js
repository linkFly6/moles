import Vue from 'vue';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import '../../fonts/materialIcon.scss';
import '../../fonts/icon-moles-font.css';
import '../../sass/global.scss';
import VueRouter from 'vue-router';

import NewProjects from '../../views/settings/newProjects/';


Vue.use(VueRouter);
Vue.use(MuseUI);


const router = new VueRouter({
  routes: [
    {
      path: '/newprojects',
      name: 'newprojects',
      component: NewProjects
    }
  ]
});

new Vue({
  router
}).$mount('#app');