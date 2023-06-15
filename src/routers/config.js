import Home from 'src/pages/Home';
import About from 'src/pages/About';
// import xx from 'components/index';

// 整体路由列表,根据路由规则,path长的需放在上方,请注意!!!!
/*
  {
    path: '', // 路由
    component: '', // 组件
    exact: false,
    noMenu: true // true没有菜单
  },
*/
export const routeList = [
  {
    path: '/about',
    component: About,
    exact: false,
  },
  {
    path: '/',
    component: Home,
    exact: false
  },
];
