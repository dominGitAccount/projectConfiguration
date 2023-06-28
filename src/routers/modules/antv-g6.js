import Antv from 'src/pages/Antv-G6/antv';
import Antv1 from 'src/pages/Antv-G6/antv1';
import ShrinkExpandG6 from 'src/pages/Antv-G6/ShrinkExpandG6';
import ShrinkExpandG61 from 'src/pages/Antv-G6/ShrinkExpandG61';
import G6Test1 from 'src/pages/Antv-G6/G6-test1';

export const routes = [
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
  {
    path: '/g6Test1',
    component: G6Test1,
  }
]