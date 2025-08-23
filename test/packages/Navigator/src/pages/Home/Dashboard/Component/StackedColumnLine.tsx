import React, { useEffect, useState } from 'react';
import { StackedColumnLine } from '@ctc/g2plot';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Config, { ComboColor, Colors } from '../Config';
import { formatValue, formatLegend } from '../Utils';
import styles from './chart.less';

export default (props: any) => {
  const { format, dataFormat, miscType, dashboardCode } = props;
  const containerId = `StackedColumnLine_${dashboardCode}`;
  const defaultConfig = Config({
    combo: true,
    ...props,
    dataFormat,
  });

  const {
    data,
    lineSeriesField = '',
    columnStackField = '',
    xField,
    yField,
    width,
  } = props?.chartData || {};
  const config = {
    ...defaultConfig,
    width,
    lineSeriesField,
    columnStackField,
    columnConfig: {
      ...defaultConfig?.columnConfig,
      color: Colors,
      label: {
        visible: true,
        position: 'middle',
        style: {
          fontSize: 8,
          stroke: 0,
        },
        adjustColor: true,
        adjustPosition: true,
      },
      leftConfig: {
        colorMapping: false,
      },
      rightConfig: {
        colorMapping: false,
        point: {
          visible: true,
          shape: 'circle',
          size: 3,
          style: {
            stroke: '#fff',
          },
        },
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
              columnField: columnStackField,
              dataFormat,
              format,
              miscType,
            },
          }),
      },
    },
    tooltip: {
      ...defaultConfig?.tooltip,
      formatter: (_xField: any, value: any, name: string) => {
        const lineTypeCode = miscType?.[columnStackField];
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
    const plotTemp = new StackedColumnLine(document.getElementById(containerId), config);
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
