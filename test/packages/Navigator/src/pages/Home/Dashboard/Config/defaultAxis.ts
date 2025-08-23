import defaultColor from './defaultColor';

export const xFontSize = 12;

export const yFontSize = 11;

export default {
  title: {
    visible: false,
  },
  label: {
    style: {
      fill: '#d5d5d5',
      fontSize: xFontSize,
    },
    autoHide: false,
    autoRotate: false,
  },
  line: {
    visible: false,
  },
  tickLine: {
    visible: false,
  },
  grid: {
    visible: true,
    line: {
      style: {
        stroke: defaultColor,
        lineDash: [4],
        opacity: 0.2,
      },
    },
  },
};
