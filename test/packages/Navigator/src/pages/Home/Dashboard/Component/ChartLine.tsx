import React, { useState, useEffect, useCallback } from 'react';
import { Line } from '@ctc/g2plot';
import DataSet from '@antv/data-set/lib';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import { defaultBase } from '../Config';
import { formatValue, formatYAxis } from '../Utils';
import styles from './chart.less';
import { LS, LSKey } from '@/utils/cache';

export default function ChartLine(props: any) {
  const [plot, setPlot]: any = useState();
  const containerId = `ChartLine_${props?.dashboardCode}`;
  const {
    chartData,
    onClick,
    dataFormat,
    format,
    width: basicWidth,
    forceFit: basicForceFit,
    smallScreenFit,
    xMiscType,
    nameMiscType,
  } = props;

  const setDashboardRules = useCallback(
    (basicWidth: any, basicForceFit: any, smallScreenFit: any) => {
      if (!lodash.isEmpty(smallScreenFit)) {
        return {
          // width: smallScreenFit.width,
          width: basicWidth,
          forceFit: smallScreenFit.forceFit,
        };
      }
      return {
        width: basicWidth,
        forceFit: basicForceFit,
      };
    },
    []
  );
  const fontColor = LS.getItem(LSKey.THEME, false) == 'dark' ? '#fff' : '#595959';
  const transformData = (data: any) => {
    const { fields, x, y = 'value' } = chartData;
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields,
      key: x,
      value: y,
    });
    dv.transform({
      // 过滤数据
      type: 'filter',
      callback(row: any) {
        return !lodash.isNil(row.value);
      },
    });
    return dv;
  };

  const { x, y = 'value', name, data } = chartData;

  const isEmptyName = lodash.isEmpty(name);

  const { width } = setDashboardRules(basicWidth, basicForceFit, smallScreenFit);

  const dv = transformData(data);
  const config = {
    ...defaultBase,
    width,
    radius: 0.6,
    lineSize: 4,
    data: dv.rows,
    xField: x,
    yField: y,
    seriesField: name,
    padding: [48, 48, 40, 48],
    xAxis: {
      title: {
        visible: false,
      },
      tickLine: {
        visible: true,
        style: { lineWidth: 1, stroke: '#ffffff' },
      },
      line: {
        style: { stroke: '#ffffff', fill: '#adaaaa' },
      },
      label: {
        visible: true,
        style: {
          fill: fontColor,
          fontSize: 12,
        },
      },
    },
    yAxis: {
      label: {
        visible: true,
        formatter: (value: any) => {
          return formatYAxis({ value, dataFormat, format });
        },
        style: {
          fill: '#d5d5d5',
          fontSize: 10,
        },
      },
      grid: {
        line: {
          style: {
            stroke: '#ffffff',
            opacity: 0.15,
            lineDash: [4],
          },
        },
      },
      title: {
        visible: false,
      },
    },
    events: {
      onPointClick: (ev: any) => {
        onClick(ev?.data);
      },
    },
    point: {
      visible: true,
      style: {
        stroke: '#fff',
        lineWidth: 2,
      },
    },
    label: {
      visible: true,
      type: 'point',
      offsetX: 16,
      offsetY: 14,
      style: {
        stroke: '',
        fill: fontColor,
        fontSize: 10,
      },
      formatter: (value: any, ev: any) => {
        const title = ev?._origin?.[x];
        const total = lodash.sumBy(data, (item: any) => item[title]);
        return ` ${formatValue({ value, total, dataFormat, format })}`;
      },
    },
    legend: {
      position: 'top-center',
      text: {
        formatter: (text: any) => formatMessageApi({ [nameMiscType]: text }),
        style: {
          fill: fontColor,
          fontSize: 12,
        },
      },
    },
    tooltip: {
      // 如果值为数据字段名，则会展示数据中对应该字段的数值，如果数据中不存在该字段，则直接展示 title 值
      title: formatMessageApi({ report_label: name }) + ' ',
      formatter: (title: any, value: any, _name: any) => {
        const total = lodash.sumBy(data, (item: any) => item[title]);
        if (!isEmptyName) {
          return {
            title: formatMessageApi({ [xMiscType]: title }),
            name: `${formatMessageApi({ [nameMiscType]: _name })}：`,
            value: formatValue({ value, total, dataFormat, format }),
          };
        } else {
          return {
            title: formatMessageApi({ [xMiscType]: title }),
            name: formatMessageApi({ [xMiscType]: title }),
            value: formatValue({ value, total, dataFormat, format }),
          };
        }
      },
    },
  };

  useEffect(() => {
    // @ts-ignore
    const linePlot = new Line(document.getElementById(containerId), config);
    setPlot(linePlot);
    linePlot.render();
  }, []);

  useEffect(() => {
    if (plot) {
      const dv = transformData(props?.chartData?.data);
      plot.changeData(dv?.rows);
    }
  }, [props?.chartData?.data]);

  return <div id={containerId} className={styles.g2Chart} />;
}
