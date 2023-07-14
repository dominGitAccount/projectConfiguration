

let nodeData = {
  nodes: [],
  edges: [],
  combos: [],
};
let data = [{
  nodes: [
    {
      isWarning: 0,
      parentApplicationServiceType: 0,
      applicationServiceType: 1000,
      transactionId: 'sycmdb-resource^1670580226404^51',
      createTime: 1670983440,
      systemCode: '123456789',
      levelType: 'enterService',
      name: 'sycmdb-resource',
      nameId: 'sycmdb-resource_123456789_sycmdb-resource_123456789',
      _id: 13,
      id: 'sycmdb-resource#123456789',
      objType: 'SAAS',
      _labels: ['AppNode', 'sycmdb-resource_123456789'],
    },
    {
      isWarning: 0,
      parentApplicationServiceType: 0,
      applicationServiceType: 8200,
      transactionId: 'sycmdb-resource^1670580226404^41',
      paasNodes: ['192.168.2.191:7000'],
      createTime: 1670896080,
      systemCode: '123456789',
      levelType: 'service',
      name: 'REDIS_192.168.2.191:7000',
      nameId: 'sycmdb-resource_123456789_REDIS_192.168.2.191:7000_123456789',
      _id: 11,
      id: 'REDIS_192.168.2.191:7000#123456789',
      objType: 'SAAS',
      _labels: ['AppNode', 'sycmdb-resource_123456789'],
    },
    {
      ipport: '192.168.2.191:7000',
      sySystemCode: ['123456789'],
      isWarning: 1,
      typeName: 'redis',
      parentApplicationServiceType: 0,
      applicationServiceType: 21017,
      instId: 10626,
      uniqKey: 'zy_redis10626',
      systemCode: '',
      levelType: 'componentNode',
      objId: 'zy_redis',
      name: 'redis_192.168.2.191_7000',
      _id: 372,
      id: 'redis_192.168.2.191_7000#',
      objType: 'PAAS',
      _labels: [
        'AppNode_123456789',
        'sycmdb-resource_123456789',
        'sycmdb-model_123456789',
        'callchain_interface_123456789',
        'busi-server_123456789',
        'PaasNode',
        'syalarm_123456789',
      ],
    },
    {
      sySystemCode: ['123456789'],
      isWarning: 0,
      typeName: '主机',
      parentApplicationServiceType: 0,
      applicationServiceType: 21000,
      instId: 10327,
      uniqKey: 'host10327',
      systemCode: '',
      levelType: 'host',
      objId: 'host',
      name: '192.168.2.191',
      _id: 373,
      id: '192.168.2.191#',
      objType: 'IAAS',
      _labels: [
        'AppNode_123456789',
        'sycmdb-resource_123456789',
        'sycmdb-model_123456789',
        'callchain_interface_123456789',
        'busi-server_123456789',
        'PaasNode',
        'syalarm_123456789',
      ],
    },
    {
      isWarning: 0,
      parentApplicationServiceType: 0,
      applicationServiceType: 8200,
      transactionId: 'sycmdb-resource^1667208230705^228',
      paasNodes: ['192.168.2.192:7000'],
      createTime: 1667807040,
      systemCode: '123456789',
      levelType: 'service',
      name: 'REDIS_192.168.2.192:7000',
      nameId: 'sycmdb-resource_123456789_REDIS_192.168.2.192:7000_123456789',
      _id: 14,
      id: 'REDIS_192.168.2.192:7000#123456789',
      objType: 'SAAS',
      _labels: ['AppNode', 'sycmdb-resource_123456789'],
    },
    {
      ipport: '192.168.2.192:7000',
      sySystemCode: ['123456789'],
      isWarning: 0,
      typeName: 'redis',
      parentApplicationServiceType: 0,
      applicationServiceType: 21017,
      instId: 10628,
      uniqKey: 'zy_redis10628',
      systemCode: '',
      levelType: 'componentNode',
      objId: 'zy_redis',
      name: 'redis_192.168.2.192_7000',
      _id: 357,
      id: 'redis_192.168.2.192_7000#',
      objType: 'PAAS',
      _labels: [
        'AppNode_123456789',
        'sycmdb-resource_123456789',
        'sycmdb-model_123456789',
        'callchain_interface_123456789',
        'busi-server_123456789',
        'PaasNode',
        'goc-data-server_123456789',
        'syalarm_123456789',
      ],
    },
    {
      sySystemCode: ['123456789'],
      isWarning: 0,
      typeName: '主机',
      parentApplicationServiceType: 0,
      applicationServiceType: 21000,
      instId: 10332,
      uniqKey: 'host10332',
      systemCode: '',
      levelType: 'host',
      objId: 'host',
      name: '192.168.2.192',
      _id: 371,
      id: '192.168.2.192#',
      objType: 'IAAS',
      _labels: [
        'AppNode_123456789',
        'sycmdb-resource_123456789',
        'sycmdb-model_123456789',
        'server_relation_123456789',
        'callchain_interface_123456789',
        'busi-server_123456789',
        'PaasNode',
        'goc-data-server_123456789',
        'syalarm_123456789',
        'sycmdb-sync_123456789',
      ],
    },
    {
      isWarning: 0,
      parentApplicationServiceType: 0,
      applicationServiceType: 2100,
      transactionId: 'sycmdb-resource^1670580226404^51',
      paasNodes: ['192.168.2.190:3307'],
      createTime: 1670983440,
      systemCode: '123456789',
      levelType: 'service',
      name: 'sycmdb',
      nameId: 'sycmdb-resource_123456789_sycmdb_123456789',
      _id: 15,
      id: 'sycmdb#123456789',
      objType: 'SAAS',
      _labels: ['AppNode', 'sycmdb-resource_123456789'],
    },
    {
      ipport: '192.168.2.190:3307',
      sySystemCode: ['123456789'],
      isWarning: 1,
      typeName: 'mysql',
      parentApplicationServiceType: 0,
      applicationServiceType: 21018,
      instId: 10625,
      uniqKey: 'zy_mysql10625',
      systemCode: '',
      levelType: 'componentNode',
      objId: 'zy_mysql',
      name: 'mysql_192.168.2.190',
      _id: 325,
      id: 'mysql_192.168.2.190#',
      objType: 'PAAS',
      _labels: [
        'AppNode_123456789',
        'sycmdb-resource_123456789',
        'sycmdb-model_123456789',
        'server_relation_123456789',
        'callchain_interface_123456789',
        'busi-server_123456789',
        'PaasNode',
        'sycmdb-sync_123456789',
      ],
    },
    {
      sySystemCode: ['123456789'],
      isWarning: 0,
      typeName: '主机',
      parentApplicationServiceType: 0,
      applicationServiceType: 21000,
      instId: 10331,
      uniqKey: 'host10331',
      systemCode: '',
      levelType: 'host',
      objId: 'host',
      name: '192.168.2.190',
      _id: 326,
      id: '192.168.2.190#',
      objType: 'IAAS',
      _labels: [
        'AppNode_123456789',
        'sycmdb-resource_123456789',
        'sycmdb-model_123456789',
        'server_relation_123456789',
        'callchain_interface_123456789',
        'busi-server_123456789',
        'PaasNode',
        'sycmdb-sync_123456789',
      ],
    },
    {
      isWarning: 0,
      parentApplicationServiceType: 0,
      applicationServiceType: 8200,
      transactionId: 'sycmdb-resource^1670580226404^51',
      paasNodes: ['192.168.2.193:7000'],
      createTime: 1670983440,
      systemCode: '123456789',
      levelType: 'service',
      name: 'REDIS_192.168.2.193:7000',
      nameId: 'sycmdb-resource_123456789_REDIS_192.168.2.193:7000_123456789',
      _id: 231,
      id: 'REDIS_192.168.2.193:7000#123456789',
      objType: 'SAAS',
      _labels: ['AppNode', 'sycmdb-resource_123456789'],
    },
    {
      ipport: '192.168.2.193:7000',
      sySystemCode: ['123456789'],
      isWarning: 0,
      typeName: 'redis',
      parentApplicationServiceType: 0,
      applicationServiceType: 21017,
      instId: 10630,
      uniqKey: 'zy_redis10630',
      systemCode: '',
      levelType: 'componentNode',
      objId: 'zy_redis',
      name: 'redis_192.168.2.193_7000',
      _id: 369,
      id: 'redis_192.168.2.193_7000#',
      objType: 'PAAS',
      _labels: [
        'sycmdb-resource_123456789',
        'sycmdb-model_123456789',
        'callchain_interface_123456789',
        'busi-server_123456789',
        'PaasNode',
        'syalarm_123456789',
      ],
    },
    {
      sySystemCode: ['123456789'],
      isWarning: 0,
      typeName: '主机',
      parentApplicationServiceType: 0,
      applicationServiceType: 21000,
      instId: 10333,
      uniqKey: 'host10333',
      systemCode: '',
      levelType: 'host',
      objId: 'host',
      name: '192.168.2.193',
      _id: 370,
      id: '192.168.2.193#',
      objType: 'IAAS',
      _labels: [
        'sycmdb-resource_123456789',
        'sycmdb-model_123456789',
        'callchain_interface_123456789',
        'busi-server_123456789',
        'PaasNode',
        'syalarm_123456789',
      ],
    },
    {
      isWarning: 1,
      parentApplicationServiceType: 0,
      applicationServiceType: 8200,
      transactionId: 'sycmdb-resource^1670580226404^46',
      paasNodes: ['192.168.2.192:7001'],
      createTime: 1670926080,
      systemCode: '123456789',
      levelType: 'service',
      name: 'REDIS_192.168.2.192:7001',
      nameId: 'sycmdb-resource_123456789_REDIS_192.168.2.192:7001_123456789',
      _id: 375,
      id: 'REDIS_192.168.2.192:7001#123456789',
      objType: 'SAAS',
      _labels: ['AppNode', 'sycmdb-resource_123456789'],
    }],

  systemCode: '123456789',
  edges: [
    { source: 'sycmdb-resource#123456789', target: 'REDIS_192.168.2.191:7000#123456789' },
    { source: 'REDIS_192.168.2.191:7000#123456789', target: 'redis_192.168.2.191_7000#' },
    { source: 'redis_192.168.2.191_7000#', target: '192.168.2.191#' },
    { source: 'sycmdb-resource#123456789', target: 'REDIS_192.168.2.192:7000#123456789' },
    { source: 'REDIS_192.168.2.192:7000#123456789', target: 'redis_192.168.2.192_7000#' },
    { source: 'redis_192.168.2.192_7000#', target: '192.168.2.192#' },
    { source: 'sycmdb-resource#123456789', target: 'sycmdb#123456789' },
    { source: 'sycmdb#123456789', target: 'mysql_192.168.2.190#' },
    { source: 'mysql_192.168.2.190#', target: '192.168.2.192#' },

    { source: 'sycmdb#123456789', target: '192.168.2.192#' },
    { source: 'sycmdb-resource#123456789', target: 'redis_192.168.2.191_7000#' },

    { source: 'mysql_192.168.2.190#', target: '192.168.2.190#' },
    { source: 'sycmdb-resource#123456789', target: 'REDIS_192.168.2.193:7000#123456789' },
    { source: 'REDIS_192.168.2.193:7000#123456789', target: 'redis_192.168.2.193_7000#' },
    { source: 'redis_192.168.2.193_7000#', target: '192.168.2.193#' },
    { source: 'sycmdb-resource#123456789', target: 'REDIS_192.168.2.192:7001#123456789' },
  ],

  serviceName: 'sycmdb-resource',

}]

