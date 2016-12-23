import Home from '../views/Home';

export default function (router) {
  router.map({
    '/home': {
      name: 'home',
      component: Home
    },
    // '*': {
    //   component: ErrorPage
    // }
  });
}
