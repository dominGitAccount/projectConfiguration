

let nodeData = {
  nodes: [],
  edges: [],
  combos: [],
};
let data = [{

  "nodes": [

    {

      "isWarning": 0,

      "parentApplicationServiceType": 0,

      "applicationServiceType": 1000,

      "transactionId": "sycmdb-resource^1670580226404^51",

      "createTime": 1670983440,

      "systemCode": "123456789",

      "levelType": "enterService",

      "name": "sycmdb-resource",

      "nameId": "sycmdb-resource_123456789_sycmdb-resource_123456789",

      "_id": 13,

      "id": "sycmdb-resource#123456789",

      "objType": "SAAS",

      "_labels": [

        "AppNode",

        "sycmdb-resource_123456789"

      ]

    },

    {

      "isWarning": 0,

      "parentApplicationServiceType": 0,

      "applicationServiceType": 8200,

      "transactionId": "sycmdb-resource^1670580226404^41",

      "paasNodes": [

        "192.168.2.191:7000"

      ],

      "createTime": 1670896080,

      "systemCode": "123456789",

      "levelType": "service",

      "name": "REDIS_192.168.2.191:7000",

      "nameId": "sycmdb-resource_123456789_REDIS_192.168.2.191:7000_123456789",

      "_id": 11,

      "id": "REDIS_192.168.2.191:7000#123456789",

      "objType": "SAAS",

      "_labels": [

        "AppNode",

        "sycmdb-resource_123456789"

      ]

    },

    {

      "ipport": "192.168.2.191:7000",

      "sySystemCode": [

        "123456789"

      ],

      "isWarning": 0,

      "typeName": "redis",

      "parentApplicationServiceType": 0,

      "applicationServiceType": 21017,

      "instId": 10626,

      "uniqKey": "zy_redis10626",

      "systemCode": "",

      "levelType": "componentNode",

      "objId": "zy_redis",

      "name": "redis_192.168.2.191_7000",

      "_id": 372,

      "id": "redis_192.168.2.191_7000#",

      "objType": "PAAS",

      "_labels": [

        "AppNode_123456789",

        "sycmdb-resource_123456789",

        "sycmdb-model_123456789",

        "callchain_interface_123456789",

        "busi-server_123456789",

        "PaasNode",

        "syalarm_123456789"

      ]

    },

    {

      "sySystemCode": [

        "123456789"

      ],

      "isWarning": 0,

      "typeName": "主机",

      "parentApplicationServiceType": 0,

      "applicationServiceType": 21000,

      "instId": 10327,

      "uniqKey": "host10327",

      "systemCode": "",

      "levelType": "host",

      "objId": "host",

      "name": "192.168.2.191",

      "_id": 373,

      "id": "192.168.2.191#",

      "objType": "IAAS",

      "_labels": [

        "AppNode_123456789",

        "sycmdb-resource_123456789",

        "sycmdb-model_123456789",

        "callchain_interface_123456789",

        "busi-server_123456789",

        "PaasNode",

        "syalarm_123456789"

      ]

    },

    {

      "isWarning": 0,

      "parentApplicationServiceType": 0,

      "applicationServiceType": 8200,

      "transactionId": "sycmdb-resource^1667208230705^228",

      "paasNodes": [

        "192.168.2.192:7000"

      ],

      "createTime": 1667807040,

      "systemCode": "123456789",

      "levelType": "service",

      "name": "REDIS_192.168.2.192:7000",

      "nameId": "sycmdb-resource_123456789_REDIS_192.168.2.192:7000_123456789",

      "_id": 14,

      "id": "REDIS_192.168.2.192:7000#123456789",

      "objType": "SAAS",

      "_labels": [

        "AppNode",

        "sycmdb-resource_123456789"

      ]

    },

    {

      "ipport": "192.168.2.192:7000",

      "sySystemCode": [

        "123456789"

      ],

      "isWarning": 0,

      "typeName": "redis",

      "parentApplicationServiceType": 0,

      "applicationServiceType": 21017,

      "instId": 10628,

      "uniqKey": "zy_redis10628",

      "systemCode": "",

      "levelType": "componentNode",

      "objId": "zy_redis",

      "name": "redis_192.168.2.192_7000",

      "_id": 357,

      "id": "redis_192.168.2.192_7000#",

      "objType": "PAAS",

      "_labels": [

        "AppNode_123456789",

        "sycmdb-resource_123456789",

        "sycmdb-model_123456789",

        "callchain_interface_123456789",

        "busi-server_123456789",

        "PaasNode",

        "goc-data-server_123456789",

        "syalarm_123456789"

      ]

    },

    {

      "sySystemCode": [

        "123456789"

      ],

      "isWarning": 0,

      "typeName": "主机",

      "parentApplicationServiceType": 0,

      "applicationServiceType": 21000,

      "instId": 10332,

      "uniqKey": "host10332",

      "systemCode": "",

      "levelType": "host",

      "objId": "host",

      "name": "192.168.2.192",

      "_id": 371,

      "id": "192.168.2.192#",

      "objType": "IAAS",

      "_labels": [

        "AppNode_123456789",

        "sycmdb-resource_123456789",

        "sycmdb-model_123456789",

        "server_relation_123456789",

        "callchain_interface_123456789",

        "busi-server_123456789",

        "PaasNode",

        "goc-data-server_123456789",

        "syalarm_123456789",

        "sycmdb-sync_123456789"

      ]

    },

    {

      "isWarning": 0,

      "parentApplicationServiceType": 0,

      "applicationServiceType": 2100,

      "transactionId": "sycmdb-resource^1670580226404^51",

      "paasNodes": [

        "192.168.2.190:3307"

      ],

      "createTime": 1670983440,

      "systemCode": "123456789",

      "levelType": "service",

      "name": "sycmdb",

      "nameId": "sycmdb-resource_123456789_sycmdb_123456789",

      "_id": 15,

      "id": "sycmdb#123456789",

      "objType": "SAAS",

      "_labels": [

        "AppNode",

        "sycmdb-resource_123456789"

      ]

    },

    {

      "ipport": "192.168.2.190:3307",

      "sySystemCode": [

        "123456789"

      ],

      "isWarning": 0,

      "typeName": "mysql",

      "parentApplicationServiceType": 0,

      "applicationServiceType": 21018,

      "instId": 10625,

      "uniqKey": "zy_mysql10625",

      "systemCode": "",

      "levelType": "componentNode",

      "objId": "zy_mysql",

      "name": "mysql_192.168.2.190",

      "_id": 325,

      "id": "mysql_192.168.2.190#",

      "objType": "PAAS",

      "_labels": [

        "AppNode_123456789",

        "sycmdb-resource_123456789",

        "sycmdb-model_123456789",

        "server_relation_123456789",

        "callchain_interface_123456789",

        "busi-server_123456789",

        "PaasNode",

        "sycmdb-sync_123456789"

      ]

    },

    {

      "sySystemCode": [

        "123456789"

      ],

      "isWarning": 0,

      "typeName": "主机",

      "parentApplicationServiceType": 0,

      "applicationServiceType": 21000,

      "instId": 10331,

      "uniqKey": "host10331",

      "systemCode": "",

      "levelType": "host",

      "objId": "host",

      "name": "192.168.2.190",

      "_id": 326,

      "id": "192.168.2.190#",

      "objType": "IAAS",

      "_labels": [

        "AppNode_123456789",

        "sycmdb-resource_123456789",

        "sycmdb-model_123456789",

        "server_relation_123456789",

        "callchain_interface_123456789",

        "busi-server_123456789",

        "PaasNode",

        "sycmdb-sync_123456789"

      ]

    },

    {

      "isWarning": 0,

      "parentApplicationServiceType": 0,

      "applicationServiceType": 8200,

      "transactionId": "sycmdb-resource^1670580226404^51",

      "paasNodes": [

        "192.168.2.193:7000"

      ],

      "createTime": 1670983440,

      "systemCode": "123456789",

      "levelType": "service",

      "name": "REDIS_192.168.2.193:7000",

      "nameId": "sycmdb-resource_123456789_REDIS_192.168.2.193:7000_123456789",

      "_id": 231,

      "id": "REDIS_192.168.2.193:7000#123456789",

      "objType": "SAAS",

      "_labels": [

        "AppNode",

        "sycmdb-resource_123456789"

      ]

    },

    {

      "ipport": "192.168.2.193:7000",

      "sySystemCode": [

        "123456789"

      ],

      "isWarning": 0,

      "typeName": "redis",

      "parentApplicationServiceType": 0,

      "applicationServiceType": 21017,

      "instId": 10630,

      "uniqKey": "zy_redis10630",

      "systemCode": "",

      "levelType": "componentNode",

      "objId": "zy_redis",

      "name": "redis_192.168.2.193_7000",

      "_id": 369,

      "id": "redis_192.168.2.193_7000#",

      "objType": "PAAS",

      "_labels": [

        "sycmdb-resource_123456789",

        "sycmdb-model_123456789",

        "callchain_interface_123456789",

        "busi-server_123456789",

        "PaasNode",

        "syalarm_123456789"

      ]

    },

    {

      "sySystemCode": [

        "123456789"

      ],

      "isWarning": 0,

      "typeName": "主机",

      "parentApplicationServiceType": 0,

      "applicationServiceType": 21000,

      "instId": 10333,

      "uniqKey": "host10333",

      "systemCode": "",

      "levelType": "host",

      "objId": "host",

      "name": "192.168.2.193",

      "_id": 370,

      "id": "192.168.2.193#",

      "objType": "IAAS",

      "_labels": [

        "sycmdb-resource_123456789",

        "sycmdb-model_123456789",

        "callchain_interface_123456789",

        "busi-server_123456789",

        "PaasNode",

        "syalarm_123456789"

      ]

    },

    {

      "isWarning": 0,

      "parentApplicationServiceType": 0,

      "applicationServiceType": 8200,

      "transactionId": "sycmdb-resource^1670580226404^46",

      "paasNodes": [

        "192.168.2.192:7001"

      ],

      "createTime": 1670926080,

      "systemCode": "123456789",

      "levelType": "service",

      "name": "REDIS_192.168.2.192:7001",

      "nameId": "sycmdb-resource_123456789_REDIS_192.168.2.192:7001_123456789",

      "_id": 375,

      "id": "REDIS_192.168.2.192:7001#123456789",

      "objType": "SAAS",

      "_labels": [

        "AppNode",

        "sycmdb-resource_123456789"

      ]

    }

  ],

  "systemCode": "123456789",

  "edges": [

    {

      "source": "sycmdb-resource#123456789",

      "target": "REDIS_192.168.2.191:7000#123456789"

    },

    {

      "source": "REDIS_192.168.2.191:7000#123456789",

      "target": "redis_192.168.2.191_7000#"

    },

    {

      "source": "redis_192.168.2.191_7000#",

      "target": "192.168.2.191#"

    },

    {

      "source": "sycmdb-resource#123456789",

      "target": "REDIS_192.168.2.192:7000#123456789"

    },

    {

      "source": "REDIS_192.168.2.192:7000#123456789",

      "target": "redis_192.168.2.192_7000#"

    },

    {

      "source": "redis_192.168.2.192_7000#",

      "target": "192.168.2.192#"

    },

    {

      "source": "sycmdb-resource#123456789",

      "target": "sycmdb#123456789"

    },

    {

      "source": "sycmdb#123456789",

      "target": "mysql_192.168.2.190#"

    },

    {

      "source": "mysql_192.168.2.190#",

      "target": "192.168.2.192#"

    },

    {

      "source": "mysql_192.168.2.190#",

      "target": "192.168.2.190#"

    },

    {

      "source": "sycmdb-resource#123456789",

      "target": "REDIS_192.168.2.193:7000#123456789"

    },

    {

      "source": "REDIS_192.168.2.193:7000#123456789",

      "target": "redis_192.168.2.193_7000#"

    },

    {

      "source": "redis_192.168.2.193_7000#",

      "target": "192.168.2.193#"

    },

    {

      "source": "sycmdb-resource#123456789",

      "target": "REDIS_192.168.2.192:7001#123456789"

    }

  ],

  "serviceName": "sycmdb-resource"

}]

let topoData = { ...data[0] };
let reduceObj = {};
let newNodes = topoData.nodes.reduce((cur, next) => {
  if (!reduceObj[next.id]) {
    (reduceObj[next.id] = true && cur.push(next))
  }
  return cur;
}, []);
newNodes.forEach((e, index) => {
  nodeData.nodes.push({
    ...e,
    label: e.name || '',
  });
});
nodeData.edges = topoData.edges;



export default nodeData;
