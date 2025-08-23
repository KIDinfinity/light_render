import Code, { localFieldConfig as CodeConfig } from './Code';
import ShortName, { localFieldConfig as ShortNameConfig } from './ShortName';
import LongDescription, { localFieldConfig as LongDescriptionConfig } from './LongDescription';
import ExclusionShortName, {
  localFieldConfig as ExclusionShortNameConfig,
} from './ExclusionShortName';

export const localFieldConfigs = [
  CodeConfig,
  LongDescriptionConfig,
  ShortNameConfig,
  ExclusionShortNameConfig,
];

export default {
  Code,
  LongDescription,
  ShortName,
  ExclusionShortName,
};
