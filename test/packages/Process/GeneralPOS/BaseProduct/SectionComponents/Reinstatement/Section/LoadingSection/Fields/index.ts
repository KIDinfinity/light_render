import Code, { localFieldConfig as CodeConfig } from './Code';
import Flatmortality, { localFieldConfig as FlatmortalityConfig } from './Flatmortality';
import Fmperiod, { localFieldConfig as FmperiodConfig } from './Fmperiod';
import Pmloading, { localFieldConfig as PmloadingConfig } from './Pmloading';
import Pmperiod, { localFieldConfig as PmperiodConfig } from './Pmperiod';

export const localFieldConfigs = [
  CodeConfig,
  FmperiodConfig,
  FlatmortalityConfig,
  PmloadingConfig,
  PmperiodConfig,
];

export default {
  Code,
  Fmperiod,
  Flatmortality,
  Pmloading,
  Pmperiod,
};
