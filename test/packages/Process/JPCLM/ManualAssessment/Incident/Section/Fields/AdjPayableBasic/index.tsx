import AssessorOverrideAmount, {
  localFieldConfig as AssessorOverrideAmountConfig,
} from './AssessorOverrideAmount';
import BenefitTypeCode, { localFieldConfig as BenefitTypeCodeConfig } from './BenefitTypeCode';
import ClaimDecision, { localFieldConfig as ClaimDecisionConfig } from './ClaimDecision';

import ProductCode, { localFieldConfig as ProductCodeConfig } from './ProductCode';
import Remark, { localFieldConfig as RemarkConfig } from './Remark';

import ChangeObjectAmount, {
  localFieldConfig as ChangeObjectAmountConfig,
} from './ChangeObjectAmount';

import ReasonDate, { localFieldConfig as ReasonDateConfig } from './ReasonDate';

import DiagnosisName, { localFieldConfig as DiagnosisNameConfig } from './DiagnosisName';

export const localFieldConfigs = [
  AssessorOverrideAmountConfig,
  BenefitTypeCodeConfig,
  ClaimDecisionConfig,
  ProductCodeConfig,
  RemarkConfig,
  ChangeObjectAmountConfig,
  ReasonDateConfig,
  DiagnosisNameConfig,
];

export default {
  AssessorOverrideAmount,
  BenefitTypeCode,
  ClaimDecision,
  ProductCode,
  Remark,
  ChangeObjectAmount,
  ReasonDate,
  DiagnosisName,
};
