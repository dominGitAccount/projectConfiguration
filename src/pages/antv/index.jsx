import React from 'react';
import TopoTree from './components/TopoTree';
import topologyData from './components/topologyData';

const Antv = () => {
  let tachInfo = { systemCode: '99710640000', serviceName: 'communication_service', systemName: '统一柜面' };
  let tacheParam = { startTime: 1687251469780, endTime: 1687251769781, channelId: 173275, sceneCode: 176444 };
  
  return (
    <div>
      <TopoTree
        tachInfo={tachInfo}
        topoType={'java'}
        tacheParam={tacheParam}
        topologyData={topologyData}
        setTopoTreeLoading={false}
        topoTreeLoading={false}
      />
    </div>
  )
};

export default Antv;