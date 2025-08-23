import React, { useMemo, useState } from 'react';
import { Chart, Geom, Tooltip, Label, Legend, Axis } from 'bizcharts';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Config, { ComboColor, Colors } from '../../Config';
import { formatLegend, formatValue, formatYAxis, renderTooltipContent } from '../../Utils';
import styles from './chart.less';
import { getLabelTemp, isXAxia } from './utils';
import useResizeRefresh, { ChartLoading } from './useResizeRefresh';
const transformData = (dataA: any[], objectB: any, dataFormat) => {
  if (!dataA || dataA.length !== 2) {
    return { data: [], formatYFields: [] };
  }
  const result: any[] = [];
  const leftData = dataA[0];
  const rightData = dataA[1];

  const allClaimTypes = new Set([
    ...leftData.map((item: any) => item[objectB.xField]),
    ...rightData.map((item: any) => item[objectB.xField]),
  ]);
  let formatYFields = objectB.yField;

  allClaimTypes.forEach((claimType) => {
    const leftItem = leftData.find((item: any) => item[objectB.xField] === claimType);
    const rightItem = rightData.find((item: any) => item[objectB.xField] === claimType);

    const transformedItem: any = {
      [objectB.xField]: claimType,
      [leftItem?.[objectB.leftSerieField] || '']: leftItem?.[objectB.yField?.[0]] || 0,
      [rightItem?.[objectB.rightSerieField] || '']: rightItem?.[objectB.yField?.[1]] || 0,
    };
    formatYFields = [
      leftItem?.[objectB.leftSerieField] || '',
      rightItem?.[objectB.rightSerieField] || '',
    ];
    result.push(transformedItem);
  });

  return { data: result, formatYFields };
};

