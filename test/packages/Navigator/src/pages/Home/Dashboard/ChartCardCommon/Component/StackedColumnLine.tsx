import React, { useMemo, useRef, useState } from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import DataSet from '@antv/data-set';
import { Chart, Geom, Axis, Tooltip, Legend, Guide } from 'bizcharts';
import { formatYAxis, niceScaleTicks } from '../../Utils';
import { CommonColors } from '../../Enum/Colors';
import { getDataWithUnit, isXAxia } from './utils';
import classnames from 'classnames';
import useResizeRefresh, { ChartLoading } from './useResizeRefresh';
import useStackLegends from './useStackLegends';
import styles from './chart.less';

export default (props: any) => {
  const { miscType, dashboardCode, onClick, dataFormat, format, zoom } = props;
  const containerId = `StackedColumnLine_${dashboardCode}`;
  const [tooltipShared, setTooltipShared] = useState(false);
  const {
    chartHeight,
    chartWidth,
    chartKey,
    getResponsivePx,
    getResponsivePxList,
    px2rem,
    pageSize,
  } = useResizeRefresh(containerId, [], zoom);
  const chartRef = useRef<any>(null);

  const {
    data,
    lineSeriesField = '',
    columnStackField = '',
    xField,
    yField,
  } = props?.chartData || {};

  const { unit } = useMemo(
    () => getDataWithUnit(data?.[0], yField?.[0], dataFormat),
    [data, dataFormat]
  );

  const lineColor = CommonColors; // ['#FFE3E3', '#FED141', '#E87722CC'];
  const columnTypeCode = miscType?.[columnStackField];
  const lineTypeCode = miscType?.[lineSeriesField];
  const dataFormatObj: Record<string, any> = {};
  const config = {
    chartData: (() => {
      const dataSet = new Set();
      const dataMap = new Map();
      lodash.forEach(data, (dataItem: any, index: number) => {
        lodash.forEach(dataItem, (item: any) => {
          const oldItem = dataMap.get(item[xField]) || {};
          const FieldMap = ['columnStackField', 'lineSeriesField'];
          const TypeCodeMap = [columnTypeCode, lineTypeCode];
          const currentField = lodash.get(props, `chartData.${FieldMap[index]}`);
          const name = formatMessageApi({ [TypeCodeMap[index]]: item[currentField] });
          const xFieldDictCode = lodash.get(item, `${xField}_dictCode`);
          (dataFormatObj[`${item[xField]}_dictCode`] = xFieldDictCode),
            (dataFormatObj[`${name}_dictCode`] = item[currentField]),
            dataMap.set(item[xField], {
              ...oldItem,
              [name]: item?.[yField[index]],
              [lineSeriesField]: item[currentField],
            });
        });
      });
      dataMap.forEach((value, key) => {
        const newDatas = getDataWithUnit(value, 'value', dataFormat, true);
        dataSet.add({
          ...newDatas.datas,
          [xField]: key,
        });
      });
      return Array.from(dataSet);
    })(),
    columnKey: (() => {
      const keySet = new Set();
      lodash
        .chain(data)
        .flatten()
        .forEach((item) => {
          if (!!item?.[columnStackField]) {
            keySet.add(formatMessageApi({ [columnTypeCode]: item?.[columnStackField] }));
          }
        })
        .value();
      return Array.from(keySet);
    })(),
    lineKey: (() => {
      const keySet = new Set();
      lodash
        .chain(data)
        .flatten()
        .forEach((item) => {
          if (!!item?.[lineSeriesField]) {
            keySet.add(formatMessageApi({ [lineTypeCode]: item?.[lineSeriesField] }));
          }
        })
        .value();
      return Array.from(keySet);
    })(),
    scale: (() => {
      const lineScaleMap = new Map();
      lodash
        .chain(data)
        .flatten()
        .map((item) => {
          if (!!item?.[lineSeriesField]) {
            return formatMessageApi({ [lineTypeCode]: item?.[lineSeriesField] });
          } else {
            return null;
          }
        })
        .compact()
        .forEach((item) =>
          lineScaleMap.set(item, {
            min: 0,
            nice: false,
          })
        )
        .value();
      lineScaleMap.set('value', {
        min: 0,
      });
      return Object.fromEntries(lineScaleMap);
    })(),
    columnLegendText: formatMessageApi({ [lineTypeCode]: `${columnStackField}_LegendText` }),
    lineLegendText: formatMessageApi({ [lineTypeCode]: `${lineSeriesField}_LegendText` }),
    tooltipText: formatMessageApi({ [lineTypeCode]: `${dashboardCode}_TooltipText` }),
  };
  const ds = new DataSet();
  ds.setState(columnStackField, '');
  const dv = ds.createView().source(config?.chartData);
  dv.transform({
    type: 'fold',
    fields: config?.columnKey, // 展开字段集
    key: columnStackField, // key字段
    value: 'value', // value字段
  }).transform({
    type: 'filter',
    callback: (d: any) => {
      return d?.[columnStackField] !== ds.state[columnStackField];
    },
  });

  const legendItems = lodash.map(config.lineKey, (lineItem, index) => {
    return { value: lineItem, marker: { symbol: 'line', stroke: lineColor[index] } };
  });
  const linetotal = Math.ceil(legendItems.length / pageSize);
  const defaultGeomFontSize = getResponsivePx(12);
  const geomFontSize = defaultGeomFontSize < 12 ? 6 + getResponsivePx(6) : defaultGeomFontSize;

  const g2LegendStyles: React.CSSProperties = React.useMemo(
    () => ({
      height: px2rem(51),
      width: '100%',
      position: 'absolute',
      overflow: 'visible',
      fontSize: px2rem(12),
      maxWidth: `${chartWidth}px`,
      minWidth: '100%',
      lineHeight: px2rem(20),
      left: '0px',
      top: '0px',
      paddingLeft: px2rem(20),
    }),
    []
  );

  const {
    pagedLegends,
    linePage,
    totalPages,
    totalGroup,
    initLegendsFromChart,
    allLegends,
    activeLegends,
    allTotalGroup,
  } = useStackLegends({
    datas: dv.rows,
    name: columnStackField,
    containerId,
    xField,
    pageSize,
    linetotal,
  });
  const scale = useMemo(() => {
    return lodash.mapValues(config.scale, (item) => {
      const totalArray = Object.values(allTotalGroup) || [];
      const min = Math.min(...totalArray);
      const max = Math.max(...totalArray);
      return {
        ticks: niceScaleTicks(undefined, undefined, 5, { min, max }),
        ...(!!unit ? { min: 0, range: [0, 0.85], alias: `(${unit})` } : {}),
      };
    });
  }, [allTotalGroup, unit]);

  const lineLegendHtml = ({
    lineLegendText,
    legendItems,
  }: {
    lineLegendText: string;
    legendItems: any[];
  }) => {
    legendItems = legendItems.slice(linePage * pageSize, (linePage + 1) * pageSize);

    return `
  <div style=" display: flex;">
    <span style="color:#124655;vertical-align:top;margin-right:${px2rem(
      20
    )};font-weight:bold;font-size:${px2rem(12)};width: ${px2rem(130)}; display: inline-block;margin-top: ${px2rem(
      -4
    )};">
      ${lineLegendText}
    </span>
    <div class="g2-legend-list-wrapper" style=" overflow: hidden;position: relative;flex: 1; height: ${px2rem(24)};margin-right:4%; display: flex; ">
    <ul class="g2-legend-list" style="list-style-type:none;margin:0;padding:0; height: ${px2rem(20)};overflow: hidden;display: flex;gap: 0;">
      ${lodash
        .map(
          legendItems,
          (item) =>
            `<li class="g2-legend-list-item" style="cursor: pointer;font-size: ${px2rem(12)};margin-top:0 !important;display:inline-block; width:83px;margin-left: 0;justify-content: flex-start;">
              <i class="g2-legend-marker" style="width:${px2rem(10)};height:${px2rem(3)};display:inline-block;background-color: ${
                item?.marker?.stroke
              };vertical-align: middle;margin-top: ${px2rem(6)} !important;height: 4px !important;"></i>
              <span class="g2-legend-text" style="color: #124655;vertical-align: middle;">${
                item.value
              }</span>
            </li>`
        )
        .join(' ')}
    </ul>
    </div>
  </div>
  `;
  };

  const legendTpl = ({
    columnLegendText,
    lineLegendText,
    legendItems,
  }: {
    columnLegendText: string;
    lineLegendText: string;
    legendItems: any[];
  }) =>
    `
      <div class="g2-legend" style="padding-right: ${px2rem(50)};">
       <div style="position: relative;display: flex;flex-direction: row;align-items: center;margin-top: ${px2rem(5)}; margin-right:4%;">
        <span style="color:#124655;vertical-align: super;margin-right:${px2rem(
          20
        )};position: relative;top: ${px2rem(3)};font-weight:bold;font-size:${px2rem(
          12
        )};width: ${px2rem(130)}; margin-top:${px2rem(-10)} ">${columnLegendText}</span>
        <div class="g2-legend-list-wrapper" style=" overflow: hidden;position: relative;flex: 1; height: ${px2rem(24)};margin-top:${px2rem(10)};${totalPages === 1 && 'display: flex;'} ">
        <ul class="g2-legend-list" style="text-align:left !important;list-style-type:none;margin:0;padding:0;${totalPages > 1 && 'transform: translateX(10px);'}" ></ul>
        </div>
        ${
          totalPages > 1
            ? `<div style=" position: absolute;top:0; left:0; z-index:9999;margin-top: 10px;width: 100%;">
                <button class="${containerId}-prev" style="cursor: pointer; border:none; background:none;position: absolute;top: ${px2rem(-5)};left: ${px2rem(153)};" ><i aria-label="icon: left" tabindex="-1" class="anticon anticon-left react-app-pages-home-watching-view-card-index-swiperPrevButton"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></svg></i></button>
                <button class="${containerId}-next" style="cursor: pointer; border:none; background:none;position: absolute;top:${px2rem(-5)}; right: ${px2rem(14)};" ><i aria-label="icon: right" tabindex="-1" class="anticon anticon-right react-app-pages-home-watching-view-card-index-swiperNextButton"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path></svg></i></button>
              </div>`
            : ''
        }
        </div>
        <div style="position:relative; height:${px2rem(35)}">${lineLegendHtml({
          lineLegendText,
          legendItems,
        })}</div>
      </div>
    `;

  const legendItemTpl = useMemo(() => {
    return (value, item, _, index) => {
      const showPagination = totalPages > 1;
      if (!pagedLegends.includes(value)) {
        return `<li class="empty-hidden"></li>`;
      }
      const wrapStyle = showPagination
        ? `word-break:break-word;white-space:normal;`
        : `white-space:nowrap !important;`;

      return (
        `<li class="g2-legend-list-item item-${index}" data-color="{originColor}" data-value="${value}" style="cursor: pointer;font-size: ${px2rem(12)};margin-top:0 !important;justify-content: flex-start;align-items: center;${showPagination ? 'width:23%' : 'width:83px'}">` +
        `<i class="g2-legend-marker" style="width:${px2rem(10)};height:${px2rem(10)};display:inline-block;background-color: ${item};flex-shrink: 0;"></i>` +
        `<span class="g2-legend-text" style="color: #124655;vertical-align: middle;${wrapStyle}">${value}</span></li>`
      );
    };
  }, [pagedLegends, px2rem]);

  return (
    <div
      key={chartKey} // for 分辨率改变时，能够重新渲染chart
      id={containerId}
      className={classnames(styles.chartContainer, styles.stackedColumnLine)}
    >
      {chartHeight === 0 ? (
        <ChartLoading />
      ) : (
        <Chart
          key={chartKey}
          height={chartHeight}
          data={dv}
          scale={scale}
          onGetG2Instance={(chart) => {
            chartRef.current = chart;
            initLegendsFromChart(chart);
          }}
          padding={getResponsivePxList([80, 50, 50, 50]) as [number, number, number, number]}
          forceFit
          onPointMouseenter={(ev: any) => {
            if (tooltipShared) {
              setTooltipShared(false);
            }
            setTimeout(() => {
              chartRef?.current?.showTooltip?.(ev);
            }, 50);
          }}
          onPointMouseleave={(ev: any) => {
            chartRef?.current?.hideTooltip?.();
          }}
          onLineMouseenter={(ev: any) => {
            if (tooltipShared) {
              setTooltipShared(false);
            }
            const nearPoint = ev?.data?.reduce((prev: any, curr: any) =>
              Math.abs(curr?.x - ev?.x) < Math.abs(prev?.x - ev?.x) ? curr : prev
            );
            if (nearPoint) {
              setTimeout(() => {
                chartRef?.current?.showTooltip?.(nearPoint);
              }, 50);
            }
          }}
          onLineMouseleave={(ev: any) => {
            chartRef?.current?.hideTooltip?.();
          }}
          onIntervalMouseenter={(ev: any) => {
            if (tooltipShared) {
              setTooltipShared(false);
            }
            setTimeout(() => {
              chartRef?.current?.showTooltip?.({ x: ev?.data?.x, y: ev?.y });
            }, 80);
          }}
          onIntervalMouseleave={(ev: any) => {
            chartRef?.current?.hideTooltip?.();
          }}
          onPlotClick={(ev) => {
            // 点击空白区域
            if (!lodash.has(ev, 'data')) {
              onClick(ev);
            }
            // 点击柱状图
            if (ev.shape.name === 'interval') {
              onClick({
                data: {
                  _origin: {
                    [xField]: dataFormatObj[`${ev.data._origin[xField]}_dictCode`],
                    [columnStackField]:
                      dataFormatObj[`${ev.data._origin[columnStackField]}_dictCode`],
                  },
                },
              });
            }
            // 点击线
            if (ev.shape.name === 'line') {
              // 获得x轴的配置
              const nearPoint = ev?.data?.reduce((prev: any, curr: any) =>
                Math.abs(curr?.x - ev?.x) < Math.abs(prev?.x - ev?.x) ? curr : prev
              );
              const lineIndex = lineColor.findIndex((item) => item === ev.shape._attrs.stroke);

              onClick({
                data: {
                  _origin: {
                    [xField]: dataFormatObj[`${nearPoint._origin[xField]}_dictCode`],
                    [lineSeriesField]: dataFormatObj[`${config.lineKey[lineIndex]}_dictCode`],
                  },
                },
              });
            }
            // 点击圆
            if (ev.shape.name === 'point') {
              onClick({
                data: {
                  _origin: {
                    [xField]: dataFormatObj[`${ev.data._origin[xField]}_dictCode`],
                    [lineSeriesField]: ev.data._origin[lineSeriesField],
                  },
                },
              });
            }
          }}
          onAxisLabelClick={(ev) => {
            if (!isXAxia(ev)) {
              return;
            }
            const records = chartRef.current.getSnapRecords({ x: ev.x, y: ev.y });
            const extraData: Record<string, any> = {};
            if (allLegends.length !== activeLegends.length) {
              extraData[columnStackField] = activeLegends.map(
                (item) => dataFormatObj[`${item}_dictCode`]
              );
            }

            onClick({
              data: {
                _origin: {
                  [xField]: dataFormatObj[`${records[0]._origin[xField]}_dictCode`],
                  ...extraData,
                },
              },
            }); // 点击
          }}
          onAxisLabelMouseenter={(ev) => {
            if (!isXAxia(ev)) {
              return;
            }
            if (tooltipShared) {
              return;
            }
            const records = lodash.filter(
              chartRef.current.getSnapRecords({ x: ev.x, y: ev.y }),
              (item) => lodash.has(item, 'x')
            );
            setTooltipShared(true);
            // 等待数据更新完tooltip的shared配置后在去显示tooltip
            setTimeout(() => {
              chartRef.current.showTooltip({
                x: records[0].x,
                y: records[0].y?.[0] || records[0]?.y || 0,
              });
            }, 50);
          }}
          onAxisLabelMouseleave={(ev) => {
            if (tooltipShared) {
              setTooltipShared(false);
            }
            if (!isXAxia(ev)) {
              return;
            }
            chartRef.current.hideTooltip();
          }}
        >
          <Legend
            name={columnStackField}
            useHtml={true}
            position="top"
            offsetY={getResponsivePx(-10)}
            g2-legend={g2LegendStyles}
            containerTpl={legendTpl({
              columnLegendText: config.columnLegendText,
              lineLegendText: config.lineLegendText,
              legendItems,
            })}
            itemTpl={legendItemTpl}
          />
          <Tooltip
            // @ts-ignore
            // useHtml
            crosshairs={{
              type: 'rect',
            }}
            // htmlContent={tooltipHtmlContent({ config, xField })}
            // showCrosshairs={false} // 关闭 crosshairs
            shared={tooltipShared}
            triggerOn={'none'}
            inPlot={false}
          />
          {/**
          // @ts-ignore */}
          <Geom
            type="intervalStack"
            position={`${xField}*value`}
            color={[columnStackField, CommonColors]}
            size={getResponsivePx(36)}
          >
            <Axis
              name={xField}
              line={{ lineDash: [4, 4], stroke: '#d1d6d4' }}
              label={{
                autoRotate: false,
                textStyle: {
                  fill: '#8B9793',
                  fontWeight: 'bold',
                  fontSize: geomFontSize + '',
                  axisType: 'x',
                  cursor: 'pointer',
                },
              }}
            />
            <Axis
              name={'value'}
              {...(!!unit
                ? {
                    title: {
                      autoRotate: false,
                      position: 'end',
                      offset: 0,
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
              label={{
                autoRotate: false,
                formatter: (value: any) => {
                  return formatYAxis({ value, dataFormat, format });
                },
                textStyle: {
                  fill: '#d1d6d4',
                  fontWeight: 'bold',
                  fontSize: geomFontSize + '',
                },
              }}
            />
          </Geom>
          {totalGroup && (
            <Guide>
              {Object.entries(totalGroup).map(([xVal, total]) => (
                <Guide.Text
                  key={`total-${xVal}`}
                  position={[xVal, total]}
                  content={`${total}`}
                  style={{
                    fill: '#183028',
                    fontSize: geomFontSize + '',
                    textAlign: 'center',
                    fontWeight: 700,
                    opacity: !!total ? 1 : 0,
                    pointerEvents: 'none',
                  }}
                  offsetY={-10}
                />
              ))}
            </Guide>
          )}
          {lodash.map(config.lineKey, (item, index) => {
            return (
              <div>
                <Axis
                  name={String(item)}
                  position={'right'}
                  // @ts-ignore
                  label={null}
                />
                <Geom
                  type="line"
                  tooltip={false}
                  position={`${xField}*${item}`}
                  color={lineColor[index]}
                  size={getResponsivePx(3)}
                  active={false}
                />
                <Geom
                  type="point"
                  opacity={0}
                  position={`${xField}*${item}`}
                  color={lineColor[index]}
                  size={getResponsivePx(3)}
                />
              </div>
            );
          })}
        </Chart>
      )}
    </div>
  );
};
