import React from 'react';
import { Spin, Card } from 'antd';
import { useEffect, useRef, useState } from 'react';
import NodeToolTips from './NodeTooltips';
import './TopoTree.less';
import G6 from '@antv/g6-3.5';
import 'src/assets/topo/iconfont/iconfont.css';

const TopoTree = ({
  tachInfo,
  topologyData,
  setTopoTreeLoading,
}) => {

  const collapseIcon = (x, y, r) => {
    return [
      ['M', x - r, y],
      ['a', r, r, 0, 1, 0, r * 2, 0],
      ['a', r, r, 0, 1, 0, -r * 2, 0],
      ['M', x - r + 4, y],
      ['L', x - r + 2 * r - 4, y],
    ];
  };
  const expandIcon = (x, y, r) => {
    return [
      ['M', x - r, y],
      ['a', r, r, 0, 1, 0, r * 2, 0],
      ['a', r, r, 0, 1, 0, -r * 2, 0],
      ['M', x - r + 4, y],
      ['L', x - r + 2 * r - 4, y],
      ['M', x - r + r, y - r + 4],
      ['L', x, y + r - 4],
    ];
  };

  let graph = useRef();

  // 节点tooltip坐标
  const [showNodeTooltip, setShowNodeTooltip] = useState(false);
  const [nodeTooltipX, setNodeToolTipX] = useState(0);
  const [nodeTooltipY, setNodeToolTipY] = useState(0);
  const [nodeInfo, setNodeInfo] = useState();

  useEffect(() => {
    registerNode();
    if (graph.current && graph.current._cfg) {
      graph.current.destroy();
      graph.current = null;
    }
    if (
      topologyData &&
      topologyData.edges &&
      topologyData.nodes &&
      topologyData.edges.length > 0 &&
      topologyData.nodes.length > 0
    ) {
      console.log('topologyData', topologyData)
      let data = {  //定义一个数组就是这组图中需要传入的数据，包含节点、分组及边的信息
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
      }
      initTopo(topologyData);
    }
  }, [topologyData]);

  const initTopo = nodeData => {
    if (!nodeData || !nodeData.edges || !nodeData.nodes) {
      // g6低版本 当为空数据时候，如果配置了 fitView 就会报错。此处特殊处理
      return;
    }
    if (nodeData.nodes.length === 0 || nodeData.edges.length === 0) {
      // g6低版本 当为空数据时候，如果配置了 fitView 就会报错。此处特殊处理
      return;
    }

    let width = document.getElementById('topology').offsetWidth;
    let height = document.getElementById('topology').offsetHeight - 90 || 350;

    graph.current = new G6.Graph({
      container: document.getElementById('topology'),
      width: width,
      height: height,
      renderer: 'svg',
      fitView: true,
      fitViewPadding: 0,
      minZoom: 0,
      maxZoom: 2,
      layout: {
        type: 'dagre',
        ranksep: 10,
        nodesep: 5,
        controlPoints: true,
        nodesepFunc: d => 50, //元素之间的间距
        ranksepFunc: d => 160,
      },
      defaultNode: {
        shape: 'operationTopo',
        style: {},
        size: [200, 120],
        labelCfg: {
          style: {
            fill: '#000', //节点标签文字颜色
            fontSize: 20,
            cursor: 'pointer',
            shadowColor: '#000',
            shadowOffsetX: 4,
            shadowOffsetY: 4,
            shadowBlur: 6,
            userSelect: 'none',
          },
        },
      },
      defaultEdge: {
        shape: 'can-running',
        style: {
          lineWidth: 2,
          opacity: 0.3,
          stroke: '#000',
          endArrow: true,
        },
        labelCfg: {
          style: {
            fill: '#000',
            fontSize: 20,
            shadowColor: '#000',
            shadowOffsetX: 5,
            shadowOffsetY: 5,
            shadowBlur: 10,
            cursor: 'pointer',
          },
        },
        animate: true,
      },
      modes: {
        default: [
          // 'drag-combo',
          'drag-canvas',
          {
            type: 'drag-node',
            enableDelegate: true,
          },
          {
            type: 'zoom-canvas',
            // sensitivity: 2,
            minZoom: 0,
          },
        ],
      },
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
    });

    graph.current.data(nodeData);
    graph.current.render();
    graph.current.fitView();
    graph.current.get('canvas').set('supportCSSTransform', true);
    // 图谱节点双击事件
    graph.current.on('node:dblclick', ev => {
    });

    graph.current.on('node:mouseenter', ev => {
      // 线效果
      // 获得当前鼠标操作的目标节点
      const node = ev.item;
      // 获得目标节点的所有相关边
      const edges = node.getEdges();
      // 将所有相关边的 running 状态置为 true，此时将会触发自定义节点的 setState 函数
      edges.forEach(edge => graph.current.setItemState(edge, 'running', true));

      // 节点tooltip效果
      const { item } = ev;
      const model = item.getModel();
      console.log(model)
      const { x, y } = model;
      const point = graph.current.getCanvasByPoint(x, y);
      setNodeInfo(ev.item._cfg.model);
      setNodeToolTipX(point.x - 100);
      setNodeToolTipY(point.y - 150);
      // setShowNodeTooltip(true);
    });

    // 监听节点的 mouseleave 事件
    graph.current.on('node:mouseleave', ev => {
      // 获得当前鼠标操作的目标节点
      const node = ev.item;
      // 获得目标节点的所有相关边
      const edges = node.getEdges();
      // 将所有相关边的 running 状态置为 false，此时将会触发自定义节点的 setState 函数
      edges.forEach(edge => graph.current.setItemState(edge, 'running', false));
      setShowNodeTooltip(false);
    });

    // 点击combo的收缩icon
    graph.current.on('combo:click', e => {
      if (e.target.get('name') === 'combo-marker-shape') {
        // graph.current.collapseExpandCombo(e.item.getModel().id);
        graph.current.collapseExpandCombo(e.item);
        // if (graph.current.get('layout')) graph.current.layout();
        // else graph.current.refreshPositions();
      }
    });
  
    graph.current.on('combo:dragend', e => {
      graph.current.getCombos().forEach(combo => {
        graph.current.setItemState(combo, 'dragenter', false);
      })
    });
    graph.current.on('node:dragend', e => {
      graph.current.getCombos().forEach(combo => {
        graph.current.setItemState(combo, 'dragenter', false);
      })
    });
  
    graph.current.on('combo:dragenter', e => {
      graph.current.setItemState(e.item, 'dragenter', true);
    });
    graph.current.on('combo:dragleave', e => {
      graph.current.setItemState(e.item, 'dragenter', false);
    });

    graph.current.on("combo:dblclick", (e) => {
      // e.item._cfg.model.type = e.item._cfg.model.type === "rect" ? "circle" : "rect";  // 分组形状，方圆切换
      // e.item._cfg.model.labelCfg.refY = e.item._cfg.model.type === "rect" ? -20 : 5;   // 切换形状，改变label定位

      const comboId = e.item._cfg.model.id;
      console.log(comboId)
      graph.current?.collapseExpandCombo(comboId || '');

      // 分组收缩时,删除分组内的连线和节点
      if (e.item._cfg.model.collapsed) {   // 收缩 
        let newedges = e.item.getEdges();
        let newNodes = e.item.getNodes();
        for (let j = 0; j < newedges.length; j++) {
          graph.current.removeItem(newedges[j]);
        }
        for (let i = 0; i < newNodes.length; i++) {
          graph.current.removeItem(newNodes[i]);
        }
        topologyData.edges.forEach(edge => {
          graph.current.addItem("edge", edge);
        });
      } else {   // 展开
        // 分组展开时, 添加节点和连线，并给分组内的节点 添加位置信息
        let origin = [e.item._cfg.model.x, e.item._cfg.model.y];  // 获取当前分组combs的坐标
        let row = 110, clo = 150;
        // 生成(10-20)随机数个 随机数 模拟展开分组内的节点
        let randomCount = Math.floor(Math.random() * 10) + 10;
        let row_clo = Math.floor(Math.sqrt(randomCount));
        let nodes = []
        for (let i = 0; i < randomCount; i++) {
          let min = comboId.split('-')[0] - 0
          let max = comboId.split('-')[1] - 0
          let randomNum = Math.floor(Math.random() * (max - min)) + min;
          if (nodes.indexOf(randomNum) > -1) {
            i--
            continue;
          }
          nodes.push(randomNum)
          let rowindex = Math.floor(i / row_clo);
          let cloindex = i % row_clo;
          let y = origin[1] + row * rowindex
          let node = {
            label: randomNum,
            id: randomNum.toString(),
            comboId: comboId,
            style: {
              fillOpacity: 0.5,
              cursor: "pointer",
              fill: randomNum % 5 == 0 ? "#81C7D4" : "#986DB2"
            },
            x: origin[0] + clo * cloindex,
            y: i % 2 == 0 ? y + 40 : y
          }
          graph.current.addItem("node", node); // 将节点添加至分组 
        }
        nodes.sort((a, b) => a - b)  // 将分组内的数字排序，从小到大依次连接，模拟真实数据
        for (let i = 0; i < nodes.length - 1; i++) {
          let edge = {
            source: nodes[i].toString(),
            target: nodes[i + 1].toString(),
            lineWidth: 1,
            style: {
              lineDash: [2, 2],
              lineWidth: 0.5,
              stroke: "#00AA90"
            }
          }
          graph.current.addItem("edge", edge);  // 添加连线   将分组内的数字排序，从小到大依次连接
        }
      }
    });

  };

  const registerNode = () => {
    var dashArray = [
      [0, 1],
      [0, 2],
      [1, 2],
      [0, 1, 1, 2],
      [0, 2, 1, 2],
      [1, 2, 1, 2],
      [2, 2, 1, 2],
      [3, 2, 1, 2],
      [4, 2, 1, 2],
    ];

    var lineDash = [4, 2, 1, 2];
    var interval = 9;
    // 线
    G6.registerEdge(
      'can-running',
      {
        setState: function setState(name, value, item) {
          var shape = item.get('keyShape');
          if (name === 'running') {
            if (value) {
              var length = shape.getTotalLength(); // 后续 G 增加 totalLength 的接口
              var totalArray = [];
              for (var i = 0; i < length; i += interval) {
                totalArray = totalArray.concat(lineDash);
              }
              var index = 0;
              shape.animate(
                {
                  onFrame: function onFrame(ratio) {
                    var cfg = {
                      lineDash: dashArray[index].concat(totalArray),
                    };
                    index = (index + 1) % interval;
                    return cfg;
                  },
                  repeat: true,
                },
                3000
              );
              shape.attr('opacity', 1);
            } else {
              shape.stopAnimate();
              shape.attr('opacity', 0.3);
              shape.attr('lineDash', null);
            }
          }
        },
        afterDraw(cfg, group) {
          if (group.get('item')._cfg.model && group.get('item')._cfg.model.isAnimate) {
            const shape = group.get('children')[0];
            var length = shape.getTotalLength(); // 后续 G 增加 totalLength 的接口
            var totalArray = [];
            for (var i = 0; i < length; i += interval) {
              totalArray = totalArray.concat(lineDash);
            }
            var index = 0;
            shape.animate(
              {
                onFrame: function onFrame(ratio) {
                  var cfg = {
                    lineDash: dashArray[index].concat(totalArray),
                  };
                  index = (index + 1) % interval;
                  return cfg;
                },
                repeat: true,
              },
              3000
            );
            setTimeout(
              shape => {
                try {
                  shape.stopAnimate();
                  shape.attr('lineDash', null);
                } catch (e) {
                  console.log(e);
                }
              },
              3000,
              shape
            );
          }
        },
      },
      'line'
    );

    G6.registerNode(
      'operationTopo',
      {
        options: {
          style: {},
          stateStyles: {
            hover: {},
            selected: {},
          },
        },
        draw(cfg, group) {
          const icon = setNodeIcon(cfg.applicationServiceType, cfg.isWarning, cfg.objType);
          const shape = group.addShape('rect', {
            attrs: {
              x: -100,
              y: -50,
              width: 200,
              height: 120,
              radius: 10,
              stroke: icon[3],
              fill: 'transparent',
              lineWidth: 3,
              cursor: 'pointer',
            },
          });
          if (cfg.id) {
            group.addShape('text', {
              attrs: {
                x: 0,
                y: 50,
                fontSize: 15,
                textAlign: 'center',
                textBaseline: 'middle',
                text: cfg.label ? cfg.label : cfg.serviceName,
                fill: '#000',
              },
            });
          }
          group.addShape('text', {
            attrs: {
              x: 0,
              y: 30,
              fontFamily: 'iconfont',
              textAlign: 'center',
              text: icon[0],
              fill: icon[1],
              fontSize: icon[2] / 1.2,
            },
          });
          return shape;
        },
      },
      'rect'
    );

    G6.registerCombo('cRect', {
      drawShape: function drawShape(cfg, group) {
        const self = this;
        // Get the padding from the configuration
        cfg.padding = cfg.padding || [50, 20, 20, 20];
        // Get the shape's style, where the style.width and style.height correspond to the width and height in the figure of Illustration of Built-in Rect Combo
        const style = self.getShapeStyle(cfg);
        // Add a rect shape as the keyShape which is the same as the extended rect Combo
        const rect = group.addShape('rect', {
          attrs: {
            ...style,
            x: -style.width / 2 - (cfg.padding[3] - cfg.padding[1]) / 2,
            y: -style.height / 2 - (cfg.padding[0] - cfg.padding[2]) / 2,
            width: style.width,
            height: style.height
          },
          draggable: true,
          name: 'combo-keyShape'
        });
        // 展开收缩的icon
        // group.addShape('marker', {
        //   attrs: {
        //     ...style,
        //     fill: '#fff',
        //     opacity: 1,
        //     // cfg.style.width and cfg.style.heigth correspond to the innerWidth and innerHeight in the figure of Illustration of Built-in Rect Combo
        //     x: cfg.style.width / 2 + cfg.padding[1],
        //     y: (cfg.padding[2] - cfg.padding[0]) / 2,
        //     r: 10,
        //     symbol: collapseIcon
        //   },
        //   draggable: true,
        //   name: 'combo-marker-shape'
        // });
        return rect;
      },
      // Define the updating logic of the right circle
      afterUpdate: function afterUpdate(cfg, combo) {
        console.log(cfg.collapsed,combo)
        const group = combo.get('group');
        // Find the circle shape in the graphics group of the Combo by name
        const marker = group.find(ele => ele.get('name') === 'combo-marker-shape');
        // Update the position of the right circle
        // marker.attr({
        //   // cfg.style.width and cfg.style.heigth correspond to the innerWidth and innerHeight in the figure of Illustration of Built-in Rect Combo
        //   x: cfg.style.width / 2 + cfg.padding[1],
        //   y: (cfg.padding[2] - cfg.padding[0]) / 2,
        //   // The property 'collapsed' in the combo data represents the collapsing state of the Combo
        //   // Update the symbol according to 'collapsed'
        //   symbol: cfg.collapsed ? expandIcon : collapseIcon
        // });
      }
    }, 'rect');
  };
  const setNodeIcon = (type, isWarning, objType) => {
    let nodeIcon = [];
    if (type) {
      type = type.toString();
    } else {
      type = '';
    }
    switch (type) {
      case '0':
        nodeIcon = ['&#xe858;', '#A4E8EA', 80];
        break; //user
      case '8200':
      case '8201':
      case '8203':
        nodeIcon = ['&#xe619;', '#7DB5DA', 80];
        break; //redis
      case '2300':
      case '2301':
        nodeIcon = ['&#xe60d;', '#31C5B3', 80];
        break; //oracle
      case '1000':
      case '1010':
      case '1100':
      case '1210':
      case '9052':
      case '9055':
      case '9152':
      case '9153':
        nodeIcon = ['&#xe642;', '#24B3BA', 80];
        break; //tomcat
      case '2200':
      case '2201':
        nodeIcon = ['&#xe6c3;', '#0A5FB0', 74];
        break; //mssql
      case '2100':
      case '2101':
        nodeIcon = ['&#xe627;', '#6191E3', 90];
        break; //mysql
      case '2500':
      case '2501':
        nodeIcon = ['&#xec5d;', '#6191E3', 90];
        break; //pgsql
      case '8800':
        nodeIcon = ['&#xe65c;', '#528DBD', 80];
        break; //hbase
      case '2651':
        nodeIcon = ['&#xe66c;', '#008060', 80];
        break; //MongoDB
      case '8660':
        nodeIcon = ['&#xe65a;', '#0F6DB5', 80];
        break; //kafka
      case '9204':
        nodeIcon = ['&#xe6a1;', '#528DBD', 80];
        break; //ElasticSearch
      case '9502':
        nodeIcon = ['&#xe8f4;', '#528DBD', 80];
        break; //CK
      case '8410':
        nodeIcon = ['&#xeb40;', '#19CFFD', 80];
        break; //MQ
      case '9997':
        nodeIcon = ['&#xe684;', '#19CFFD', 80];
        break; //ZK
      case '':
        nodeIcon = ['&#xe67a;', '#19CFFD', 80];
        break; // C系统
      default:
        nodeIcon = ['&#xe625;', '#1296DB', 100];
        break; //unknown
    }

    // 默认
    nodeIcon[1] = '#00dae6';
    nodeIcon[3] = nodeIcon[1];

    // objType，所属服务层
    if (objType === 'PAAS') {
      nodeIcon[1] = '#337cff';
      nodeIcon[3] = nodeIcon[1];
    } else if (objType === 'IAAS') {
      nodeIcon[1] = '#9999ff';
      nodeIcon[3] = nodeIcon[1];
    }

    // 告警优先
    switch (isWarning + '') {
      case '2':
        nodeIcon[1] = '#e6312e';
        nodeIcon[3] = '#e6312e';
        break;
      case '1':
        nodeIcon[1] = '#e67700';
        nodeIcon[3] = '#e67700';
        break;
      default:
        // nodeIcon[1] = '#00dae6';
        // nodeIcon[3] = nodeIcon[1];
        break;
    }
    return nodeIcon;
  };

  return (
    <Spin size="large" wrapperClassName='containerSpin' spinning={setTopoTreeLoading}>
      <Card className='card' title={<span>【{tachInfo.systemName}】层级拓扑</span>}>
        <div className='topoTree'>
          <div key="2" id="topology" className='topoTreeMain'>
            {showNodeTooltip && (
              <NodeToolTips nodeInfo={nodeInfo} x={nodeTooltipX} y={nodeTooltipY} />
            )}
          </div>
        </div>
      </Card>
    </Spin>
  );
};

export default TopoTree;
