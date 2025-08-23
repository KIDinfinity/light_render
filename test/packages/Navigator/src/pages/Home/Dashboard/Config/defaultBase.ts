import { Colors, CommonColors } from '../Enum';

const defaultBase = {
  height: window.innerHeight * 0.38 - 36 - 32,
  forceFit: true,
  pixelRatio: 2,
  color: Colors,
};

export const defaultCommonBase = {
  ...defaultBase,
  color: CommonColors,
};

export default defaultBase;