let topoData = { ...data[0] };
let reduceObj = {};
nodeData.nodes = topoData.nodes.reduce((cur, next) => {
  if (!reduceObj[next.id]) {
    (reduceObj[next.id] = true && cur.push({ ...next, label: next.name || '' }))
  }
  return cur;
}, []);


let handleNodesData = (nodeId, comboId) => {
  // 排除没有子节点的第一个节点
  if (topoData.edges.findIndex(item => item.target === nodeId) === -1) return;
  let nodeIndex = nodeData.nodes.findIndex(node => node.id === nodeId);
  if (nodeIndex === -1 || nodeData.nodes[nodeIndex].comboId) return;
  nodeData.nodes[nodeIndex].comboId = comboId;
  topoData.edges.forEach(edge => {
    // 循环遍历，沿着当前节点边的source网上找
    if (edge.target === nodeId) { handleNodesData(edge.source, comboId) }
  })
};
let combos = [];
topoData.edges.forEach(edge => {
  if (
    topoData.edges.findIndex(item => item.source === edge.target) === -1 //图中最末尾的节点，没有子节点
    && combos.findIndex(item => item.target === edge.target) === -1 //combos分组中没有该节点，根据末节点的个数定义分组个数
  ) {
    handleNodesData(edge.target, combos.length + 1);
    combos.push({
      label: `分组${combos.length + 1}`,
      id: `${combos.length + 1}`,
      target: edge.target,
      collapsed: true, //默认是收起状态
    })
  }
});

// const handleCombos = (combos) => {
//   let newCombos = [];

//   combos.forEach((combo, index) => {
//     newCombos.push({
//       ...combo,
//       collapsed: true,
//       style: {},
//     });
//   });

//   const changeWarningComboStyle = (index) => {
//     newCombos[index].style.stroke = 'red';
//   }

//   const loopComboParents = (combo) => {
//     if (combo.parentId) {
//       let comboIndex = newCombos.findIndex(item => item.id === combo.parentId);
//       changeWarningComboStyle(comboIndex);
//       loopComboParents(newCombos[comboIndex])
//     }
//   }

//   newCombos.forEach((combo, index) => {
//     let node = nodeData.nodes.find(node => node.comboId === combo.id);
//     if (node?.isWarning) {
//       changeWarningComboStyle(index);
//       loopComboParents(combo);
//     }
//   })

//   return newCombos;
// }

nodeData.combos = combos;
nodeData.edges = topoData.edges;

export default nodeData;
