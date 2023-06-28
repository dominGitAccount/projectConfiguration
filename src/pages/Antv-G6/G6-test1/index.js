import React, { useEffect } from 'react';
import G6 from '@antv/g6-3.5';
import './index.less';
// import { data } from './data';

const G6Test1 = () => {

  useEffect(() => {
    // 实例化 minimap 插件，实现缩略图功能
    const minimap = new G6.Minimap({
      size: [100, 100],
      className: 'minimap',
      type: 'delegate',
    });

    // 实例化 grid 插件
    const grid = new G6.Grid();

    // 创建关系图
    const graph = new G6.Graph({
      container: 'mountNode', // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
      width: 800, // Number，必须，图的宽度
      height: 500, // Number，必须，图的高度
      /**复杂的布局系统会打破适配的规则，反而会造成更多的困扰----取消自动适配画布 */
      // fitView: true, //设置是否将图适配到画布中,可以防止超出画布或留白太多。
      // fitViewPadding: [20, 40, 50, 20], //画布上的四周留白宽度。
      animate: true, // Boolean，可选，全局变化时否使用动画过渡
      // 使用的其他插件
      plugins: [minimap, grid], // 将 minimap 实例配置到图上
      //节点在除默认状态外，其他状态下的样式属性（style）。例如鼠标放置（hover）、选中（select）等状态
      nodeStateStyles: {
        // 鼠标 hover 上节点，即 hover 状态为 true 时的样式
        hover: {
          fill: 'lightsteelblue', //节点颜色变浅
        },
        // 鼠标点击节点，即 click 状态为 true 时的样式
        click: {
          stroke: '#000', //节点边框变黑
          lineWidth: 3, //节点边框加粗
        },
      },
      //边在除默认状态外，其他状态下的样式属性（style）。例如鼠标放置（hover）、选中（select）等状态。
      edgeStateStyles: {
        // 鼠标点击边，即 click 状态为 true 时的样式
        click: {
          stroke: 'steelblue', //点击边时变为蓝色
        },
      },
      /**设置布局样式--- 一般图，树图等 */
      layout: {
        // Object，可选，布局的方法及其配置项，默认为 random 布局。
        type: 'force', // 指定为力导向布局
        preventOverlap: true, // 防止节点重叠
        // nodeSize: 30        // 节点大小，用于算法中防止节点重叠时的碰撞检测。由于已经在上一节的元素配置中设置了每个节点的 size 属性，则不需要在此设置 nodeSize。
        linkDistance: 200, // 指定边距离为100
      },
      // 节点在默认状态下的样式配置（style）和其他配置
      defaultNode: {
        type: 'star', //节点的形状 circle，rect，ellipse，diamond，triangle，star，image，modelRect，donut
        size: 30, // 节点大小
        // ...                 // 节点的其他配置
        // 节点样式配置
        style: {
          fill: 'steelblue', // 节点填充色
          stroke: '#666', // 节点描边色
          lineWidth: 1, // 节点描边粗细
        },
        // 节点上的标签文本配置
        labelCfg: {
          // 节点上的标签文本样式配置
          style: {
            fill: '#fff', // 节点标签文字颜色
          },
        },
      },
      // 边在默认状态下的样式配置（style）和其他配置
      defaultEdge: {
        // ...                 // 边的其他配置
        // // 边样式配置
        // style: {
        //   opacity: 0.6, // 边透明度
        //   stroke: 'grey', // 边描边颜色
        // },
        // 边上的标签文本配置
        labelCfg: {
          autoRotate: true, // 边上的标签文本根据边的方向旋转
        },
      },
      // 交互管理-交互行为的集合
      modes: {
        default: [
          'drag-canvas',
          'zoom-canvas',
          'drag-node',
          // 配置鼠标悬浮节点时显示的文字
          {
            type: 'tooltip', // 提示框
            formatText(model) {
              // 提示框文本内容
              const text = 'label: ' + model.label + '<br/> class: ' + model.class;
              return text;
            },
          },
          // 配置鼠标悬浮边时显示的文字
          {
            type: 'edge-tooltip', // 边提示框
            formatText(model) {
              // 边提示框文本内容
              const text =
                'source: ' +
                model.source +
                '<br/> target: ' +
                model.target +
                '<br/> weight: ' +
                model.weight;
              return text;
            },
          },
        ], // 允许拖拽画布、放缩画布、拖拽节点
        edit: [], // [] - 编辑模式不允许进行任何交互行为
      },
    });

    // 注册节点shape 放大、变小动画
    G6.registerNode(
      'circle-animate',
      {
        afterDraw(cfg, group) {
          // 获取该节点上的第一个图形
          const shape = group.get('children')[0];
          // 该图形的动画
          shape.animate(
            (ratio) => {
              // 每一帧的操作，入参 ratio：这一帧的比例值（Number）。返回值：这一帧需要变化的参数集（Object）。
              // 先变大、再变小
              const diff = ratio <= 0.5 ? ratio * 10 : (1 - ratio) * 10;
              let radius = cfg.size;
              if (isNaN(radius)) radius = radius[0];
              // 返回这一帧需要变化的参数集，这里只包含了半径
              return {
                r: radius / 2 + diff,
              };
            },
            {
              // 动画重复
              repeat: true,
              duration: 3000,
              easing: 'easeCubic',
            },
          ); // 一次动画持续的时长为 3000，动画效果为 'easeCubic'
        },
      },
      'circle',
    ); // 该自定义节点继承了内置节点 'circle'，除了被复写的 afterDraw 方法外，其他按照 'circle' 里的函数执行。

    // 增加带有动画的背景图形
    G6.registerNode(
      'background-animate',
      {
        afterDraw(cfg, group) {
          let r = cfg.size / 2;
          if (isNaN(r)) {
            r = cfg.size[0] / 2;
          }
          // 第一个背景圆
          const back1 = group.addShape('circle', {
            zIndex: -3,
            attrs: {
              x: 0,
              y: 0,
              r,
              fill: cfg.color,
              opacity: 0.6,
            },
            // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
            name: 'circle-shape1',
          });
          // 第二个背景圆
          const back2 = group.addShape('circle', {
            zIndex: -2,
            attrs: {
              x: 0,
              y: 0,
              r,
              fill: 'blue', // 为了显示清晰，随意设置了颜色
              opacity: 0.6,
            },
            // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
            name: 'circle-shape2',
          });
          // 第三个背景圆
          const back3 = group.addShape('circle', {
            zIndex: -1,
            attrs: {
              x: 0,
              y: 0,
              r,
              fill: 'green',
              opacity: 0.6,
            },
            // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
            name: 'circle-shape3',
          });
          group.sort(); // 排序，根据 zIndex 排序

          // 第一个背景圆逐渐放大，并消失
          back1.animate(
            {
              r: r + 10,
              opacity: 0.1,
            },
            {
              repeat: true, // 循环
              duration: 3000,
              easing: 'easeCubic',
              delay: 0, // 无延迟
            },
          );

          // 第二个背景圆逐渐放大，并消失
          back2.animate(
            {
              r: r + 10,
              opacity: 0.1,
            },
            {
              repeat: true, // 循环
              duration: 3000,
              easing: 'easeCubic',
              delay: 1000, // 1 秒延迟
            },
          ); // 1 秒延迟

          // 第三个背景圆逐渐放大，并消失
          back3.animate(
            {
              r: r + 10,
              opacity: 0.1,
            },
            {
              repeat: true, // 循环
              duration: 3000,
              easing: 'easeCubic',
              delay: 2000, // 2 秒延迟
            },
          );
        },
      },
      'circle',
    );

    // 注册边的shape--设置虚线运动的效果
    // lineDash 的差值，可以在后面提供 util 方法自动计算
    const lineDash = [4, 2, 1, 2];
    G6.registerEdge(
      'line-dash',
      {
        afterDraw(cfg, group) {
          // 获得该边的第一个图形，这里是边的 path
          const shape = group.get('children')[0];
          let index = 0;
          // 边 path 图形的动画
          shape.animate(
            () => {
              index++;
              if (index > 9) {
                index = 0;
              }
              const res = {
                lineDash,
                lineDashOffset: -index,
              };
              // 返回需要修改的参数集，这里修改了 lineDash,lineDashOffset
              return res;
            },
            {
              repeat: true, // 动画重复
              duration: 3000, // 一次动画的时长为 3000
            },
          );
        },
      },
      'cubic',
    ); // 该自定义边继承了内置三阶贝塞尔曲线边 cubic

    // 设置从有到无的效果
    G6.registerEdge(
      'line-growth',
      {
        afterDraw(cfg, group) {
          console.log('group', group.getTotalLength)
          const shape = group.get('children')[0];
          // const length = group.getTotalLength();
          const length = 100;
          shape.animate(
            (ratio) => {
              const startLen = ratio * length;
              // 计算 lineDash
              const cfg = {
                lineDash: [startLen, length - startLen],
              };
              return cfg;
            },
            {
              repeat: true, // 是否重复执行
              duration: 2000, // 一次动画持续时长
            },
          );
        },
      },
      'cubic',
    ); // 该自定义边继承了内置三阶贝塞尔曲线边 cubic


    // 注册名为 'can-running' 的边
    G6.registerEdge(
      'can-running',
      {
        // 复写setState方法
        setState(name, value, item) {
          const shape = item.get('keyShape');
          // 监听 running 状态
          if (name === 'running') {
            // running 状态为 true 时
            if (value) {
              let index = 0; // 边 path 图形的动画
              shape.animate(
                () => {
                  index++;
                  if (index > 9) {
                    index = 0;
                  }
                  const res = {
                    lineDash,
                    lineDashOffset: -index,
                  };
                  // 返回需要修改的参数集，这里修改了 lineDash,lineDashOffset
                  return res;
                },
                {
                  repeat: true, // 动画重复
                  duration: 3000, // 一次动画的时长为 3000
                },
              );
            } else {
              // running 状态为 false 时
              // 结束动画
              shape.stopAnimate();
              // 清空 lineDash
              shape.attr('lineDash', null);
            }
          }
        },
      },
      'cubic-horizontal',
    ); // 该自定义边继承了内置横向三阶贝塞尔曲线边 cubic-horizontal

    // 监听节点的 mouseenter 事件
    graph.on('node:mouseenter', (ev) => {
      // 获得当前鼠标操作的目标节点
      const node = ev.item;
      // 获得目标节点的所有相关边
      const edges = node.getEdges();
      // 将所有相关边的 running 状态置为 true，此时将会触发自定义节点的 setState 函数
      edges.forEach((edge) => graph.setItemState(edge, 'running', true));
    });

    // 监听节点的 mouseleave 事件
    graph.on('node:mouseleave', (ev) => {
      // 获得当前鼠标操作的目标节点
      const node = ev.item;
      // 获得目标节点的所有相关边
      const edges = node.getEdges();
      // 将所有相关边的 running 状态置为 false，此时将会触发自定义节点的 setState 函数
      edges.forEach((edge) => graph.setItemState(edge, 'running', false));
    });


    // graph.data(data); // 读取数据渲染到图上
    // graph.render(); // 渲染图

    // 加载远程的数据
    const main = async () => {
      const response = await fetch(
        'https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json',
      );
      const remoteData = await response.json();

      // 遍历节点数据
      const nodes = remoteData.nodes;
      nodes.forEach((node) => {
        if (!node.style) {
          node.style = {};
        }
        switch (
        node.class // 根据节点数据中的 class 属性配置图形
        ) {
          case 'c0': {
            node.type = 'circle'; // class = 'c0' 时节点图形为 circle
            node.shape = 'circle-animate'; //自定义的节点shape类型
            break;
          }
          case 'c1': {
            node.type = 'rect'; // class = 'c1' 时节点图形为 rect
            node.size = [35, 20]; // class = 'c1' 时节点大小
            node.shape = 'background-animate'; //自定义的节点shape类型
            break;
          }
          case 'c2': {
            node.type = 'star'; // class = 'c2' 时节点图形为 ellipse
            node.size = [35, 20]; // class = 'c2' 时节点大小
            break;
          }
          default:
            break;
        }
      });

      // 遍历边数据
      const edges = remoteData.edges;
      edges.forEach((edge) => {
        if (!edge.style) {
          edge.style = {};
        }
        edge.style.lineWidth = edge.weight; // 边的粗细映射边数据中的 weight 属性数值
        // 设置完上面边样式之后，全局配置的defaultEdge中的style效果失效，需要将配置移到此处
        edge.style.opacity = 0.6;
        edge.style.stroke = 'grey';
        // edge.shape = 'line-dash';
        edge.shape = 'line-growth';
        edge.shape = 'can-running';
      });

      // 配置数据源，渲染
      graph.data(remoteData);
      graph.render(); // 渲染图
    };
    main();

    /**一下方法配合edgeStateStyles及 nodeStateStyles 可以实现不同状态下边及节点的样式改变*/
    /**监听事件，并切换元素的状态 */
    // // 鼠标进入节点
    // graph.on('node:mouseenter', (e) => {
    //   const nodeItem = e.item; // 获取鼠标进入的节点元素对象
    //   graph.setItemState(nodeItem, 'hover', true); // 设置当前节点的 hover 状态为 true
    // });

    // // 鼠标离开节点
    // graph.on('node:mouseleave', (e) => {
    //   const nodeItem = e.item; // 获取鼠标离开的节点元素对象
    //   graph.setItemState(nodeItem, 'hover', false); // 设置当前节点的 hover 状态为 false
    // });

    // 点击节点
    graph.on('node:click', (e) => {
      // 先将所有当前是 click 状态的节点置为非 click 状态
      const clickNodes = graph.findAllByState('node', 'click');
      clickNodes.forEach((cn) => {
        graph.setItemState(cn, 'click', false);
      });
      const nodeItem = e.item; // 获取被点击的节点元素对象
      graph.setItemState(nodeItem, 'click', true); // 设置当前节点的 click 状态为 true
    });

    // 点击边
    graph.on('edge:click', (e) => {
      // 先将所有当前是 click 状态的边置为非 click 状态
      const clickEdges = graph.findAllByState('edge', 'click');
      clickEdges.forEach((ce) => {
        graph.setItemState(ce, 'click', false);
      });
      const edgeItem = e.item; // 获取被点击的边元素对象
      graph.setItemState(edgeItem, 'click', true); // 设置当前边的 click 状态为 true
    });
  }, [])

  return (
    // 创建一个canvas的容器
    <div id="mountNode"></div>
  )

}
export default G6Test1;