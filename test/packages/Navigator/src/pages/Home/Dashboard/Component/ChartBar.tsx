import React, { useEffect, useState, useMemo } from 'react';
import { GroupedColumn } from '@ctc/g2plot';
// @ts-ignore
import DataSet from '@antv/data-set/lib';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import { defaultBase } from '../Config';
import { formatValue, formatYAxis } from '../Utils';
import styles from './chart.less';
import { LS, LSKey } from '@/utils/cache';

export default function ChartBar(props: any) {
  const [plot, setPlot]: any = useState();

  const containerId = `ChartBar_${props?.dashboardCode}`;
  const {
    chartData,
    type = 'interval',
    onClick,
    dataFormat,
    format,
    xMiscType,
    nameMiscType,
    width: basicWidth,
    forceFit: basicForceFit,
    smallScreenFit,
    dashboardCode,
    // scaleType,
  } = props;
  const maxHighFromIntervalStack = useMemo(() => {
    if (type !== 'intervalStack') return undefined;
    const { data, fields = [] } = chartData;
    return fields
      ? Math.max(...fields?.map((field: any) => lodash.sumBy(data, (item: any) => item?.[field])))
      : 1;
  }, [chartData]);

  const maxHighFromInterval = useMemo(() => {
    if (type === 'intervalStack') return undefined;
    const { data, fields = [] } = chartData;
    return fields
      ? Math.max(
          ...fields?.map((field: any) => lodash.maxBy(data, (item: any) => item?.[field])?.[field])
        )
      : 1;
  }, [chartData]);

  const handleData = (_chartData: any) => {
    const { data = [], fields = [], name } = _chartData;
    // if (this.props.type !== 'intervalStack') return data;
    // 如果没有堆叠，不需要补充数据，只有一层结构
    if (!name) return data;
    return data?.map((item: any) => {
      const object = { ...item };
      fields.forEach((field: any) => {
        if (!item[field]) {
          object[field] = 0;
        }
      });
      return object;
    });
  };
  const setDashboardRules = (_basicWidth: any, _basicForceFit: any, _smallScreenFit: any) => {
    if (!lodash.isEmpty(_smallScreenFit)) {
      return {
        // width: smallScreenFit.width,
        width: _basicWidth,
        forceFit: _smallScreenFit.forceFit,
      };
    }
    return {
      width: _basicWidth,
      forceFit: _basicForceFit,
    };
  };

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

  const data = handleData(chartData);
  const isIntervalStack = type === 'intervalStack';
  const { x, y = 'value', name } = chartData;
  const { width } = setDashboardRules(basicWidth, basicForceFit, smallScreenFit);
  const dv = transformData(data);
  const fontColor = LS.getItem(LSKey.THEME, false) == 'dark' ? '#fff' : '#595959';
  const config = {
    ...defaultBase,
    width,
    data: dv.rows,
    xField: x,
    yField: y,
    padding: [48, 48, 40, 48],
    groupField: name,
    columnSize: 32,
    xAxis: {
      title: {
        visible: false,
      },
      tickLine: {
        visible: true,
        style: { lineWidth: 1, stroke: fontColor },
      },
      line: {
        style: { stroke: fontColor, fill: fontColor },
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
        formatter: (value: any) => {
          return dashboardCode === 'DAS_PH_POS_00001_02'
            ? formatYAxis({ value, dataFormat, format }) * 100
            : formatYAxis({ value, dataFormat, format });
        },
        style: {
          fill: fontColor,
          fontSize: dashboardCode === 'DAS_PH_CLM_00004_02' ? 9 : 11,
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
    grid: {
      line: {
        style: {
          stroke: '#ffffff',
          opacity: 0.15,
          lineDash: [4],
        },
      },
    },
    legend: {
      position: 'top-center',
      offsetY: 6,
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
      title: name ? formatMessageApi({ report_label: name }) + ' ' : '',
      fields: lodash.compact([x, y, name]),
      formatter: (title: any, value: any, _name: any) => {
        const total = lodash.sumBy(data, (item: any) => item[title]);
        if (!name) {
          return {
            title: undefined,
            name: formatMessageApi({ [xMiscType]: title }),
            value: formatValue({ value, total, dataFormat, format }),
          };
        }
        return {
          title: formatMessageApi({ [xMiscType]: title }) + ' ',
          name: formatMessageApi({ [nameMiscType]: _name }),
          value:
            dashboardCode === 'DAS_PH_POS_00001_02'
              ? `${Number(formatValue({ value, total, dataFormat, format }) * 100).toFixed(2)} %`
              : formatValue({ value, total, dataFormat, format }),
        };
      },
    },
    label: {
      visible: true,
      formatter: (value: any, ev: any) => {
        const title = ev?._origin?.[x];
        const total = lodash.sumBy(data, (item: any) => item[title]);
        if (type === 'interval') {
          if (!value) return 0;
          if (maxHighFromInterval && value / maxHighFromInterval < 0.05) {
            return formatValue({
              value,
              total,
              lineBreak: true,
              dataFormat,
              format,
            });
          }

          return '';
        }
        return maxHighFromIntervalStack && value / maxHighFromIntervalStack > 0.05
          ? formatValue({ value, total, lineBreak: true, dataFormat, format })
          : '';
      },
      style: {
        fill: fontColor,
        stroke: '',
        fontSize: 8,
      },
      offsetY: isIntervalStack ? 0 : -20,
    },
    events: {
      onPieClick: (ev: any) => {
        onClick(ev?.data);
      },
    },
  };
  useEffect(() => {
    const groupedColumnPlot = new GroupedColumn(
      // @ts-ignore
      document.getElementById(containerId),
      config
    );
    setPlot(groupedColumnPlot);
    groupedColumnPlot.render();
  }, []);

  useEffect(() => {
    if (plot) {
      const _dv = transformData(chartData?.data);
      plot.changeData(_dv?.rows);
    }
  }, [chartData?.data]);

  return <div id={containerId} className={styles.g2Chart} />;
}
