import localSectionConfig from './Section';
import { localFieldConfigs as AddFieldConfigs } from '../Fields/Add';
import { localFieldConfigs as BasicFieldConfigs } from '../Fields/Basic';
import { localFieldConfigs as HeaderFieldConfigs } from '../Fields/Header';
import { localFieldConfigs as CheckFieldConfigs } from '../Fields/Check';

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
