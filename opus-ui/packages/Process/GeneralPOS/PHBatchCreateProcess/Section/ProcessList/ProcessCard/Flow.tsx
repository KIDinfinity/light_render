import React, { useState, useRef, useEffect } from 'react';
import lodash from 'lodash';
import styles from './flow.less';
import FlowUtils from 'phowb/utils/flow';

const flowUtil = new FlowUtils();

const Flow = ({ process }) => {
  const [containerConfig, setContainerConfig] = useState({
    width: 800,
    height: 140,
  });
  const container = useRef(null);
  const id = process.id + process.caseCategory;
  useEffect(() => {
    if (container !== null && process) {
      const formatResult = flowUtil.formatProcess({
        process,
        startLocation: {
          x: 20,
          y: 50,
        },
        spacing: {
          x: 100,
          y: 0,
        },
      });
      const { drawData } = lodash.pick(formatResult, ['drawData']);
      flowUtil.init({
        container: id,
        width: containerConfig.width,
        height: containerConfig.height,
      });
      flowUtil.data(drawData);
      flowUtil.render();
    }
  }, [process, container]);
  return <div className={styles.wrap} id={id} />;
};

export default Flow;
