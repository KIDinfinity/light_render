import React, { useEffect, useState } from 'react';
import { DualLine } from '@ctc/g2plot';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import Config, { ComboColor, Colors } from '../Config';
import { formatLegend, formatValue } from '../Utils';
import styles from './chart.less';

export default (props: any) => {
  const { dataFormat, format, dashboardCode, miscType } = props;
  const containerId = `DualLine_${dashboardCode}`;
  const { width, leftSerieField, rightSerieField, data, xField, yField } = props?.chartData || {};
  const defaultConfig = {
    ...Config({
      combo: true,
      ...props,
    }),
  };
  const config = {
    ...defaultConfig,
    width,
    lineConfig: {
      color: ComboColor,
    },
    leftSerieField,
    rightSerieField,
    lineConfigs: [
      {
        ...defaultConfig.lineConfig,
        color: leftSerieField ? Colors : Colors[0],
        label: {
          visible: true,
          style: {
            fontSize: 8,
            fill: '#fff',
            stroke: 0,
          },
          formatter: (value: any) => {
            const total = (lodash.chain(data) as any)
              .head()
              .sumBy((item: any) => item[yField[0]])
              .value();
            return formatValue({ value, total, dataFormat, format });
          },
        },
        padding: [10, 72, 40, 72],
      },
      {
        ...defaultConfig.lineConfig,
        color: rightSerieField ? ComboColor : ComboColor[0],
        label: {
          visible: true,
          style: {
            fontSize: 8,
            fill: '#fff',
            stroke: 0,
          },
          formatter: (value: any) => {
            const total = (lodash.chain(data) as any)
              .head()
              .sumBy((item: any) => item[yField[0]])
              .value();
            return formatValue({ value, total, dataFormat, format });
          },
        },
        legend: {
          visible: false,
        },
      },
    ],
    tooltip: {
      ...defaultConfig.tooltip,
      showCrosshairs: true,
      formatterName: ({ name, value, title }: any) => {
        const lineTypeCode = miscType?.[leftSerieField];
        const total = (lodash.chain(data) as any)
          .head()
          .filter((item: any) => item[xField] === title)
          .sumBy((item: any) => item[yField[0]])
          .value();
        return {
          name: formatMessageApi({ [lineTypeCode]: name }),
          value: formatValue({ value, total, dataFormat, format }),
        };
      },
    },
    legend: {
      ...defaultConfig?.legend,
      marker: {
        symbol: 'circle',
      },
      text: {
        ...defaultConfig?.legend.text,
        formatter: (value: any, { marker: { symbol } }: any) =>
          formatLegend({
            legendProps: { value, symbol },
            props: {
              ...props.data,
              miscType,
              dataFormat,
              format,
              columnField: leftSerieField,
            },
          }),
      },
    },
  };

  const [plot, setPlot]: any = useState(null);
  useEffect(() => {
    // @ts-ignore
    const plotTemp = new DualLine(document.getElementById(containerId), config);
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
