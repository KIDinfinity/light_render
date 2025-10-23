import React, { useEffect, useState } from 'react';
import { ColumnLine } from '@ctc/g2plot';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Config, { Colors, ComboColor } from '../Config';
import { formatLegend, formatValue } from '../Utils';
import styles from './chart.less';

export default (props: any) => {
  const { dataFormat, format, miscType, dashboardCode } = props;
  const containerId = `ColumnLine_${dashboardCode}`;
  const { lineSeriesField = '', xField, yField, width, data } = props?.chartData || {};

  const defaultConfig = Config({
    combo: true,
    ...props,
  });
  const config = {
    ...defaultConfig,
    lineSeriesField,
    width,
    columnConfig: {
      ...defaultConfig.columnConfig,
      color: Colors[0],
      label: {
        visible: true,
        adjustColor: true,
        style: {
          fontSize: 8,
          stroke: 0,
          fill: 'white',
        },
        position: 'middle',
        adjustPosition: true,
        formatter: (value: any) => {
          const total = lodash.sumBy(
            props?.data?.data?.[0],
            (item: any) => item[props?.data?.yField[0]]
          );
          return formatValue({ value, total, dataFormat, format });
        },
      },
      padding: [0, 48, 40, 48],
    },
    legend: {
      visible: true,
      text: {
        ...defaultConfig?.legend.text,
        formatter: (value: any, { marker: { symbol } }: any) =>
          formatLegend({
            legendProps: { value, symbol },
            props: {
              ...props.data,
              dataFormat,
              format,
              miscType,
            },
          }),
      },
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
    tooltip: {
      ...defaultConfig?.tooltip,
      formatter: (_xField: any, value: any, name: string) => {
        const lineTypeCode = miscType?.[yField?.[0]];
        const total = (lodash.chain(data) as any)
          .head()
          .filter((item: any) => item[xField] === _xField)
          .sumBy((item: any) => item[yField[0]])
          .value();
        return {
          name: formatMessageApi({ [lineTypeCode]: yField?.[0] }),
          value: formatValue({ value, total, dataFormat, format }),
        };
      },
    },
  };
  const [plot, setPlot]: any = useState(null);
  useEffect(() => {
    // @ts-ignore
    const plotTemp = new ColumnLine(document.getElementById(containerId), config);
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
