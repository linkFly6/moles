import Home from '../views/Home';
import CompressMenu from '../views/partial/Tools-Menu';
import QuickCompress from '../views/QuickCompress.vue';
import QuickCompile from '../views/QuickCompile.vue';
import Layout from '../components/Layout';

export default
  [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/tools',
      name: 'tools',
      component: Layout,
      children: [
        {
          path: 'quickCompress',
          name: 'quickCompress',
          // 妈蛋这里是 components，多了个 s
          components: {
            menu: CompressMenu,
            content: QuickCompress
          }
        },
        {
          path: 'quickCompile',
          name: 'quickCompile',
          // 妈蛋这里是 components，多了个 s
          components: {
            menu: CompressMenu,
            content: QuickCompile
          }
        }
      ]
      // component: {
      //   default: Layout,
      //   menu: CompressMenu,
      //   content: CompressQuick
      // }
    }
  ];
