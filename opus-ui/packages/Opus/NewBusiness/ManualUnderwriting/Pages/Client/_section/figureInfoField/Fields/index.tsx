import Height, { fieldConfig as heightConfig } from './Height';
import Weight, { fieldConfig as weightConfig } from './Weight';
import Bmi, { fieldConfig as bmiConfig } from './Bmi';
import MibCodeList, { fieldConfig as mibCodeListConfig } from './Mibcodelist';

export const localFieldConfigs = [heightConfig, weightConfig, bmiConfig, mibCodeListConfig];

export default {
  Height,
  Weight,
  Bmi,
  MibCodeList,
};
