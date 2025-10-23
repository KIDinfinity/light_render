import localSectionConfig from './Section';
import { localFieldConfigs as FieldConfigs } from '../Fields';

export default {
  configs: [localSectionConfig, ...FieldConfigs],
  remote: true,
};
