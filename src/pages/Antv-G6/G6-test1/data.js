// 数据：包含节点: nodes, 边：edges, 组合：combos等
export let data = {
  // 点集
   nodes: [
    {
      id: 'node1', // 节点的唯一标识
      x: 100, // 节点横坐标
      y: 200, // 节点纵坐标
      label: '起始点', // 节点文本
    },
    {
      id: 'node2',
      x: 300,
      y: 200,
      label: '目标点',
    },
    {
      id: 'node3',          // 元素的 id
      x: 500,
      y: 200,
      type: 'circle',       // 元素的图形
      size: 40,             // 元素的大小
      label: '3',        // 标签文字
      visible: false,        // 控制初次渲染显示与隐藏，若为 false，代表隐藏。默认不隐藏
      labelCfg: {           // 节点标签文本配置属性
        positions: 'center',// 标签的属性，标签在元素中的位置
        style: {            // 包裹标签样式属性的字段 style 与标签其他属性在数据结构上并行
          fontSize: 12      // 标签的样式属性，文字字体大小
          // ...            // 标签的其他样式属性
        }
      },
      // ...,               // 其他属性
      style: {              // 包裹样式属性的字段 style 与其他属性在数据结构上并行
        fill: '#000',       // 样式属性，元素的填充色
        stroke: '#888',     // 样式属性，元素的描边色
        // ...              // 其他样式属性
      }
    }
  ],
  // 边集
  edges: [
    // 表示一条从 node1 节点连接到 node2 节点的边
    {
      source: 'node1', // 起始点 id
      target: 'node2', // 目标点 id
      label: '我是连线', // 边的文本
    },
    {
      source: 'node2', // 起始点 id
      target: 'node3', // 目标点 id
      label: '我是连线', // 边的文本
    },
  ],
};