import localSectionConfig from './Section';

import { localFieldConfigs as BasicFieldConfigs } from '../Fields';

const localConfig = {
  configs: [localSectionConfig, ...BasicFieldConfigs, ...BasicFieldConfigs],
  remote: true,
};
export default localConfig;
