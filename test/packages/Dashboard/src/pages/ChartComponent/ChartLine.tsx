import React, { useEffect, useRef } from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './chart.less';
import { Chart, Geom, Tooltip, Coord, Label, Legend, Axis, Guide } from 'bizcharts';
import {
  getResponsivePx,
  getResponsivePxList,
  px2rem,
  useResponsivePx,
} from '@/utils/responsiveUtils';
import { getAmount } from 'basic/utils';
import Empty from '@/components/Empty';
import { reportColors } from '../config';
import DataSet from '@antv/data-set';
import moment from 'moment';

const { Line } = Guide;

const pieChartWidth = 180;

interface ChartPieProps {
  chartData: {
    data: any[];
    name: string;
  };
  nameMiscType: string;
}

function customNormalize(x, max = 50) {
  if (x >= 0 && x <= 1) {
    return (x / 1) * 0.25;
  } else if (x > 1 && x <= 10) {
    return 0.25 + ((x - 1) / (10 - 1)) * 0.25;
  } else if (x > 10 && x <= 30) {
    return 0.5 + ((x - 10) / (30 - 10)) * 0.25;
  } else if (x > 30 && x <= 50) {
    return 0.75 + ((x - 30) / (max - 30)) * 0.25;
  } else {
    return 1; // 超出范围
  }
}

const ChartLine: React.FC<ChartPieProps> = (props) => {
  const { chartData, nameMiscType, configWidth, configHeight, onClick = () => {} } = props;
  const { data, name } = chartData;
  const chartRef = useRef<any>(null);
  const timerRef = useRef<any>(null);
  const pieWidth = useResponsivePx(configWidth || pieChartWidth);
  const pieHeight = useResponsivePx(configHeight || pieChartWidth);

  const defaultGeomFontSize = getResponsivePx(12);
  const geomFontSize = defaultGeomFontSize ? 6 + getResponsivePx(6) : defaultGeomFontSize;

  if (data?.length === 0) {
    return <Empty style={{ width: 'auto', height: 'auto', margin: 'auto' }} />;
  }
  const normalizedMap = {};
  const max = lodash.maxBy(data, 'value').value;
  const maxInt = Math.ceil(max);

  const data1 = data.map((item) => {
    const mapData = customNormalize(item.value, max);
    normalizedMap[mapData.toFixed(5)] = item.value;
    return {
      ...item,
      valueMap: mapData,
    };
  });

  const scale = {
    name: {
      range: [0, 1], // 关键设置：让数据从左到右填满
    },
    valueMap: {
      ticks: [0, 0.25, 0.5, 0.75, 1],
      formatter: (val) => {
        const map = {
          0: 0,
          0.25: 1,
          0.5: 10,
          0.75: 30,
          1: max < 50 ? 50 : maxInt,
        };

        return map[val] || normalizedMap[val.toFixed(5)] || 0;
      },
    },
  };
  console.log('max', max, scale);

  return (
    <Chart
      data={data1}
      scale={scale}
      height={pieHeight}
      width={pieWidth}
      padding="auto"
      onClick={onClick}
    >
      <Tooltip
        inPlot={false} // 允许 tooltip 显示在图表外部
        // follow={true} // 鼠标跟随显示
        // enterable={true} // 鼠标可以进入 tooltip，不会立即消失

        // crosshairs={{
        //   type: 'x',
        // }}
        itemTpl="<li>name: {value}</li>"
      />
      <Axis name="name" label={null} tickLine={null} />
      <Axis
        name="valueMap"
        grid={{
          lineStyle: {
            stroke: '#ccc', // 线条颜色
            lineWidth: 1, // 线条宽度
            lineDash: null, // 设置为 null 表示实线
          },
        }}
      />
      <Legend />
      <Geom type="area" position="name*valueMap" color="#6cf" shape="smooth" />
      <Geom
        type="line"
        position="name*valueMap"
        color="#6cf"
        shape="smooth"
        size={2}
        tooltip={false}
      />

      <Guide>
        {/* 左边线 */}
        <Line
          start={['min', 'min']}
          end={['min', 'max']}
          lineStyle={{
            stroke: '#ccc',
            lineWidth: 1,
            lineDash: null,
          }}
        />
        {/* 右边线 */}
        <Line
          start={['max', 'min']}
          end={['max', 'max']}
          lineStyle={{
            stroke: '#ccc',
            lineWidth: 1,
            lineDash: null,
          }}
        />
        {/* 第二条横线（红色）
        <Line
          start={['min', 20]} // 根据你的 Y 轴刻度调整
          end={['max']}
          lineStyle={{
            stroke: 'red',
            lineWidth: 1,
            lineDash: null,
          }}
        /> */}
      </Guide>
    </Chart>
  );
};

export default ChartLine;
