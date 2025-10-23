import localSectionConfig from './Section';
import { localFieldConfigs as FieldConfigs } from '../Fields';
import { localFieldConfigs as FieldFormConfigs } from '../Fields/Form';

export default {
  configs: [localSectionConfig, ...FieldConfigs, ...FieldFormConfigs],
  remote: true,
};