const DualLineChart = (props: any) => {
  const containerId = `DualLine_${props?.dashboardCode}`;
  const { dataFormat, format, miscType, onClick, zoom } = props;
  const [tooltipShared, setTooltipShared] = useState(false);
  const chartRef = React.useRef(null);
  const {
    refresh,
    chartWidth,
    chartHeight,
    chartKey,
    getResponsivePx,
    getResponsivePxList,
    px2rem,
  } = useResizeRefresh(containerId, [], zoom);

  const defaultGeomFontSize = getResponsivePx(12);
  const geomFontSize = defaultGeomFontSize < 12 ? 6 + getResponsivePx(6) : defaultGeomFontSize;
  const { width, leftSerieField, rightSerieField, data, xField, yField } = props?.chartData || {};
  const defaultConfig = Config({
    combo: true,
    ...props,
  });

  const lineColor = defaultConfig.color;

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
            // @ts-ignore
            const total = lodash.head(data)?.[yField[0]] || 0;
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
            // @ts-ignore
            const total = lodash.head(data)?.[yField[0]] || 0;

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
        // @ts-ignore
        const total = lodash.head(data)?.[yField[0]] || 0;
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
          axisType: 'x',
          cursor: 'pointer',
        },
      },
    },
    yAxis: {
      label: {
        formatter: (value: any) => formatYAxis({ value, dataFormat, format }),
        textStyle: {
          fontSize: geomFontSize,
          fill: '#d1d6d4',
          fontWeight: 'bold',
        },
      },
    },
  };

  const resultData = useMemo(
    () => transformData(data, props.chartData, dataFormat),
    [props.chartData, dataFormat]
  );
  const scale = {
    [resultData?.formatYFields?.[0]]: { min: 0, tickCount: 5 },
    [resultData?.formatYFields?.[1]]: { min: 0, tickCount: 5 },
  };

  const g2LegendStyles: React.CSSProperties = {
    height: px2rem(51),
    width: px2rem(500),
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

  const legendItemTpl = (value?: string, item?: string, _?: boolean, index?: number) => {
    return (
      `<li class="g2-legend-list-item item-${index} {checked}" data-color="{originColor}" data-value="${value}" style="cursor: pointer;font-size: ${px2rem(
        12
      )};margin-top:0 !important;" title="${value}">` +
      `<i class="g2-legend-marker" style="width:${px2rem(10)};height:${px2rem(
        10
      )};display:inline-block;background-color: ${item};"></i>` +
      `<span class="g2-legend-text" style="color: #124655;vertical-align: middle;">${value}</span></li>`
    );
  };

  return (
    <div id={containerId} key={chartKey} className={styles.chartContainer}>
      {chartHeight === 0 ? (
        <ChartLoading />
      ) : (
        <Chart
          key={chartKey}
          height={chartHeight}
          width={chartWidth}
          scale={scale}
          animate={false}
          data={resultData.data}
          padding={getResponsivePxList([80, 50, 50, 50]) as [number, number, number, number]}
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
          onAxisLabelClick={(ev) => {
            if (!isXAxia(ev)) {
              return;
            }
            const records = chartRef.current.getSnapRecords({ x: ev.x, y: ev.y });

            onClick({ data: { _origin: { [xField]: records[0]._origin[xField] } } }); // 点击
          }}
          onAxisLabelMouseenter={(ev) => {
            if (!isXAxia(ev)) {
              return;
            }
            if (tooltipShared) {
              return;
            }
            const records = chartRef.current.getSnapRecords({ x: ev.x, y: ev.y });

            setTooltipShared(true);
            setTimeout(() => {
              chartRef.current.showTooltip({ x: records[0].x, y: records[0].y });
            }, 0);
          }}
          onAxisLabelMouseleave={(ev) => {
            if (!isXAxia(ev)) {
              return;
            }
            setTooltipShared(false);

            chartRef.current.hideTooltip();
          }}
          onLineMouseenter={(ev: any) => {
            const nearPoint = ev?.data?.reduce((prev: any, curr: any) =>
              Math.abs(curr?.x - ev?.x) < Math.abs(prev?.x - ev?.x) ? curr : prev
            );
            if (nearPoint) {
              setTooltipShared(true);
              setTimeout(() => {
                chartRef?.current?.showTooltip?.(nearPoint);
              }, 0);
            }
          }}
          onLineMouseleave={(ev: any) => {
            setTooltipShared(false);
            chartRef?.current?.hideTooltip?.();
          }}
          onPointMouseenter={(ev: any) => {
            setTooltipShared(true);
            setTimeout(() => {
              chartRef?.current?.showTooltip?.(ev);
            }, 0);
          }}
          onPointMouseleave={(ev: any) => {
            setTooltipShared(false);
            chartRef?.current?.hideTooltip?.();
          }}
          onGetG2Instance={(chart) => {
            chartRef.current = chart;
          }}
          forceFit
        >
          <Axis {...config.xAxis} name={xField} />
          <Axis {...config.yAxis} name={resultData?.formatYFields?.[0]} />
          <Axis
            {...config.yAxis}
            label={{
              formatter: (value: any) => formatYAxis({ value, dataFormat, format }),
              textStyle: {
                fill: '#12465533',
                fontWeight: 'bold',
                fontSize: geomFontSize + '',
              },
            }}
            name={resultData?.formatYFields?.[1]}
            position="right"
          />
          <Tooltip
            shared={tooltipShared}
            triggerOn={'none'}
            inPlot={false}
            htmlContent={renderTooltipContent({ dataFormat })}
          />
          {/** @ts-ignore */}
          <Geom
            type="line"
            position={`${xField}*${resultData?.formatYFields?.[0]}`}
            color={lineColor[0]}
          >
            <Label
              content={resultData?.formatYFields?.[0]}
              autoRotate={false}
              offset={getResponsivePx(10)}
              htmlTemplate={(text, item) =>
                getLabelTemp({
                  content: text,
                  fontSize: geomFontSize,
                  strokeColor: item.color,
                  dataFormat,
                })
              }
            />
          </Geom>
          <Geom
            type="point"
            opacity={0}
            position={`${xField}*${resultData?.formatYFields?.[0]}`}
            color={lineColor[0]}
          />
          <Legend
            position="top-center"
            offsetX={0}
            offsetY={-getResponsivePx(5)}
            clickable={false}
            custom
            items={[
              {
                value: resultData?.formatYFields?.[0],
                marker: { symbol: 'square', fill: lineColor[0], radius: 6 },
              },
              {
                value: resultData?.formatYFields?.[1],
                marker: { symbol: 'square', fill: lineColor[1], radius: 6 },
              },
            ]}
            useHtml={true}
            g2-legend={g2LegendStyles}
            containerTpl={`
              <div class="g2-legend" style="position:absolute;top:20px;right:60px;width:auto;">
              <h4 class="g2-legend-title"></h4>
              <div  class="g2-legend-list-wrapper" style=" overflow: hidden;position: relative;flex: 1; height: ${px2rem(32)};">
                <ul class="g2-legend-list" style="list-style-type:none;margin:0;padding:0;"></ul>
                </div>
                
                </div>
                  `}
            itemTpl={legendItemTpl}
          />
          {/** @ts-ignore */}
          <Geom
            type="line"
            position={`${xField}*${resultData?.formatYFields?.[1]}`}
            color={lineColor[1]}
            size={getResponsivePx(3)}
          >
            <Label
              content={resultData?.formatYFields?.[1]}
              autoRotate={false}
              offset={getResponsivePx(20)}
              htmlTemplate={(text, item) =>
                getLabelTemp({
                  content: text,
                  fontSize: geomFontSize,
                  strokeColor: item.color,
                  dataFormat,
                })
              }
            />
          </Geom>
          <Geom
            type="point"
            opacity={0}
            position={`${xField}*${resultData?.formatYFields?.[1]}`}
            color={lineColor[1]}
          />
        </Chart>
      )}
    </div>
  );
};

export default DualLineChart;
