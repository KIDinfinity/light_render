import React, { useCallback, useMemo, useRef } from 'react';
import { Chart, Geom, Tooltip, Label, Legend, Axis } from 'bizcharts';
// @ts-ignore
import DataSet from '@antv/data-set/lib';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import { defaultCommonBase } from '../../Config';
import {
  formatYAxis,
  renderTooltipContent,
  niceScaleTicks,
  renderLegendTemplate,
} from '../../Utils';
import { LS, LSKey } from '@/utils/cache';
import { getLabelTemp, getDataWithUnit, isXAxia } from './utils';
import useResizeRefresh, { ChartLoading } from './useResizeRefresh';
import styles from './chart.less';
import useStackLegends from './useStackLegends';

export default function ChartLine(props: any) {
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
    zoom,
  } = props;

  const { refresh, chartHeight, chartKey, getResponsivePx, getResponsivePxList, px2rem, pageSize } =
    useResizeRefresh(containerId, [], zoom);

  const defaultGeomFontSize = getResponsivePx(12);
  const chartRef = useRef<any>(null);
  const geomFontSize = defaultGeomFontSize < 12 ? 6 + getResponsivePx(6) : defaultGeomFontSize;

  const g2LegendStyles: React.CSSProperties = {
    height: px2rem(51),
    width: px2rem(440),
    position: 'absolute',
    overflow: 'visible',
    fontSize: px2rem(12),
    maxWidth: px2rem(500),
    minWidth: px2rem(440),
    lineHeight: px2rem(20),
    left: 0,
    top: 0,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  };

  const setDashboardRules = useCallback(
    (_basicWidth: any, _basicForceFit: any, _smallScreenFit: any) => {
      if (!lodash.isEmpty(smallScreenFit)) {
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

  const { width } = setDashboardRules(basicWidth, basicForceFit, smallScreenFit);

  const dv = transformData(data);
  const config = {
    ...defaultCommonBase,
    width,
    radius: 0.6,
    lineSize: 4,
    data: dv.rows,
    xField: x,
    yField: y,
    seriesField: name,
    padding: [48, 48, 40, 48],
    xAxis: {
      line: {
        lineDash: [4, 4],
        stroke: '#d1d6d4',
      },
      label: {
        visible: true,
        textStyle: {
          fill: '#d1d6d4',
          fontWeight: 'bold',
          fontSize: geomFontSize,
          cursor: 'pointer',
        },
      },
    },
    yAxis: {
      label: {
        textStyle: {
          fontSize: geomFontSize,
          fill: '#d1d6d4',
          fontWeight: 'bold',
        },
      },
    },
    point: {
      visible: true,
      style: {
        stroke: '#fff',
        lineWidth: 2,
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
  };

  const { datas, unit } = useMemo(
    () => getDataWithUnit(config.data, y, dataFormat),
    [config.data, y, dataFormat]
  );

  const { totalPages, pagedLegends, initLegendsFromChart } = useStackLegends({
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

  return (
    <div id={containerId} key={chartKey} className={styles.chartContainer}>
      {chartHeight === 0 ? (
        <ChartLoading />
      ) : (
        <Chart
          key={chartKey}
          height={chartHeight}
          scale={{
            [y]: {
              ticks: niceScaleTicks(dv.rows, y, 5),
              ...(!!unit ? { min: 0, range: [0, 0.85], alias: `(${unit})` } : {}),
              // formatter: (val: any) => {
              //   return `${val}${unit ? ` ${unit}` : ''}`;
              // },
            },
          }}
          animate={false}
          data={datas}
          padding={getResponsivePxList([80, 50, 50, 50]) as [number, number, number, number]}
          onAxisLabelClick={(ev) => {
            if (!isXAxia(ev)) {
              return;
            }
            const records = chartRef.current.getSnapRecords({ x: ev.x, y: ev.y });
            const legendLength = lodash.size(lodash.uniq(dv.rows.map((item) => item[name])));
            const extraData = {};
            if (legendLength !== records.length) {
              extraData[name] = lodash.uniq(
                records.map((item) => item._origin[`origin_${name}_value`] || item._origin[name])
              );
            }
            onClick({ data: { _origin: { [x]: records[0]._origin[x], ...extraData } } }); // 点击
          }}
          onPlotClick={(ev) => {
            if (lodash.has(ev, 'data') && lodash.isArray(ev.data)) {
              const nearPoint = lodash.minBy(
                ev.data.map((item) => ({ ...item, nearX: Math.abs(ev.x - item.x) })),
                'nearX'
              );
              onClick({ ...ev, data: nearPoint });
            } else {
              onClick(ev);
            }
          }}
          forceFit
          onAxisLabelMouseenter={(ev) => {
            if (!isXAxia(ev)) {
              return;
            }
            const records = chartRef.current.getSnapRecords({ x: ev.x, y: ev.y });

            chartRef.current.showTooltip({ x: records[0].x, y: records[0].y });
          }}
          onAxisLabelMouseleave={(ev) => {
            if (!isXAxia(ev)) {
              return;
            }
            chartRef.current.hideTooltip();
          }}
          onGetG2Instance={(chart) => {
            chartRef.current = chart;
            initLegendsFromChart(chart);
          }}
          onPointMouseenter={(ev: any) => {
            chartRef?.current?.showTooltip?.(ev);
          }}
          onPointMouseleave={(ev: any) => {
            chartRef?.current?.hideTooltip?.();
          }}
          onLineMouseenter={(ev: any) => {
            const nearPoint = ev?.data?.reduce((prev: any, curr: any) =>
              Math.abs(curr?.x - ev?.x) < Math.abs(prev?.x - ev?.x) ? curr : prev
            );
            if (nearPoint) {
              chartRef?.current?.showTooltip?.(nearPoint);
            }
          }}
          onLineMouseleave={(ev: any) => {
            chartRef?.current?.hideTooltip?.();
          }}
        >
          <Axis
            {...config.xAxis}
            name={x}
            label={{
              textStyle: {
                fill: '#8B9793',
                fontWeight: 'bold',
                fontSize: geomFontSize + '',
                cursor: 'pointer',
                axisType: 'x',
              },
            }}
          />
          <Axis
            {...config.yAxis}
            name={y}
            label={{
              formatter: (value: any) => {
                return formatYAxis({ value, dataFormat, format });
              },
              autoRotate: false,
              textStyle: {
                fill: '#12465533',
                fontWeight: 'bold',
                fontSize: geomFontSize,
              },
            }}
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
            useHtml={!!dataFormat}
            triggerOn={'none'}
            htmlContent={renderTooltipContent({ dataFormat, config, xField: x })}
            shared={false}
            triggerOn={'none'}
            inPlot={false}
          />
          {/** @ts-ignore */}
          <Geom
            type="line"
            position={`${x}*${y}`}
            color={[
              `${!!name ? name : y}`,
              !!name ? defaultCommonBase.color : [defaultCommonBase.color[0]],
            ]}
          >
            <Label
              content={y}
              autoRotate={true}
              offset={10}
              htmlTemplate={(text, item) => {
                return getLabelTemp({
                  content: text,
                  allowEmpty: true,
                  fontSize: geomFontSize,
                  strokeColor: item.color,
                  stokeWidth: 1,
                  dataFormat,
                  format,
                  decimal: 0,
                });
              }}
            />
          </Geom>
          {/** @ts-ignore */}
          <Geom
            type="point"
            position={`${x}*${y}`}
            opacity={0}
            color={[
              `${!!name ? name : y}`,
              !!name ? defaultCommonBase.color : [defaultCommonBase.color[0]],
            ]}
          />
          {!!name ? (
            // <Legend position="top-center" offsetY={-getResponsivePx(20)} marker="square" />
            <Legend
              position="top-center"
              offsetX={0}
              useHtml={true}
              offsetY={getResponsivePx(-5)}
              g2-legend={g2LegendStyles}
              containerTpl={containerTpl}
              itemTpl={legendItemTpl}
            />
          ) : null}
        </Chart>
      )}
    </div>
  );
}
