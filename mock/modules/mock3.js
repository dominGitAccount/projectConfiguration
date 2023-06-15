const Mock = require('mockjs');
var Random = Mock.Random
let data = Mock.mock({
  'rows|8': [{ //模拟每页有多少条数据。 每页8条。
    key: '@guid', //每页数据都是有id的。 随机生成数据. @是占位符,随机生成后不会重复。
    name: '@cname',  //前缀加 c 的意思为随机生成中文，否则是英文
    'age|1-70': 56,
    address: '@csentence',
    'tags|1-2': ['@name']
  }]
})
let data2 = Mock.mock({
  'rows|4': [{ //模拟每页有多少条数据。 每页8条。
    key: '@guid', //每页数据都是有id的。 随机生成数据. @是占位符,随机生成后不会重复。
    name: '@cname',  //前缀加 c 的意思为随机生成中文，否则是英文
    'age|1-70': 56,
    address: Random.csentence(),
    'tags|1-2': ['@name']
  }]
})
let articleList = {
  code: 200,
  msg: 'success',
  data: { //数据
    total: 100, //模拟数据的页数，分页功能。 100条
    rows: data.rows
  }
};
let List = {
  code: 200,
  msg: 'ss',
  data: { //数据
    total: 10, //模拟数据的页数，分页功能。 100条
    rows: data2.rows
  }
};

export default { //前面键是请求方式与请求地址，后边值是返回的数据
  'get|/article/list': articleList,
  'get|/article2/list': List,
}