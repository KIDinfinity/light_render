import Code, { localFieldConfig as CodeConfig } from './Code';
import ShortName, { localFieldConfig as ShortNameConfig } from './ShortName';
import LongDescription, { localFieldConfig as longDescriptionConfig } from './LongDescription';
import ExclusionShortName, {
  localFieldConfig as ExclusionShortNameConfig,
} from './ExclusionShortName';
export const localFieldConfigs = [
  CodeConfig,
  ShortNameConfig,
  longDescriptionConfig,
  ExclusionShortNameConfig,
];

export default {
  Code,
  ShortName,
  LongDescription,
  ExclusionShortName,
};
