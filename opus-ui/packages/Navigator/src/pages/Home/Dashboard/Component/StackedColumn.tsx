import React, { useEffect, useState } from 'react';
import { StackedColumn } from '@ctc/g2plot';
import Config from '../Config';
import styles from './chart.less';
import lodash from 'lodash';
export default (props: any) => {
  const { format, dataFormat, miscType, dashboardCode } = props;
  const containerId = `StackedColumnLine_${dashboardCode}`;
  const defaultConfig = Config({
    combo: false,
    ...props,
    dataFormat,
  });
  const {
    data,
    lineSeriesField = '',
    columnStackField = '',
    columnGroupField = '',
    xField,
    yField,
    xFieldSort = [],
    width,
  } = props?.chartData || {};

  /**
   * eg: xFieldSort ['<1d', '>3d']
   * data [{biz_activity_key: "Dedup Check",
            stayed_time_level: ">3d",
            total_record: 11},...]
      resultData:
      [{biz_activity_key: "Dedup Check",
            stayed_time_level: "<1d",
            total_record: 11},
       [{biz_activity_key: "Dedup Check",
            stayed_time_level: ">3d",
            total_record: 11},///]
      ]
   */
  const sortData = (data, xFieldSort, xField, yField, columnGroupField) => {
    if (lodash.isEmpty(xFieldSort)) return data;
    const firstxField = data?.[0]?.[xField]; // 获得第一个field对应的xField
    const firstxFields = data.filter((item) => item?.[xField] === firstxField); // 过滤出跟第一个field一样xField的对象
    // 根据xFieldSort 排序补充生成第一个field对应的xField的剩余对象
    const firstFieldList = xFieldSort.map((fieldItem) => {
      const field = firstxFields.find((e) => e[columnGroupField] === fieldItem);

      return (
        field || {
          ...data?.[0],
          [yField]: 0,
          [xField]: firstxField,
          [columnGroupField]: fieldItem,
        }
      );
    });

    return firstFieldList.concat(data.filter((item) => item?.[xField] !== firstxField));
  };

  const config = {
    ...defaultConfig,
    forceFit: true,
    padding: 'auto',
    yField: yField?.[0],
    stackField: columnGroupField,
    width,
    data: sortData(data, xFieldSort, xField, yField?.[0], columnGroupField) || [],
    legend: {
      position: 'bottom-center',
      offsetY: 14,
      text: {
        style: { fill: '#fff', fontSize: 12 },
      },
    },
    xAxis: {
      ...defaultConfig?.xAxis,
      label: {
        ...defaultConfig?.xAxis?.label,
        autoHide: false,
        hide: false,
        autoRotate: false,
        formatter: (e) => {
          const data = e.split(' ');
          return data.length > 1
            ? data
                .map((item) => {
                  if (item.length > 8) {
                    return `
        ${item}`;
                  }
                  return item;
                })

                .join(' ')
            : e;
        },
      },
    },
    renderer: 'svg',
  };

  const [plot, setPlot]: any = useState(null);

  useEffect(() => {
    // @ts-ignore
    const plotTemp = new StackedColumn(document.getElementById(containerId), config);
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
