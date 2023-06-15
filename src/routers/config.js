// import Home from 'src/pages/Home';
// import About from 'src/pages/About';

// 整体路由列表,根据路由规则,path长的需放在上方,请注意!!!!
/*
  {
    path: '', // 路由
    component: '', // 组件
    exact: false,
    noMenu: true // true没有菜单
  },
*/

const routerAry = []
// 自动加载modules目录下的 .js 结尾的文件
const requireRouter = require.context("./modules", false, /\.js$/);

requireRouter.keys().forEach(fileName => {
  const routerConfig = requireRouter(fileName);
  routerAry.push(...routerConfig?.routes);
});

// export const routeList = [
//   {
//     path: '/about',
//     component: About,
//     exact: false,
//   },
//   {
//     path: '/',
//     component: Home,
//     exact: false
//   },
// ];


export const routeList = [
  {
    path: '/login',
    // component: load('login'),
    meta: {
      requireAuth: false,
      title: '登录'
    }
  },
  ...routerAry
]