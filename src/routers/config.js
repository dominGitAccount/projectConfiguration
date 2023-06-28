
const routerAry = []
// 自动加载modules目录下的 .js 结尾的文件
const requireRouter = require.context("./modules", false, /\.js$/);

requireRouter.keys().forEach(fileName => {
  const routerConfig = requireRouter(fileName);
  routerAry.push(...routerConfig?.routes);
});

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