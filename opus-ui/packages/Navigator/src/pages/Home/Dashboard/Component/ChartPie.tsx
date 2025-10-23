import React, { useState, useEffect } from 'react';
import { Pie } from '@ctc/g2plot';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { defaultBase } from '../Config';
import { formatValue } from '../Utils';
import { LS, LSKey } from '@/utils/cache';
import styles from './chart.less';

export default function ChartPie(props: any) {
  const [plot, setPlot]: any = useState();
  const containerId = `ChartPie_${props?.dashboardCode}`;
  const { chartData, onClick, dataFormat, format, nameMiscType } = props;
  const { data, name } = chartData;
  const total = lodash.sumBy(data, (item: any) => item.value);

  const fontColor = LS.getItem(LSKey.THEME, false) == 'dark' ? '#fff' : '#595959';
  const config = {
    ...defaultBase,
    width: 320,
    radius: 0.6,
    data,
    padding: [16, 0, 0, 0],
    angleField: 'value',
    colorField: name,
    events: {
      onPieClick: (ev: any) => {
        onClick(ev?.data);
      },
    },
    label: {
      visible: true,
      type: 'outer',
      offset: 10,
      style: {
        stroke: '',
        fill: fontColor,
        fontSize: 10,
      },
      formatter: (value: any) => formatValue({ value, total, dataFormat, format }),
    },
    legend: {
      position: 'top-center',
      marker: {
        symbol: 'square',
      },
      offsetY: 10,
      text: {
        formatter: (text: any) => formatMessageApi({ [nameMiscType]: text }),
        style: {
          fill: fontColor,
          fontSize: 12,
        },
      },
    },
    tooltip: {
      // visible: showTooltip,
      // 如果值为数据字段名，则会展示数据中对应该字段的数值，如果数据中不存在该字段，则直接展示 title 值
      title: formatMessageApi({ report_label: name }) + ' ',
      formatter: (value: any, _name: any) => {
        return {
          name: [formatMessageApi({ [nameMiscType]: _name })],
          value: formatValue({ value, total, dataFormat, format }),
        };
      },
    },
    pieStyle: (e: any) => {},
  };
  useEffect(() => {
    // @ts-ignore
    const piePlot = new Pie(document.getElementById(containerId), config);
    setPlot(piePlot);
    piePlot.render();
  }, []);

  useEffect(() => {
    if (plot) {
      plot?.changeData(props?.chartData?.data);
    }
  }, [props?.chartData?.data]);

  return <div id={containerId} className={styles.g2Chart} />;
}
