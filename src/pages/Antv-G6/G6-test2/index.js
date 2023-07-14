import React, { useEffect, useRef } from 'react';
import G6 from '@antv/g6-3.5';
import './index.less';
import { data } from './data';

const G6Test1 = () => {

  let graph = useRef();

  useEffect(() => {
    if (graph.current && graph.current.cfg) {
      graph.current.destroy();
      graph.current = null;
    }

    const width = 800;
    const height = 500;
    graph.current = new G6.TreeGraph({
      container: 'mountNode',
      width,
      height,
      modes: {
        default: [
          {
            type: 'collapse-expand',
            onChange: function onChange(item, collapsed) {
              const data = item.getModel();
              data.collapsed = collapsed;
              return true;
            },
          },
          'drag-canvas',
          'zoom-canvas',
        ],
      },
      defaultNode: {
        size: 26,
        anchorPoints: [
          [0, 0.5],
          [1, 0.5],
        ],
      },
      defaultEdge: {
        type: 'cubic-horizontal',
      },
      layout: {
        type: 'compactBox',
        direction: 'LR',
        getId: function getId(d) {
          return d.id;
        },
        getHeight: function getHeight() {
          return 16;
        },
        getWidth: function getWidth() {
          return 16;
        },
        getVGap: function getVGap() {
          return 10;
        },
        getHGap: function getHGap() {
          return 100;
        },
      },
    });

    graph.current.node(function (node) {
      return {
        label: node.id,
        labelCfg: {
          offset: 10,
          position: node.children && node.children.length > 0 ? 'left' : 'right',
        },
      };
    });

    graph.current.data(data);
    graph.current.render();
    graph.current.fitView();

  }, [])

  return (
    // 创建一个canvas的容器
    <div id="mountNode"></div>
  )

}
export default G6Test1;