import React, { useMemo, useCallback } from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './chart.less';
import { Chart, Geom, Tooltip, Coord, Label, Legend } from 'bizcharts';
import { getDataWithUnit } from './utils';
import { CommonColors } from '../../Enum/Colors';
import useResizeRefresh, { ChartLoading } from './useResizeRefresh';

export default function ChartPie(props: any) {
  const containerId = `ChartPie_${props?.dashboardCode}`;
  const {
    chartData,
    nameMiscType,
    dataFormat,
    onClick,
    dashboardChartColorList = [],
    dashboardHidden,
    zoom,
  } = props;
  const { data, name, yField } = chartData;

  const { chartWidth, chartHeight, chartKey, getResponsivePx, getResponsivePxList, px2rem } =
    useResizeRefresh(containerId, [chartData, dashboardHidden], zoom);
  const pieChartWidth = chartHeight;

  const g2LegendStyles: React.CSSProperties = useMemo(
    () => ({
      position: 'absolute',
      top: 0,
      left: `${pieChartWidth}px`,
      width: `${chartWidth - pieChartWidth}px`,
      height: `${chartHeight}px`,
      maxWidth: `${chartWidth - pieChartWidth}px`,
      maxHeight: `${chartHeight}px`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      fontSize: getResponsivePx(12),
    }),
    [pieChartWidth, chartWidth, chartHeight]
  );

  const legendTpl = useCallback(
    () => `
<div class="g2-legend" >
  <div style="max-height: ${px2rem(chartHeight)}; margin-left:20px">
    <ul class="g2-legend-list" style="list-style-type:none;margin:0;padding:0;"></ul>
  </div>
</div>
`,
    [chartHeight, g2LegendStyles]
  );

  const legendItemTpl = useCallback(
    ({ datas, nameMiscType, name, unit }: any) =>
      (nameItem: any) => {
        const value = lodash.find(datas, (item) => item?.[name] === nameItem)?.value || '';
        const currentName = formatMessageApi({ [nameMiscType]: nameItem });

        return `
    <li class='g2-legend-list-item' style="width:30%;">
      <span style='background-color:{color};margin-top: ${px2rem(3)} !important; ' class='g2-legend-marker'></span>
      <span class=${styles.LegendTextWarp} style="font-size: ${getResponsivePx(14)}px">
        <span class=${styles.LegendText} style="vertical-align: middle!important;" title="${currentName}">${currentName} </span>
        <span class=${styles.LegendNum}>${value}${unit}</span>
      </span>
    </li>
    `;
      },
    [zoom]
  );

  const { datas, unit } = useMemo(
    () => getDataWithUnit(data, yField || 'value', dataFormat),
    [data, yField, dataFormat]
  );

  const orderedData = useMemo(() => lodash.orderBy(data, ['value'], ['desc']), [data]);

  const colorConfig = useMemo(() => {
    if (!dashboardChartColorList?.length) {
      return CommonColors;
    }

    if (dashboardChartColorList.every((item: any) => item.fieldName !== undefined)) {
      return orderedData.map(
        (item) =>
          dashboardChartColorList.find((colorItem: any) => colorItem.fieldName === item[name])
            ?.color
      );
    } else if (dashboardChartColorList.every((item: any) => item.order !== undefined)) {
      return lodash.orderBy(dashboardChartColorList, ['order']).map((item) => item.color);
    }

    return lodash.map(dashboardChartColorList, (item) => item.color);
  }, [dashboardChartColorList, orderedData]);

  const getPercent = (value: any) => {
    const sum = lodash.chain(data).map('value').sum().value();
    const percent = ((lodash.toNumber(value) / sum) * 100).toFixed(1);
    return percent;
  };

  const defaultGeomFontSize = getResponsivePx(12);
  const geomFontSize = defaultGeomFontSize ? 6 + getResponsivePx(6) : defaultGeomFontSize;

  return (
    <div id={containerId} key={chartKey} className={styles.chartContainer}>
      {chartHeight === 0 ? (
        <ChartLoading />
      ) : (
        <Chart
          key={chartKey}
          width={chartHeight}
          height={chartHeight}
          data={orderedData}
          padding={getResponsivePxList([50, 50, 50, 50]) as [number, number, number, number]}
          onGetG2Instance={(chart: any) => {
            setTimeout(() => {
              const geom = chart?.get?.('geoms')?.[0];
              const items = geom?.get?.('data');
              if (geom && items?.length > 0) {
                geom.setSelected(items[0]);
              }
            }, 2000);
          }}
          onPlotClick={(ev: any) => {
            onClick(ev); // 点击事件
          }}
        >
          <Coord type={'theta'} radius={1} innerRadius={0.45} />
          <Legend
            useHtml={true}
            containerTpl={legendTpl()}
            // offsetX={getResponsivePx(10)}
            itemTpl={legendItemTpl({ datas, nameMiscType, name, unit })}
            // @ts-ignore
            layout="horizontal"
            position="right-center"
            g2-legend={g2LegendStyles}
            itemFormatter={(val) => {
              return val; // val 为每个图例项的文本值
            }}
          />
          <Tooltip
            showTitle={false}
            inPlot={false}
            // @ts-ignore
            useHtml
            htmlContent={(_: string, items: any) => {
              const { color: markerColor, value, name: nameItem } = items[0];
              const percent = getPercent(value);
              const currentName = formatMessageApi({ [nameMiscType]: nameItem });
              return (
                `<div style='position:absolute;background: rgba(255, 255, 255, 0.95);z-index:2;padding:${px2rem(
                  5
                )};border-radius:${px2rem(4)};color: #6F6D6D;line-height:2;'>` +
                `<span style="color:${markerColor};font-size:${px2rem(
                  8
                )};vertical-align: middle;" >●</span> ${currentName}: ${percent}%</div>`
              );
            }}
          />
          {/**
          @ts-ignore */}
          <Geom
            type="intervalStack"
            position="value"
            color={[name, colorConfig]}
            style={{
              lineWidth: 0,
              fill: '#fff',
            }}
          >
            <Label
              content="value"
              offset={getResponsivePx(-25)}
              autoRotate={false}
              htmlTemplate={(text) => {
                const percent = getPercent(text);
                if (lodash.toNumber(percent) > 4) {
                  return `
                    <span class="${styles.labelValue}"  style="position: absolute;top: 0px;transform:translate(-50%, -50%);left: 0px;font-size: ${geomFontSize}px; color: #183028 ">
                      ${percent}%
                   </span>`;
                }
                return '';
              }}
            />
          </Geom>
        </Chart>
      )}
    </div>
  );
}
