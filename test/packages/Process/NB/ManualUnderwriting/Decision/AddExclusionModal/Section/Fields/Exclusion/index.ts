import Code, { fieldConfig as codeConfig } from './Code';
import ShortName, { fieldConfig as shortNameConfig } from './ShortName';
import LongDescription, { fieldConfig as longDescriptionConfig } from './LongDescription';
import Reason, { fieldConfig as reasonConfig } from './Reason';
import ExclusionReason, { fieldConfig as exclusionReasonConfig } from './ExclusionReason';
import Exclusionuwdecisionreason, {
  fieldConfig as exclusionUwDecisionReasonConfig,
} from './Exclusionuwdecisionreason';

export const localFieldConfigs = [
  codeConfig,
  shortNameConfig,
  longDescriptionConfig,
  reasonConfig,
  exclusionReasonConfig,
  exclusionUwDecisionReasonConfig,
];

export default {
  Code,
  ShortName,
  LongDescription,
  Reason,
  ExclusionReason,
  Exclusionuwdecisionreason,
};
