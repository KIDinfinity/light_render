import AssessorOverrideAmount, {
  localFieldConfig as AssessorOverrideAmountConfig,
} from './AssessorOverrideAmount';
import AssessorOverrideMultiple, {
  localFieldConfig as AssessorOverrideMultipleConfig,
} from './AssessorOverrideMultiple';
import BenefitItemCode, { localFieldConfig as BenefitItemCodeConfig } from './BenefitItemCode';
import BenefitTypeCode, { localFieldConfig as BenefitTypeCodeConfig } from './BenefitTypeCode';
import PolicyNo, { localFieldConfig as PolicyNoConfig } from './PolicyNo';
import ProductCode, { localFieldConfig as ProductCodeConfig } from './ProductCode';
import ReimbursementMultiple, {
  localFieldConfig as ReimbursementMultipleConfig,
} from './ReimbursementMultiple';
import Remark, { localFieldConfig as RemarkConfig } from './Remark';
import SystemCalculationAmount, {
  localFieldConfig as SystemCalculationAmountConfig,
} from './SystemCalculationAmount';
import ChangeObjectAmount, {
  localFieldConfig as ChangeObjectAmountConfig,
} from './ChangeObjectAmount';
import ReversalFlag, { localFieldConfig as ReversalFlagConfig } from './ReversalFlag';

export const localFieldConfigs = [
  AssessorOverrideAmountConfig,
  AssessorOverrideMultipleConfig,
  BenefitItemCodeConfig,
  BenefitTypeCodeConfig,
  PolicyNoConfig,
  ProductCodeConfig,
  ReimbursementMultipleConfig,
  RemarkConfig,
  SystemCalculationAmountConfig,
  ChangeObjectAmountConfig,
  ReversalFlagConfig,
];

export default {
  AssessorOverrideAmount,
  AssessorOverrideMultiple,
  BenefitItemCode,
  BenefitTypeCode,
  PolicyNo,
  ProductCode,
  ReimbursementMultiple,
  Remark,
  SystemCalculationAmount,
  ChangeObjectAmount,
  ReversalFlag,
};
