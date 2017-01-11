import Vue from 'vue';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import '../../fonts/materialIcon.scss';
import '../../fonts/icon-moles-font.css';
import '../../sass/global.scss';

import NewProjects from '../../views/child-windows/newProjects/index';


Vue.use(MuseUI);

new Vue({
  render: h => h(NewProjects)
}).$mount('#app');