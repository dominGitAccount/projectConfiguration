import React from 'react';
import './NodeTooltips.less';
import { Col } from 'antd';
const NodeToolTips = ({ x, y, nodeInfo }) => {
  return (
    <div className='nodeTooltips' style={{ top: `${y}px`, left: `${x}px` }}>
      <span>{nodeInfo.label ? nodeInfo.label : '未知节点'}</span>
      <div className='content'>
        <Col span={12} style={{ marginRight: '20px' }}>
          告警数量: {nodeInfo.alarmNum ? nodeInfo.alarmNum : '无'}
        </Col>
        <Col span={12}>调用总量: {nodeInfo.total ? nodeInfo.total : '无'}</Col>
      </div>
      <div className='content'>
        <Col span={12} style={{ marginRight: '20px' }}>
          一秒超时量: {nodeInfo.alarmNum ? nodeInfo.timeoutoneNum : '无'}
        </Col>
        <Col span={12}>三秒超时量: {nodeInfo.alarmNum ? nodeInfo.timeouthreeNum : '无'}</Col>
      </div>
      <div className='content'>
        <Col span={12} style={{ marginRight: '20px' }}>
          五秒超时量: {nodeInfo.alarmNum ? nodeInfo.timeoutfiveNum : '无'}
        </Col>
        <Col span={12}>业务成功量: {nodeInfo.alarmNum ? nodeInfo.busiSuccessNum : '无'}</Col>
      </div>{' '}
      <div className='content'>
        <Col span={12} style={{ marginRight: '20px' }}>
          系统成功量: {nodeInfo.alarmNum ? nodeInfo.systemSuccessNum : '无'}
        </Col>
        <Col span={12}>其他成功量: {nodeInfo.alarmNum ? nodeInfo.otherSuccessNum : '无'}</Col>
      </div>
    </div>
  );
};

export default NodeToolTips;
