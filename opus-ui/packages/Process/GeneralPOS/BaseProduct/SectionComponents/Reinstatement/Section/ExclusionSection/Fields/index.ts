import Code, { localFieldConfig as CodeConfig } from './Code';
import ShortName, { localFieldConfig as ShortNameConfig } from './ShortName';
import LongDescription, { localFieldConfig as LongDescriptionConfig } from './LongDescription';

export const localFieldConfigs = [CodeConfig, LongDescriptionConfig, ShortNameConfig];

export default {
  Code,
  LongDescription,
  ShortName,
};
