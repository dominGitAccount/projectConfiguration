import React, { useEffect } from 'react';
import * as echarts from 'echarts';
// const {option1} = require('./options');
import { option1 } from './options'

const MyEcharts1 = () => {

  useEffect(() => {
    console.log(option1)
    let option = option1;
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }, [])

  return (
    // 为 ECharts 准备一个定义了宽高的 DOM 
    <div id="main" style={{ width: 600, height: 400, margin: 100 }}></div>
  )
};
export default MyEcharts1;