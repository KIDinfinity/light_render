import Pmloading, { localFieldConfig as pmLoadingConfig } from './Pmloading';
import Flatmortality, { localFieldConfig as flatMortalityConfig } from './Flatmortality';
import Code, { localFieldConfig as codeConfig } from './Code';

export const localFieldConfigs = [pmLoadingConfig, flatMortalityConfig, codeConfig];

export default {
  Pmloading,
  Flatmortality,
  Code,
};
