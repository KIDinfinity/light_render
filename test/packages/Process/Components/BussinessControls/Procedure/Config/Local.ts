import localSectionConfig from './Section';
import { localFieldConfigs as BasiclocalFieldConfigs } from '../Fields';

export default {
  configs: [localSectionConfig, ...BasiclocalFieldConfigs],
  remote: true,
};
