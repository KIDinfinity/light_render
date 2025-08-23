import { Colors, ComboColor } from '../Enum';
import defaultAxis, { xFontSize, yFontSize } from './defaultAxis';
import lodash from 'lodash';
import defaultColor from './defaultColor';
import defaultLine from './defaultLine';
import defaultBase, { defaultCommonBase } from './defaultBase';
import { formatYAxis, formatXAxis } from '../Utils';
import { DashboardVersion } from '../Enum';

export {
  Colors,
  ComboColor,
  defaultAxis,
  defaultColor,
  defaultLine,
  defaultBase,
  defaultCommonBase,
};

const defaultCommonColor = '#d1d6d4';

export default ({
  combo,
  onClick,
  data: { xField, yField, data },
  format,
  dataFormat,
  dashboardVersion,
}: any) => {
  const isCommonDashboard = dashboardVersion === DashboardVersion.V2;
  return {
    ...(isCommonDashboard ? defaultCommonBase : defaultBase),
    title: {
      visible: false,
      alignTo: 'middle',
      style: {
        fontSize: 18,
        fill: defaultColor,
      },
    },
    data,
    xField,
    yField,
    // columnSize: 12,
    xAxis: {
      ...defaultAxis,
      line: {
        visible: true,
        style: {
          stroke: '#adaaaa',
        },
      },
      label: {
        ...defaultAxis.label,
        style: {
          fill: 'white',
          fontSize: xFontSize,
        },
        formatter: (value: any) => formatXAxis({ value, dataFormat, format }),
      },
      grid: {
        visible: false,
      },
    },
    yAxis: combo
      ? {
          leftConfig: {
            ...defaultAxis,
            colorMapping: false,
            label: {
              ...defaultAxis.label,
              style: {
                ...defaultAxis.label.style,
                fontSize: yFontSize,
              },
              formatter: (value: any) => formatYAxis({ value, dataFormat, format }),
            },
          },
          rightConfig: {
            ...defaultAxis,
            colorMapping: false,
            label: {
              ...defaultAxis.label,
              style: {
                ...defaultAxis.label.style,
                fontSize: yFontSize,
              },
              formatter: (value: any) => formatYAxis({ value, dataFormat, format }),
            },
          },
        }
      : {
          ...defaultAxis,
          formatter: (value: any) => formatYAxis({ value, dataFormat, format }),
        },
    label: {
      visible: true,
      adjustColor: true,
      position: 'middle', // option: middle / top / bottom
      adjustPosition: true,
    },
    legend: {
      marker: {
        symbol: 'circle',
      },
      text: {
        style: { fill: defaultColor, fontSize: 12 },
      },
    },
    columnConfig: {
      leftConfig: {
        colorMapping: false,
        color: Colors[0],
        label: {
          visible: true,
        },
      },
      rightConfig: {
        colorMapping: false,
      },
    },

    tooltip: {
      shared: false,
      showCrosshairs: false,
      offset: 20,
      domStyles: {
        // 'g2-tooltip': {
        //   color: 'red'
        // },
        // 'g2-tooltip-title': {
        //   display: 'none',
        // },
        'g2-tooltip-value': {
          marginLeft: '4px',
        },
        'g2-tooltip-name': {
          // display: 'none',
          marginLeft: '-6px',
        },
        'g2-tooltip-marker': {
          width: '5px',
          height: '5px',
        },
        'g2-tooltip-list': {
          marginBottom: '12px',
        },
        'g2-tooltip-list-item': {
          lineHeight: '14px',
          height: '14px',
          margin: '0px 0px 4px',
        },
      },
    },
    interactions: [
      {
        type: 'scrollbar',
      },
    ],
    lineConfig: {
      ...defaultLine,
    },
    lineConfigs: lodash.map(Colors, (item) => ({
      ...defaultLine,
      color: item,
    })),
    events: {
      onColumnClick: (cfg: any) => {
        if (onClick) {
          onClick(cfg?.data);
        }
      },
      // onLineClick: (cfg: any) => {},
      onPointClick: (cfg: any) => {
        if (onClick) {
          onClick(cfg?.data);
        }
      },
    },
  };
};
