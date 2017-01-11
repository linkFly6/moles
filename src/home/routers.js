import Home from '../views/Home';

import CompressMenu from '../views/partial/Tools-Menu';
import QuickCompress from '../views/QuickCompress';
import QuickCompile from '../views/QuickCompile';

import TaskMenu from '../views/partial/Task-Menu';
import TaskIndex from '../views/task/';
import TaskProject from '../views/task/Project';

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
    },
    {
      path: '/task',
      name: 'task',
      component: Layout,
      children: [
        {
          path: 'index',
          name: 'index',
          components: {
            menu: TaskMenu,
            content: TaskIndex
          }
        },
        {
          path: 'project',
          name: 'project',
          components: {
            menu: TaskMenu,
            content: TaskProject
          }
        }
      ]
    }
  ];
