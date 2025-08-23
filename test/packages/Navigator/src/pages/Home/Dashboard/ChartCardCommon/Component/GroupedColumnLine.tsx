import React, { useMemo } from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import DataSet from '@antv/data-set';
import { Chart, Geom, Axis, Tooltip, Label, Legend } from 'bizcharts';
import { CommonColors } from '../../Enum/Colors';
import { getDataWithUnit } from './utils';
import classnames from 'classnames';
import useResizeRefresh, { ChartLoading } from './useResizeRefresh';
import styles from './chart.less';

export default (props: any) => {
  const { miscType, dashboardCode, onClick, zoom, dataFormat } = props;
  const containerId = `StackedColumnLine_${dashboardCode}`;
  const {
    data,
    lineSeriesField = '',
    columnGroupField = '',
    xField,
    yField,
  } = props?.chartData || {};
  const {
    refresh,
    chartHeight,
    chartWidth,
    chartKey,
    getResponsivePx,
    getResponsivePxList,
    px2rem,
  } = useResizeRefresh(containerId, [], zoom);

  const lineLegendHtml = ({
    lineLegendText,
    legendItems,
  }: {
    lineLegendText: string;
    legendItems: any[];
  }) => `
<div style="position: absolute;right: 0;">
  <span style="color:#124655;vertical-align:top;margin-right:${px2rem(
    20
  )};font-weight:bold;font-size:${px2rem(12)};">
    ${lineLegendText}
  </span>
  <ul class="g2-legend-list" style="overflow:hidden;display:inline-block;">
    ${lodash
      .map(
        legendItems,
        (item) =>
          `<li class="g2-legend-list-item" style="cursor: pointer;font-size: ${px2rem(
            12
          )};margin-top:0 !important;display:inline-block;">
            <i class="g2-legend-marker" style="width:${px2rem(15)};height:${px2rem(
              3
            )};display:inline-block;background-color: ${
              item?.marker?.stroke
            };vertical-align: middle;margin-bottom: ${px2rem(3)};"></i>
            <span class="g2-legend-text" style="color: #124655;vertical-align: top;">${
              item.value
            }</span>
          </li>`
      )
      .join(' ')}
  </ul>
</div>
`;

  const legendItemTpl = (value?: string, item?: string, _?: boolean, index?: number) => {
    return (
      `<li class="g2-legend-list-item item-${index} {checked}" data-color="{originColor}" data-value="${value}" style="cursor: pointer;font-size: ${px2rem(
        12
      )};margin-top:0 !important;">` +
      `<i class="g2-legend-marker" style="width:${px2rem(10)};height:${px2rem(
        10
      )};display:inline-block;background-color: ${item};"></i>` +
      `<span class="g2-legend-text" style="color: #124655;vertical-align: middle;">${value}</span></li>`
    );
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
    <div class="g2-legend">
      <span style="color:#124655;vertical-align: super;margin-right:${px2rem(
        20
      )};position: relative;top: ${px2rem(3)};font-weight:bold;font-size:${px2rem(
        12
      )};">${columnLegendText}</span>
      <ul class="g2-legend-list" style="overflow:hidden;display:inline-block;position: relative;top: ${px2rem(
        3
      )};"></ul>
      <div style="position:relative; right: 0; top: 0; height:${px2rem(35)}">${lineLegendHtml({
        lineLegendText,
        legendItems,
      })}</div>
    </div>
  `;

  const tooltipHtmlContent =
    ({ config, xField }: { config: any; xField: string }) =>
    (title: any, items: any) => {
      const caseTotal = lodash
        .chain(items)
        .filter((item) => lodash.isString(item?.marker?.symbol))
        .map((item) => lodash.toNumber(item.value))
        .sum()
        .value();
      const otherHtml = lodash
        .chain(config.lineKey)
        .map((item: string) => {
          const value = lodash
            .chain(config.chartData)
            .find((dataItem: any) => title === dataItem?.[xField])
            // @ts-ignore
            .get(item)
            .value();
          return `<div>${item}: ${value}</div>`;
        })
        .join(' ')
        .value();
      return (
        `<div style='position:absolute;background: rgba(255, 255, 255, 0.95);z-index:2;padding:${px2rem(
          5
        )};border-radius:${px2rem(4)};color: #6F6D6D;line-height:1.25;'>` +
        `<div><span style="font-weight:bold">${config.tooltipText}: </span>${caseTotal}</div>${otherHtml}</div> `
      );
    };

  const lineColor = CommonColors; // ['#FFE3E3', '#FED141', '#E87722CC'];
  const columnTypeCode = miscType?.[columnGroupField];
  const lineTypeCode = miscType?.[lineSeriesField];

  const { unit } = useMemo(
    () => getDataWithUnit(data?.[0], yField?.[0], dataFormat),
    [data, dataFormat]
  );

  const config = {
    chartData: (() => {
      const dataSet = new Set();
      const dataMap = new Map();
      lodash.forEach(data, (dataItem: any, index: number) => {
        lodash.forEach(dataItem, (item: any) => {
          const oldItem = dataMap.get(item[xField]) || {};
          const FieldMap = ['columnGroupField', 'lineSeriesField'];
          const TypeCodeMap = [columnTypeCode, lineTypeCode];
          const currentField = lodash.get(props, `chartData.${FieldMap[index]}`);
          const name = formatMessageApi({ [TypeCodeMap[index]]: item[currentField] });
          const xFieldDictCode = lodash.get(item, `${xField}_dictCode`);
          dataMap.set(item[xField], {
            ...oldItem,
            [name]: item?.[yField[index]],
            [`${xField}_dictCode`]: xFieldDictCode,
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
          if (!!item?.[columnGroupField]) {
            keySet.add(formatMessageApi({ [columnTypeCode]: item?.[columnGroupField] }));
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
    columnLegendText: formatMessageApi({ [lineTypeCode]: `${columnGroupField}_LegendText` }),
    lineLegendText: formatMessageApi({ [lineTypeCode]: `${lineSeriesField}_LegendText` }),
    tooltipText: formatMessageApi({ [lineTypeCode]: `${dashboardCode}_TooltipText` }),
  };

  const ds = new DataSet();
  ds.setState('type', '');
  const dv = ds.createView().source(config?.chartData);
  dv.transform({
    type: 'fold',
    fields: config?.columnKey, // 展开字段集
    key: 'type', // key字段
    value: 'value', // value字段
  }).transform({
    type: 'filter',
    callback: (d: { type: string }) => {
      return d.type !== ds.state.type;
    },
  });

  const tickInterval = lodash
    .chain(config.chartData)
    .map((item) => {
      const sum = lodash
        .chain(item)
        .entries()
        .map(([_, value]) => (lodash.isNumber(value) ? value : 0))
        .sum()
        .value();
      return Math.ceil(sum / 2 / 7 / 5) * 5;
    })
    .max()
    .value();
  const scaleMax = lodash
    .chain(config.chartData)
    .map((item) => {
      const sum = lodash
        .chain(item)
        .entries()
        .map(([_, value]) => (lodash.isNumber(value) ? value : 0))
        .sum()
        .divide(2)
        .value();
      return sum % tickInterval ? tickInterval - (sum % tickInterval) + sum : sum;
    })
    .max()
    .value();

  const legendItems = lodash.map(config.lineKey, (lineItem, index) => {
    return { value: lineItem, marker: { symbol: 'line', stroke: lineColor[index] } };
  });

  const defaultGeomFontSize = getResponsivePx(12);
  const geomFontSize = defaultGeomFontSize < 12 ? 6 + getResponsivePx(6) : defaultGeomFontSize;

  const g2LegendStyles: React.CSSProperties = React.useMemo(
    () => ({
      height: px2rem(51),
      width: `${chartWidth}px`,
      position: 'absolute',
      overflow: 'visible',
      fontSize: px2rem(12),
      maxWidth: `${chartWidth}px`,
      lineHeight: px2rem(20),
      left: px2rem(20),
      top: 0,
      marginTop: px2rem(6),
      paddingRight: px2rem(32),
      paddingLeft: px2rem(20),
    }),
    [chartWidth]
  );

  return (
    <div
      key={chartKey} // for 分辨率改变时，能够重新渲染chart
      id={containerId}
      className={classnames(styles.chartContainer, styles.groupedColumnLine)}
    >
      {chartHeight === 0 ? (
        <ChartLoading />
      ) : (
        <Chart
          key={chartKey}
          height={chartHeight}
          data={dv}
          scale={lodash.mapValues(config.scale, (item) => {
            return {
              ...item,
              nice: true,
              tickCount: 5,
              ...(!!unit ? { min: 0, range: [0, 0.85], alias: `(${unit})` } : {}),
            };
          })}
          padding={getResponsivePxList([80, 50, 50, 50]) as [number, number, number, number]}
          onIntervalClick={onClick}
          forceFit
        >
          <Legend
            name="type"
            useHtml={true}
            position="top"
            offsetY={getResponsivePx(-5)}
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
            useHtml
            crosshairs={{
              type: 'rect',
            }}
            htmlContent={tooltipHtmlContent({ config, xField })}
            inPlot={false}
          />
          {/**
          // @ts-ignore */}
          <Geom
            type="intervalDodge"
            position={`${xField}*value`}
            color={['type', CommonColors]}
            size={getResponsivePx(36)}
          >
            <Axis
              name={xField}
              line={{ lineDash: [4, 4], stroke: '#d1d6d4' }}
              label={{
                autoRotate: false,
                textStyle: {
                  fill: '#d1d6d4',
                  fontWeight: 'bold',
                  fontSize: geomFontSize + '',
                  axisType: 'x',
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
                textStyle: {
                  fill: '#d1d6d4',
                  fontWeight: 'bold',
                  fontSize: geomFontSize + '',
                },
              }}
            />

            <Label
              content="value"
              // @ts-ignore
              position="middle"
              offset={0}
              textStyle={{
                textAlign: 'center',
                fill: '#000',
                fontSize: geomFontSize + '',
              }}
            />
          </Geom>
          {lodash.map(config.lineKey, (item, index) => {
            return (
              <>
                <Axis
                  name={String(item)}
                  position={'right'}
                  // @ts-ignore
                  label={null}
                />
                <Geom
                  type="line"
                  position={`${xField}*${item}`}
                  color={lineColor[index]}
                  size={getResponsivePx(3)}
                  active={false}
                  tooltip={false}
                />
              </>
            );
          })}
        </Chart>
      )}
    </div>
  );
};
