import React from 'react';
import G6 from '@antv/g6-3.5';
import { useEffect, useRef } from 'react';
import { renderMap } from './renderMap';

const TopoTree = () => {

  let graph = useRef();

  useEffect(() => {
    if (graph.current && graph.current._cfg) {
      graph.current.destroy();
      graph.current = null;
    }
    initTopo();
  }, []);

  const initTopo = () => {

    let data_map = {  //定义一个数组就是这组图中需要传入的数据，包含节点、分组及边的信息
      nodes: [
        { id: 'node2', x: 300, y: 200, label: 'i系统', comboId: 'combo2' },
        { id: 'node4', x: 300, y: 300, label: 'i系统', comboId: 'combo4' },
        { id: 'node5', x: 300, y: 400, label: 'i系统', comboId: 'combo4' },

        { id: 'node3', x: 100, y: 200, label: '数据工厂系统', comboId: 'combo3' },
        { id: 'node1', x: 500, y: 200, label: '数据工厂系统' },

      ],
      combos: [
        { id: 'combo2', label: 'Combo 2' },
        { id: 'combo3', label: 'Combo 3' },
        // { id: 'combo1', label: 'Combo 1' },
        { id: 'combo4', label: 'Combo 4', parentId: 'combo2' },
      ],
      edges: [
        {
          source: 'node3',
          target: 'node5',
        },
        {
          source: 'node1',
          target: 'node2',
        },
      ],
    };

    graph.current = new G6.Graph({
      container: 'container',
      width: 1000,
      height: 500,
      groupByTypes: false,
      defaultCombo: {
        type: 'cRect',
      },
      comboStateStyles: {
        dragenter: {
          lineWidth: 4,
          stroke: '#FE9797'
        }
      },
      defaultEdge: {
        type: 'line-arrow',
        style: {
          stroke: '#F6BD16',
          endArrow: {
            path: 'M 0,0 L 12,6 L 9,0 L 12,-6 Z',
            fill: '#F6BD16',
          },
        },
      },
      defaultNode: {
        type: 'rect',
        size: [110, 40],
        style: {
          fill: '#9EC9FF',
          stroke: '#5B8FF9',
          lineWidth: 3,
        },
        labelCfg: {
          style: {
            fill: '#fff',
            fontSize: 14,
          },
        },
        linkPoints: {
          left: true,
          right: true,
          size: 10,
          fill: '#fff',
          lineWidth: 1,
          stroke: '#1890FF',
        },
      },
      modes: {
        default: [
          'drag-combo',
          'drag-node',
          'drag-canvas'
        ]
      }
    })

    renderMap(data_map, graph) //所有参数准备好之后，调用刚才封装的渲染函数去渲染组件

  };

  return (
    <div id="container" ></div>
  );
};

export default TopoTree;
