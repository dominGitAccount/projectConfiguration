import React from 'react';
import { Spin, Card } from 'antd';
import { useEffect, useRef, useState } from 'react';
import NodeToolTips from './NodeTooltips';
import './TopoTree.less';
import G6 from '@antv/g6-3.5';
import 'src/assets/topo/iconfont/iconfont.css';
import { stringify } from 'qs';

const TopoTree = ({
  tachInfo,
  topoType,
  topologyData,
  topoTreeLoading,
  setTopoTreeLoading,
  tacheParam,
}) => { 
  console.log(topologyData)
  let graph = useRef();

  // 节点tooltip坐标
  const [showNodeTooltip, setShowNodeTooltip] = useState(false);
  const [nodeTooltipX, setNodeToolTipX] = useState(0);
  const [nodeTooltipY, setNodeToolTipY] = useState(0);
  const [nodeInfo, setNodeInfo] = useState();

  useEffect(() => {
    registerNode();
    if (graph.current && (graph.current._cfg || graph.current.cfg)) {
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
        sortByCombo: false,
        ranksep: 10,
        nodesep: 5,
        controlPoints: true,
        nodesepFunc: d => 50,
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
          'drag-canvas',
          'drag-combo',
          {
            type: 'drag-node',
            enableDelegate: true,
          },
          {
            type: 'zoom-canvas',
            // sensitivity: 2,
            minZoom: 0,
          },
          // 如果没有定制化需求，设置了这个可以不用设置combo:dblclick
          // {
          //   type: 'collapse-expand-combo', //支持双击 Combo 收起和展开 Combo ，收起 Combo 以后，隐藏 Combo 中的所有节点
          //   relayout: false,
          // },
        ],
        // default: ['drag-node', 'drag-canvas', 'zoom-canvas'],
      },
      groupByTypes: false,
      defaultCombo: {
        size: [100, 50],
        type: 'cRect',
        style:{
          fillOpacity: 0.1,
          fill: '#99C0ED',
          stroke: '#aaa',
        }
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
      // 跳转至根因分析
      const { name, systemCode } = ev.item._cfg.model;
      const commonParams = {
        systemCode,
        serviceName: name,
        startTime: tacheParam.startTime,
        endTime: tacheParam.endTime,
        dateSwitch: '1',
      };

      let ip = document.referrer;
      if (topoType === 'c') {
        // if (process.env.UMI_ENV === 'core' || !process.env.UMI_ENV) {
        ip = window.location.origin;
        window.open(`${ip}/callchain/#/callchain/callChain/LogSearch?${stringify(commonParams)}`);
        // } else {
        //   window.open(
        //     `${ip}#/thirdPartyPlatform/fullLink?menuModule=${encodeURIComponent(
        //       '全链路日志平台'
        //     )}&menuTitle=${encodeURIComponent('C系统日志搜索')}&thirdLink=${encodeURIComponent(
        //       `${jumpWindowIp}/callchain/#/callchain/callchain/LogSearch`
        //     )}?${qs.stringify(commonParams)}`
        //   );
        // }
      } else {
        // if (process.env.UMI_ENV === 'core' || !process.env.UMI_ENV) {
        ip = window.location.origin;
        window.open(
          `${ip}/callchain/#/callchain/callChain/serviceRootCauseCrossSystem?${stringify(
            commonParams
          )}`
        );
        // } else {
        //   window.open(
        //     `${ip}#/thirdPartyPlatform/fullLink?menuModule=${encodeURIComponent(
        //       '全链路日志平台'
        //     )}&menuTitle=${encodeURIComponent('根因分析')}&thirdLink=${encodeURIComponent(
        //       `${jumpWindowIp}/callchain/#/callchain/callchain/serviceRootCauseCrossSystem`
        //     )}?${qs.stringify(commonParams)}`
        //   );
        // }
      }
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

    // 双击combo
    graph.current.on("combo:dblclick", (e) => {
      // e.item就是当前点击的combo实例;  
      graph.current?.collapseExpandCombo(e.item); //展开或收起当前combo
      if (!e.item._cfg.model.collapsed) {  //当前combo是展开状态
        //combo.getCombos获取当前combo下所有的子combo
        let childCombos = e.item.getCombos();
        childCombos?.forEach((combo) => {
          if (!combo._cfg.model.collapsed) { //如果子combo是展开状态，收起子combo
            graph.current?.collapseExpandCombo(combo || '');
          }
        })
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
          let stroke =  icon[3]
          const shape = group.addShape('rect', {
            attrs: {
              x: -100,
              y: -50,
              width: 200,
              height: 120,
              radius: 10,
              stroke,
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
        // setState(name, value, item) {
        //   alert('setState2');

        //   const group = item.getContainer();
        //   const shape = group.get('children')[0];
        //   switch (name) {
        //     case 'selected':
        //     case 'inSelected':
        //     case 'outSelected':
        //       {
        //         if (value) {
        //           shape.attr('fill', '#6C7B7E');
        //         } else {
        //           shape.attr('fill', 'transparent');
        //         }
        //       }
        //       break;
        //   }
        // },
      },
      'rect'
    );

    G6.registerCombo('cRect', {
      drawShape: function drawShape(cfg, group) {
        const self = this;
        cfg.padding = cfg.padding || [50, 20, 20, 20];
        const style = self.getShapeStyle(cfg);
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
        return rect;
      },
      afterUpdate: function afterUpdate(cfg, combo) {
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
    <Spin size="large" wrapperClassName={'containerSpin'} spinning={setTopoTreeLoading}>
      <Card className={'card'} title={<span>【{tachInfo.systemName}】层级拓扑</span>}>
        <div className={'topoTree'}>
          <div key="2" id="topology" className={'topoTreeMain'}>
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
