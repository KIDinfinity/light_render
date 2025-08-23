import React, { useEffect, useRef } from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './chart.less';
import { Chart, Geom, Tooltip, Coord, Label, Legend } from 'bizcharts';
import {
  getResponsivePx,
  getResponsivePxList,
  px2rem,
  useResponsivePx,
} from '@/utils/responsiveUtils';
import { getAmount } from 'basic/utils';
import Empty from '@/components/Empty';
import { reportColors } from '../config';

const dashboardWidth = 360;
const dashboardHeight = 180;
const pieChartWidth = 180;

const g2LegendStyles: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  height: px2rem(dashboardHeight),
  maxWidth: px2rem(dashboardWidth),
  maxHeight: px2rem(dashboardHeight),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const legendTpl = () => `
<div class="g2-legend">
  <div style="max-height: ${px2rem(dashboardHeight)};">
    <ul class="g2-legend-list" style="list-style-type:none;margin:0;padding:0;display: flex;flex-direction: column;"></ul>
  </div>
</div>
`;

const legendItemTpl =
  ({ nameMiscType }: any) =>
  (nameItem: string) => {
    const currentName = formatMessageApi({ [nameMiscType]: nameItem });
    return `
    <li class='g2-legend-list-item' style="display: flex;align-items: center;">
      <span style='background-color:{color};' class='g2-legend-marker'></span>
      <span class=${styles.LegendText} title="${currentName}">${currentName} </span>
    </li>
    `;
  };

interface ChartPieProps {
  chartData: {
    data: any[];
    name: string;
  };
  nameMiscType: string;
}

const ChartPie: React.FC<ChartPieProps> = (props) => {
  const { chartData, nameMiscType } = props;
  const { data, name } = chartData;
  const chartRef = useRef<any>(null);
  const timerRef = useRef<any>(null);
  const pieWidth = useResponsivePx(pieChartWidth);
  const pieHeight = useResponsivePx(pieChartWidth);

  const defaultGeomFontSize = getResponsivePx(12);
  const geomFontSize = defaultGeomFontSize ? 6 + getResponsivePx(6) : defaultGeomFontSize;

  useEffect(() => {
    if (chartRef.current) {
      const geom = chartRef.current?.get?.('geoms')?.[0];
      if (geom) {
        const selected = geom.getSelected && geom.getSelected();
        if (selected && selected.length > 0) {
          // 已经有展开项，不做操作
          return;
        }
        // 没有展开项，延迟设置选中
        timerRef.current = setTimeout(() => {
          const items = geom.get('data');
          if (items && items.length > 1) {
            geom.setSelected(items[1]);
          }
        }, 200);
      }
    }
    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(timerRef?.current);
      timerRef.current = null;
    };
  }, [data, pieWidth, pieHeight]);

  if (data?.length === 0) {
    return <Empty style={{ width: 'auto', height: 'auto', margin: 'auto' }} />;
  }

  return (
    <div key={String(pieWidth) + String(pieHeight)} style={{ position: 'relative' }}>
      <Chart
        key={String(pieWidth) + String(pieHeight)}
        height={pieHeight}
        width={pieWidth}
        data={lodash.orderBy(data, ['value'], ['desc'])}
        padding={getResponsivePxList([24, 24, 24, 24]) as [number, number, number, number]}
        onGetG2Instance={(chart: any) => {
          chartRef.current = chart;
        }}
        style={{}}
      >
        <Coord type={'theta'} radius={1} innerRadius={0.45} />
        <Legend
          useHtml={true}
          containerTpl={legendTpl()}
          offsetX={getResponsivePx(20)}
          // @ts-ignore
          itemTpl={legendItemTpl({ data, nameMiscType, name })}
          layout="horizontal"
          position="right-center"
          g2-legend={g2LegendStyles}
          itemFormatter={(val) => val}
        />
        <Tooltip
          showTitle={false}
          // useHtml
          // @ts-ignore
          htmlContent={(_: string, items: any) => {
            const { color: markerColor, value, name: nameItem } = items[0];
            // const percent = getPercent(value);
            const currentName = formatMessageApi({ [nameMiscType]: nameItem });
            return (
              `<div style='position:absolute;background: rgba(238, 240, 241, 0.8);padding:${px2rem(
                5
              )};border-radius:${px2rem(4)};color: #6F6D6D;line-height:2;'>` +
              `<span style="color:${markerColor};font-size:${px2rem(
                8
              )};vertical-align: middle;" >●</span> ${currentName}: ${getAmount(value, 0)}</div>`
            );
          }}
        />
        {/* @ts-ignore */}
        <Geom
          type="intervalStack"
          position="value"
          color={[name, reportColors]}
          style={{
            lineWidth: 0,
            stroke: '#fff',
          }}
        >
          <Label
            content="value"
            offset={getResponsivePx(-15)}
            autoRotate={false}
            htmlTemplate={(value) => {
              if (value) {
                return `
                    <span class="${styles.labelValue}"  style="position: absolute;top: 0px;transform:translate(-50%, -50%);left: 0px;font-size: ${geomFontSize}px; color: #183028 ">
                     ${getAmount(value, 0)}
                   </span>`;
              }
              return '';
            }}
          />
        </Geom>
      </Chart>
    </div>
  );
};

export default ChartPie;
