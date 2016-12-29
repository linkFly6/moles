import Home from '../views/Home';
import CompressMenu from '../views/partial/Compress-Menu';
import CompressQuick from '../views/Compress';
import Layout from '../components/Layout';

export default
  [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/compress',
      name: 'compress',
      component: Layout,
      children: [
        {
          path: 'quick',
          name: 'compressQuick',
          // 妈蛋这里是 components，多了个 s
          components: {
            menu: CompressMenu,
            content: CompressQuick
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
