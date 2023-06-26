import Antv from 'src/pages/antv';
import Antv1 from 'src/pages/antv1';
import ShrinkExpandG6 from 'src/pages/ShrinkExpandG6';
import ShrinkExpandG61 from 'src/pages/ShrinkExpandG61';

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
  {
    path: '/antv',
    component: Antv,
  },
  {
    path: '/antv1',
    component: Antv1,
  },
  {
    path: '/ShrinkExpandG6',
    component: ShrinkExpandG6
  },
  {
    path: '/ShrinkExpandG61',
    component: ShrinkExpandG61
  },
  ...routerAry
]