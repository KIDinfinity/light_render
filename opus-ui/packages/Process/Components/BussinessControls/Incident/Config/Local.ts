import localSectionConfig from './Section';
import { localFieldConfigs as BasicFieldConfigs } from '../Fields/Basic';
import { localFieldConfigs as HeaderFieldConfigs } from '../Fields/Header';
import { localFieldConfigs as CheckFieldConfigs } from '../Fields/Check';
import { localFieldConfigs as AddFieldConfigs } from '../Fields/Add';

export default {
  configs: [
    localSectionConfig,
    ...BasicFieldConfigs,
    ...HeaderFieldConfigs,
    ...CheckFieldConfigs,
    ...AddFieldConfigs,
  ],
  remote: true,
};
