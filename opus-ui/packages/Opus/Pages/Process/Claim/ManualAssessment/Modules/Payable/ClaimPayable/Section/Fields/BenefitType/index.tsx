import BenefitTypeCode, { localFieldConfig as BenefitTypeCodeConfig } from './BenefitTypeCode';
import ClaimDecision, { localFieldConfig as ClaimDecisionConfig } from './ClaimDecision';
import DenyCode, { localFieldConfig as DenyCodeConfig } from './DenyCode';
import DenyReason, { localFieldConfig as DenyReasonConfig } from './DenyReason';
import ExGratiaCode, { localFieldConfig as ExGratiaCodeConfig } from './ExGratiaCode';
import ExGratiaReason, { localFieldConfig as ExGratiaReasonConfig } from './ExGratiaReason';
import Remark, { localFieldConfig as RemarkConfig } from './Remark';
import PolicyYear, { localFieldConfig as PolicyYearConfig } from './PolicyYear';

import PayableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';

export const localFieldConfigs = [
  BenefitTypeCodeConfig,
  ClaimDecisionConfig,
  DenyCodeConfig,
  DenyReasonConfig,
  ExGratiaCodeConfig,
  ExGratiaReasonConfig,
  RemarkConfig,
  PayableAmountConfig,
  PolicyYearConfig,
];

export default {
  BenefitTypeCode,
  ClaimDecision,
  DenyCode,
  DenyReason,
  ExGratiaCode,
  ExGratiaReason,
  Remark,
  PayableAmount,
  PolicyYear,
};
