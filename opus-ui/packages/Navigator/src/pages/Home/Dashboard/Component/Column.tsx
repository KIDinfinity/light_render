import React, { useEffect, useState } from 'react';
import { Column } from '@ctc/g2plot';
import Config from '../Config';
import styles from './chart.less';

export default (props: any) => {
  const containerId = `Column_${props?.dashboardCode}`;
  const { width } = props?.data || {};

  const config = {
    ...Config({
      combo: true,
      ...props,
    }),
  };
  const [plot, setPlot]: any = useState(null);
  useEffect(() => {
    // @ts-ignore
    const plotTemp = new Column(document.getElementById(containerId), config);
    plotTemp.render();
    setPlot(plotTemp);
  }, []);

  useEffect(() => {
    if (plot) {
      plot?.updateConfig(config);
      plot?.render();
    }
  }, [props?.data?.data]);

  return <div id={containerId} className={styles.g2Chart} style={{ width }} />;
};
