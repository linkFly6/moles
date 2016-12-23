import Vue from 'vue';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import VueRouter from 'vue-router';
import App from '../views/App';
import Router from './routers';


Vue.use(VueRouter);
Vue.use(MuseUI);


const router = new VueRouter({
  hashbang: true,
  // history: true,
  history: false,
  saveScrollPosition: true
  // suppressTransitionError: true
});

Router(router);


router.start(App, '#app');
