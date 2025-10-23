import React, { useEffect, useState } from 'react';
import { GroupedColumnLine } from '@ctc/g2plot';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Config, { ComboColor, Colors } from '../Config';
import { formatLegend, formatValue } from '../Utils';
import styles from './chart.less';

export default (props: any) => {
  const { format, dataFormat, miscType, dashboardCode } = props;
  const containerId = `GroupedColumnLine_${dashboardCode}`;
  const {
    lineSeriesField = '',
    columnGroupField = '',
    xField,
    yField,
    width,
    data,
  } = props?.chartData;

  const defaultConfig = {
    ...Config({
      combo: true,
      ...props,
    }),
  };

  const config = {
    ...defaultConfig,
    width,
    lineSeriesField,
    columnGroupField,
    columnConfig: {
      // ...defaultConfig?.columnConfig,
      color: Colors, // columnGroupField ? Colors : Colors[0],
      columnSize: 10,
      label: {
        visible: false,
        position: 'middle',
        style: {
          fontSize: 8,
          stroke: 0,
          fill: 'white',
        },
        adjustColor: true,
        adjustPosition: true,
      },
      padding: [0, 48, 40, 48],
    },
    lineConfig: {
      ...defaultConfig?.lineConfig,
      color: lineSeriesField ? ComboColor : ComboColor[0],
      tooltip: {
        visible: false,
        ...defaultConfig?.tooltip,
        formatterName: ({ name, value, title }: any) => {
          const lineTypeCode = miscType?.[lineSeriesField];

          const total = (lodash.chain(data) as any)
            .last()
            .filter((item: any) => item[xField] === title)
            .sumBy((item: any) => item[yField[1]])
            .value();
          return {
            name: formatMessageApi({ [lineTypeCode]: name }),
            value: formatValue({ value, total, dataFormat, format }),
          };
        },
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
              columnField: columnGroupField,
              dataFormat,
              format,
              miscType,
            },
          }),
      },
    },
    tooltip: {
      // showCrosshairs: true,
      ...defaultConfig?.tooltip,
      formatter: (_xField: any, value: any, name: string) => {
        const lineTypeCode = miscType?.[columnGroupField];
        const total = (lodash.chain(data) as any)
          .head()
          .filter((item: any) => item[xField] === _xField)
          .sumBy((item: any) => item[yField[0]])
          .value();
        return {
          name: formatMessageApi({ [lineTypeCode]: name }),
          value: formatValue({ value, total, dataFormat, format }),
        };
      },
    },
  };

  const [plot, setPlot]: any = useState(null);
  useEffect(() => {
    // @ts-ignore
    const plotTemp = new GroupedColumnLine(document.getElementById(containerId), config);
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
