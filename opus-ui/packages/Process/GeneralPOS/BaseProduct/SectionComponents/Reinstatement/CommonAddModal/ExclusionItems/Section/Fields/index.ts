import Code, { localFieldConfig as CodeConfig } from './Code';
import ShortName, { localFieldConfig as ShortNameConfig } from './ShortName';
import LongDescription, { localFieldConfig as longDescriptionConfig } from './LongDescription';

export const localFieldConfigs = [CodeConfig, ShortNameConfig, longDescriptionConfig];

export default {
  Code,
  ShortName,
  LongDescription,
};
