import React, { useMemo } from 'react';
import { Chart, Geom, Axis, Tooltip, Label, Legend } from 'bizcharts';
import { getResponsivePx, px2rem, useResponsivePx } from '@/utils/responsiveUtils';
import { getLabelTemp, reportColors } from '../config';

const chartWidth = 350;
const chartHeight = 200;

interface ChartBarBizProps {
  chartData: {
    data: any[];
    name: string;
    fields: string[];
    colors?: string[];
  };
  width?: number;
  height?: number;
  nameMiscType: string;
  chartConfig?: any;
}

const ChartBarBiz: React.FC<ChartBarBizProps> = (props) => {
  const { chartData, chartConfig } = props;
  const { data: datas, name } = chartData;
  const pieWidth = useResponsivePx(chartConfig?.width || chartWidth);
  const pieHeight = useResponsivePx(chartConfig?.height || chartHeight);

  const defaultGeomFontSize = getResponsivePx(12);
  const geomFontSize = defaultGeomFontSize ? 6 + getResponsivePx(6) : defaultGeomFontSize;

  const isNice = useMemo(
    () => datas.some((item: any) => !!item.value) && datas.some((item: any) => item.value >= 5),
    [datas]
  );

  return (
    <div
      key={String(pieWidth) + String(pieHeight)}
      style={{ position: 'relative', paddingLeft: getResponsivePx(10) }}
    >
      <Chart
        key={String(pieWidth) + String(pieHeight)}
        height={pieHeight}
        width={pieWidth}
        data={datas}
        padding="auto"
        style={{
          width: pieWidth + 'px',
          height: pieHeight + 'px',
        }}
        scale={{
          value: {
            min: 0,
            type: 'linear',
            tickCount: 5,
            ...(!isNice ? { nice: false, min: 0, max: 4, tickInterval: 1 } : {}),
          },
        }}
        onPlotClick={(ev: any) => {
          chartConfig?.onClick?.(ev);
        }}
        onLegendItemClick={(ev: any) => {
          chartConfig?.onLegendItemClick?.(ev);
        }}
        onAxisLabelClick={(ev: any) => {
          chartConfig?.onAxisLabelClick?.(ev);
        }}
      >
        {/**
        // @ts-ignore */}
        <Axis
          name="value"
          line={null}
          tickLine={null}
          label={{
            offset: getResponsivePx(10),
            autoRotate: false,
            textStyle: {
              textAlign: 'end',
              fill: '#12465533',
              fontSize: 12,
              textBaseline: 'middle',
            },
          }}
          grid={{
            lineStyle: {
              stroke: '#12465533',
              lineDash: [2, 4],
            },
          }}
        />
        <Axis
          name="name"
          label={null}
          tickLine={null}
          line={{
            stroke: '#12465533',
            lineDash: [2, 4],
          }}
          {...chartConfig?.xAxis}
        />
        <Legend
          name="name"
          position="top-center"
          // layout="horizontal"
          offsetY={getResponsivePx(-20)}
          {...chartConfig?.legend}
        />
        <Tooltip
          showTitle={false}
          // useHtml
          // @ts-ignore
          htmlContent={(_: string, items: any) => {
            const { color: markerColor } = items[0];
            const { value, name: nameItem } = items[0]?.point?.point;
            return (
              `<div style='position:absolute;background: rgba(238, 240, 241, 0.8);padding:${px2rem(
                5
              )};border-radius:${px2rem(4)};color: #6F6D6D;line-height:2;'>` +
              `<span style="color:${markerColor};font-size:${px2rem(
                8
              )};vertical-align: middle;" >●</span> ${nameItem}: ${value} </div>`
            );
          }}
          {...chartConfig?.tooltip}
        />
        <Geom
          type="interval"
          position={`${name}*value`}
          color={[name, chartData?.colors || reportColors]}
          style={{
            lineWidth: 0,
            stroke: '#fff',
            ...chartConfig?.geom?.style,
          }}
          size={getResponsivePx(30)}
          // @ts-ignore
          tooltip={[`${name}*value`, (_name: any, value: any) => ({ [_name]: value })]}
        >
          <Label
            content="value"
            autoRotate={false}
            offset={getResponsivePx(10)}
            htmlTemplate={(text) => {
              return getLabelTemp({
                content: text,
                fontSize: geomFontSize,
                allowEmpty: true,
              });
            }}
          />
        </Geom>
      </Chart>
    </div>
  );
};

export default ChartBarBiz;
