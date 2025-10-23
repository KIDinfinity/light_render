import React, { useState, useRef, useEffect } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import FlowUtils from 'navigator/utils/flow';
import styles from './index.less';
import { LS, LSKey } from '@/utils/cache';

const ProgreressOverview = () => {
  const theme = LS.getItem(LSKey.THEME, false);
  const { process } = useSelector((state) => ({
    process: state?.workspaceCases?.process,
  }));
  const [containerInfo, setContainerInfo] = useState({
    width: 1500,
    height: 1000,
  });
  const container = useRef(null);
  useEffect(() => {
    if (container !== null && process) {
      const flowUtils = new FlowUtils(theme);
      const formatResult = flowUtils.formatProcess({
        process,
        startLocation: { x: 0, y: 50 },
        spacing: {
          mainProcess: {
            x: 200,
            y: 0,
          },
          subProcess: {
            x: 180,
            y: 0,
          },
          grandChildProcess: {
            x: 120,
            y: 0,
          },
        },
      });
      const containerConfig = lodash.pick(formatResult, ['width', 'height']);
      setContainerInfo(containerConfig);
      const drawData = lodash.pick(formatResult, ['nodes', 'edges']);
      // 初始化容器
      flowUtils.init({
        container: 'container',
        width: containerConfig.width,
        height: containerConfig.height,
      });
      // 设置数据
      flowUtils.data(drawData);
      flowUtils.render();
    }
  }, [process, container, theme]);
  return (
    <div
      className={styles.wrap}
      id="container"
      ref={container}
      style={{ width: containerInfo.width, height: containerInfo.height, margin: '0 auto' }}
    />
  );
};
export default ProgreressOverview;
