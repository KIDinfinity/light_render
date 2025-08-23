import localSectionConfig from './Section';
import { localFieldConfigs as BasicFieldConfigs } from '../Fields/Basic';
import { localFieldConfigs as HeaderFieldConfigs } from '../Fields/Header';

export default {
  configs: [localSectionConfig, ...BasicFieldConfigs, ...HeaderFieldConfigs],
  remote: true,
};
