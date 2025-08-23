import AssessorOverrideAmount, {
  localFieldConfig as AssessorOverrideAmountConfig,
} from './AssessorOverrideAmount';
import AssessorOverrideMultiple, {
  localFieldConfig as AssessorOverrideMultipleConfig,
} from './AssessorOverrideMultiple';
import BenefitItemCode, { localFieldConfig as BenefitItemCodeConfig } from './BenefitItemCode';
import BenefitTypeCode, { localFieldConfig as BenefitTypeCodeConfig } from './BenefitTypeCode';
import PolicyNo, { localFieldConfig as PolicyNoConfig } from './PolicyNo';
import PolicyNoAdd, { localFieldConfig as PolicyNoAddConfig } from './PolicyNoAdd';
import ProductCode, { localFieldConfig as ProductCodeConfig } from './ProductCode';
import ReimbursementMultiple, {
  localFieldConfig as ReimbursementMultipleConfig,
} from './ReimbursementMultiple';
import Remark, { localFieldConfig as RemarkConfig } from './Remark';
import SystemCalculationAmount, {
  localFieldConfig as SystemCalculationAmountConfig,
} from './SystemCalculationAmount';
import RadioTherapyReasonDate1, {
  localFieldConfig as RadioTherapyReasonDate1Config,
} from './RadioTherapyReasonDate1';
import RadioTherapyReasonDate2, {
  localFieldConfig as RadioTherapyReasonDate2Config,
} from './RadioTherapyReasonDate2';

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
  RadioTherapyReasonDate1Config,
  RadioTherapyReasonDate2Config,
  PolicyNoAddConfig,
];

export default {
  AssessorOverrideAmount,
  AssessorOverrideMultiple,
  BenefitItemCode,
  BenefitTypeCode,
  PolicyNo,
  PolicyNoAdd,
  ProductCode,
  ReimbursementMultiple,
  Remark,
  SystemCalculationAmount,
  RadioTherapyReasonDate1,
  RadioTherapyReasonDate2,
};
