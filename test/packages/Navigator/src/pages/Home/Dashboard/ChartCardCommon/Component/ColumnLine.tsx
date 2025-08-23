import React, { useMemo } from 'react';
import { Chart, Geom, Axis, Tooltip, Label, Legend } from 'bizcharts';
// @ts-ignore
import DataSet from '@antv/data-set/lib';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import { defaultCommonBase } from '../../Config';
import { formatValue, formatYAxis, renderTooltipContent } from '../../Utils';
import { getLabelTemp } from './utils';
import useResizeRefresh, { ChartLoading } from './useResizeRefresh';
import styles from './chart.less';

export default function ChartBar(props: any) {
  const containerId = `ChartBar_${props?.dashboardCode}`;
  const {
    miscType,
    chartData,
    type = 'interval',
    onClick,
    dataFormat,
    format,
    xMiscType,
    nameMiscType,
    // scaleType,
    dashboardHidden,
    zoom,
  } = props;

  const { refresh, chartHeight, chartKey, getResponsivePx, getResponsivePxList } = useResizeRefresh(
    containerId,
    [chartData, dashboardHidden],
    zoom
  );

  const defaultGeomFontSize = getResponsivePx(12);
  const geomFontSize = defaultGeomFontSize < 12 ? 6 + getResponsivePx(6) : defaultGeomFontSize;
  const {
    xField,
    data,
    yField = 'value',
    name,
    lineSeriesField = '',
    columnGroupField = '',
  } = chartData;

  const mergeSeconds = (secDatas: any[]) => {
    return data[0].map((item: any) => {
      const target = secDatas.find((el) => el[xField] === item[xField]);
      return {
        ...item,
        ...target,
      };
    });
  };

  const handleData = (datas: any[]) => {
    if (!lineSeriesField) {
      return mergeSeconds(datas[1]);
    }
    const lineDatas = lodash.groupBy(data[1], lineSeriesField);
    return Object.keys(lineDatas).reduce(
      (res: any[], key: string) => res.concat(mergeSeconds(lineDatas[key])),
      []
    );
  };

  const newData = useMemo(() => handleData(chartData.data), [chartData.data]);

  const ds = new DataSet();
  const dv = ds.createView().source(newData);

  // const columnTypeCode = miscType?.[columnGroupField];
  // const lineTypeCode = miscType?.[lineSeriesField];

  // const { unit } = useMemo(
  //   () => getDataWithUnit(data?.[0], yField?.[0], dataFormat),
  //   [data, dataFormat]
  // );

  const fontColor = '#000000';
  const config = {
    ...defaultCommonBase,
    data: dv.rows,
    xField: xField,
    yField: yField,
    groupField: name,
    // chartData: (() => {
    //   const dataSet = new Set();
    //   const dataMap = new Map();

    //   lodash.forEach(data, (dataItem: any, index: number) => {
    //     lodash.forEach(dataItem, (item: any) => {
    //       const oldItem = dataMap.get(item[xField]) || {};
    //       const FieldMap = ['columnStackField', 'lineSeriesField'];
    //       const TypeCodeMap = [columnTypeCode, lineTypeCode];
    //       const currentField = lodash.get(props, `chartData.${FieldMap[index]}`);
    //       const newName = formatMessageApi({ [TypeCodeMap[index]]: item[currentField] });
    //       const xFieldDictCode = lodash.get(item, `${xField}_dictCode`);
    //       dataMap.set(item[xField], {
    //         ...oldItem,
    //         [newName]: item?.[yField[index]],
    //         [`${xField}_dictCode`]: xFieldDictCode,
    //       });
    //     });
    //   });
    //   console.log('dataMap----', { data, dataMap });
    //   dataMap.forEach((value, key) => {
    //     const newDatas = getDataWithUnit(value, 'total_record', dataFormat, true, true);

    //     // console.log('newDatas----', newDatas);

    //     dataSet.add({
    //       ...newDatas.datas,
    //       [xField]: key,
    //     });
    //   });

    //   return Array.from(dataSet);
    // })(),
    xAxis: {
      tickLine: {
        visible: true,
        style: { lineWidth: 1, stroke: fontColor },
      },
      line: {
        lineDash: [4, 4],
        stroke: '#12465533',
      },
      label: {
        visible: true,
        textStyle: {
          fill: '#8B9793',
          fontWeight: 'bold',
          fontSize: geomFontSize + '',
          axisType: 'x',
        },
      },
    },
    yAxis: {
      label: {
        formatter: (value: any) => {
          return formatYAxis({ value, dataFormat, format });
        },
        textStyle: {
          fontSize: geomFontSize + '',
          fill: '#12465533',
          fontWeight: 'bold',
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
    tooltip: {
      // visible: showTooltip,
      // 如果值为数据字段名，则会展示数据中对应该字段的数值，如果数据中不存在该字段，则直接展示 title 值
      title: formatMessageApi({ Label_COM_ReportCenter: name }) + ' ',
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
          value: formatValue({ value, total, dataFormat, format }),
        };
      },
    },
    label: {
      visible: true,
      content: yField,
      position: 'middle',
      offset: -1, // 调整标签位置
      textStyle: {
        textAlign: 'center',
        fill: '#000',
        fontSize: geomFontSize + '',
      },
      htmlTemplate: (text: string) =>
        getLabelTemp({
          content: text,
          fontSize: geomFontSize,
          strokeColor: '#D1D6D4',
          dataFormat,
        }),
    },
  };
  const element = document.getElementById(containerId);
  const lineWidth = Math.min(
    (element?.offsetWidth || 0) / (dv.rows.length || 1) / 2,
    getResponsivePx(30)
  );

  return (
    <div key={chartKey} id={containerId} className={styles.chartContainer}>
      {chartHeight === 0 ? (
        <ChartLoading />
      ) : (
        <>
          {!lodash.isEmpty(dv?.rows) && (
            <Chart
              key={chartKey}
              height={chartHeight}
              data={dv}
              scale={{
                [config.yField?.[0]]: { min: 0, tickCount: 5 },
                [config.yField?.[1]]: { min: 0, tickCount: 5 },
              }}
              // padding="auto"
              padding={getResponsivePxList([80, 50, 50, 50]) as [number, number, number, number]}
              onIntervalClick={(ev: any) => {
                onClick(ev?.data); // 点击事件
              }}
              forceFit
            >
              {/** @ts-ignore */}
              <Axis {...config.xAxis} name={config.xField} />
              {/** @ts-ignore */}
              <Axis {...config.yAxis} name={config.yField?.[0]} />
              {/** @ts-ignore */}
              <Axis {...config.yAxis} name={config.yField?.[1]} />
              {!!lineSeriesField && (
                <>
                  <Legend name={config.yField?.[0]} visible={false} />
                  <Legend
                    name={lineSeriesField}
                    // @ts-ignore
                    position="top-right"
                    offsetY={-getResponsivePx(20)}
                    // marker="square"
                  />
                </>
              )}
              <Tooltip inPlot={false} htmlContent={renderTooltipContent({ dataFormat })} />
              <Geom
                color={[config.yField?.[0], config.color]}
                type="interval"
                position={`${config.xField}*${config.yField?.[0]}`}
                size={lineWidth}
                adjust={[
                  {
                    type: 'dodge',
                    marginRatio: 1 / 32,
                  },
                ]}
              >
                {/** @ts-ignore */}
                <Label {...config.label} />
              </Geom>
              <Geom
                type="line"
                position={`${config.xField}*${config.yField?.[1]}`}
                color={[
                  `${!!lineSeriesField ? lineSeriesField : config.yField?.[1]}`,
                  !!lineSeriesField ? defaultCommonBase.color : [defaultCommonBase.color[0]],
                ]}
                size={3}
                // shape="smooth"
              />
            </Chart>
          )}
        </>
      )}
    </div>
  );
}
