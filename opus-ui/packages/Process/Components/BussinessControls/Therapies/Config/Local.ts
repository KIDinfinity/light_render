import localSectionConfig from './Section';
import { localFieldConfigs as BasicFieldConfigs } from '../Fields/Basic';
import { localFieldConfigs as PayableFieldConfigs } from '../Fields/Payable';

export default {
  configs: [localSectionConfig, ...BasicFieldConfigs, ...PayableFieldConfigs],
  remote: true,
};
