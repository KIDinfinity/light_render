import React, { useMemo, useState } from 'react';
import { Chart, Geom, Axis, Tooltip, Label, Legend, Guide } from 'bizcharts';
// @ts-ignore
import DataSet from '@antv/data-set/lib';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import { defaultCommonBase } from '../../Config';
import { formatValue, formatYAxis, renderLegendTemplate, renderTooltipContent } from '../../Utils';
import { getLabelTemp, getDataWithUnit, isXAxia } from './utils';
import useResizeRefresh, { ChartLoading } from './useResizeRefresh';
import useStackLegends from './useStackLegends';
import styles from './chart.less';

export default function ChartBar(props: any) {
  const chartRef = React.useRef(null);
  const containerId = `ChartBar_${props?.dashboardCode}`;
  const {
    chartData,
    type = 'interval',
    onClick,
    dataFormat,
    format,
    xMiscType,
    nameMiscType,
    // scaleType,
    dashboardHidden,
    miscType,
    zoom,
  } = props;
  const [tooltipShared, setTooltipShared] = useState(lodash.has(chartData, 'name'));

  const isStack = type == 'intervalStack';

  const { chartKey, chartHeight, getResponsivePx, getResponsivePxList, px2rem, pageSize } =
    useResizeRefresh(containerId, [chartData, dashboardHidden], zoom);

  const defaultGeomFontSize = getResponsivePx(12);
  const geomFontSize = defaultGeomFontSize < 12 ? 6 + getResponsivePx(6) : defaultGeomFontSize;

  const handleData = (chartDataItem: any) => {
    const { data = [], fields = [], name } = chartDataItem;
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

  const data = handleData(chartData);
  const { x, y = 'value', name, fields } = chartData;

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
  const fontColor = '#000000';
  const config = {
    ...defaultCommonBase,
    data: dv.rows,
    xField: x,
    yField: y,
    groupField: name,
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
          cursor: 'pointer',
          axisType: 'x',
        },
      },
    },
    yAxis: {
      label: {
        autoRotate: false,
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
      content: y,
      position: type === 'intervalStack' ? 'middle' : 'top',
      offset: type === 'intervalStack' ? 0 : 10,
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
  const xLengh = lodash.keys(lodash.groupBy(dv.rows, config.xField))?.length;
  const lineWidth = Math.min((element?.offsetWidth || 0) / (xLengh || 1) / 2, getResponsivePx(26));

  const { datas, unit } = useMemo(() => {
    const formatKeyData = config?.data.map((item: any) => {
      return Object.keys(item).reduce((r: any, c: any) => {
        const formatTypeCode = miscType?.[c];
        if (formatTypeCode) {
          r[c] = formatMessageApi({ [formatTypeCode]: item[c] });
          r[`origin_${c}_value`] = item[c];
        } else {
          r[c] = item[c];
        }
        return r;
      }, {});
    });

    return getDataWithUnit(formatKeyData, y, dataFormat);
  }, [config?.data, y, dataFormat]);

  const { totalPages, pagedLegends, totalGroup, initLegendsFromChart } = useStackLegends({
    datas,
    name,
    containerId,
    yField: y,
    xField: x,
    pageSize,
  });

  const { legendItemTpl, containerTpl } = useMemo(() => {
    return {
      containerTpl: renderLegendTemplate.renderContainerTpl({
        totalPages,
        containerId,
        px2rem,
      }),
      legendItemTpl: renderLegendTemplate.renderLegendItemTpl({ pagedLegends, px2rem, totalPages }),
    };
  }, [pagedLegends, px2rem, containerId, totalPages]);

  const g2LegendStyles: React.CSSProperties = {
    height: px2rem(51),
    width: px2rem(440),
    position: 'absolute',
    overflow: 'visible',
    fontSize: px2rem(12),
    maxWidth: px2rem(600),
    minWidth: px2rem(440),
    lineHeight: px2rem(20),
    left: 0,
    top: 0,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  };

  return (
    <div key={chartKey} id={containerId} className={styles.chartContainer}>
      {chartHeight === 0 ? (
        <ChartLoading />
      ) : (
        <>
          {!lodash.isEmpty(dv?.rows) && (
            <Chart
              data={datas}
              scale={{
                [config.yField]: {
                  min: 0,
                  tickCount: 5,
                  ...(!!unit ? { min: 0, range: [0, 0.85], alias: `(${unit})` } : {}),
                },
              }}
              height={chartHeight}
              padding={getResponsivePxList([80, 50, 50, 50]) as [number, number, number, number]}
              onPlotClick={(ev: any) => {
                onClick({ ...ev, titleDicts: chartData?.titleDicts || {} }); // 点击事件
              }}
              onAxisLabelClick={(ev) => {
                if (!isXAxia(ev)) {
                  return;
                }
                const records = chartRef.current.getSnapRecords({ x: ev.x, y: ev.y });
                const legendLength = lodash.size(lodash.uniq(dv.rows.map((item) => item[name])));
                const extraData = {};
                if (legendLength !== records.length) {
                  extraData[name] = lodash.uniq(
                    records.map(
                      (item) => item._origin[`origin_${name}_value`] || item._origin[name]
                    )
                  );
                }
                onClick({
                  data: { _origin: { [x]: records[0]._origin[x], ...extraData } },
                  titleDicts: chartData?.titleDicts || {},
                }); // 点击
              }}
              onAxisLabelMouseenter={(ev) => {
                if (!isXAxia(ev)) {
                  return;
                }
                if (tooltipShared) {
                  return;
                }
                const records = chartRef.current.getSnapRecords({ x: ev.x, y: ev.y });
                if (lodash.has(chartData, 'name')) {
                  setTooltipShared(true);
                  setTimeout(() => {
                    chartRef.current.showTooltip({
                      x: records[0].x,
                      y: records[0].y[0] || records[0].y,
                    });
                  }, 0);
                } else {
                  setTimeout(() => {
                    chartRef.current.showTooltip({ x: records[0].x, y: records[0].y });
                  }, 0);
                }
              }}
              onAxisLabelMouseleave={(ev) => {
                if (!isXAxia(ev)) {
                  return;
                }

                if (lodash.has(chartData, 'name')) {
                  setTooltipShared(false);
                }
                chartRef.current.hideTooltip();
              }}
              onIntervalMouseenter={(ev) => {
                if (lodash.has(chartData, 'name') && tooltipShared) {
                  setTooltipShared(false);
                }
              }}
              onGetG2Instance={(chart) => {
                chartRef.current = chart;
                initLegendsFromChart(chart);
              }}
              forceFit
            >
              {!!name && (
                <Legend
                  position="top-center"
                  offsetX={0}
                  useHtml={true}
                  offsetY={getResponsivePx(-5)}
                  g2-legend={g2LegendStyles}
                  containerTpl={containerTpl}
                  itemTpl={legendItemTpl}
                />
              )}
              {/** @ts-ignore */}
              <Axis
                {...config.xAxis}
                name={config.xField}
                label={{
                  visible: true,
                  textStyle: {
                    fill: '#8B9793',
                    fontWeight: 'bold',
                    fontSize: geomFontSize + '',
                    cursor: 'pointer',
                    axisType: 'x',
                  },
                }}
              />
              {/** @ts-ignore */}
              <Axis
                {...config.yAxis}
                name={config.yField}
                {...(!!unit
                  ? {
                      title: {
                        autoRotate: false,
                        position: 'end',
                        offset: 5.5,
                        textStyle: {
                          fontSize: '12',
                          textAlign: 'right',
                          fill: '#999',
                          fontWeight: 'bold',
                          rotate: 0,
                        },
                      },
                      grid: {
                        hideLastLine: true,
                        type: 'line',
                      },
                    }
                  : {})}
              />
              <Tooltip
                shared={tooltipShared}
                inPlot={false}
                htmlContent={renderTooltipContent({ dataFormat })}
              />
              {/*
              @ts-ignore */}
              <Geom
                color={[name ? name : config.yField, name ? config.color : [config.color[0]]]}
                type={type}
                position={`${config.xField}*${config.yField}`}
                size={lineWidth}
                adjust={[
                  {
                    type: 'dodge',
                    marginRatio: 1 / 32,
                  },
                ]}
              >
                {/** @ts-ignore */}
                {!isStack && <Label {...config.label} />}
              </Geom>
              {!!name && isStack && totalGroup && (
                <Guide>
                  {Object.entries(totalGroup).map(([xVal, total]) => (
                    <Guide.Text
                      key={`total-${xVal}`}
                      position={[xVal, total]}
                      content={`${total}`}
                      style={{
                        fill: '#183028',
                        // fontFamily: `var(--font-family)`,
                        fontSize: geomFontSize + '',
                        textAlign: 'center',
                        fontWeight: 700,
                        opacity: !!total ? 1 : 0,
                      }}
                      offsetY={-10}
                    />
                  ))}
                </Guide>
              )}
            </Chart>
          )}
        </>
      )}
    </div>
  );
}
