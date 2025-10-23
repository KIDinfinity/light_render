import BenefitItemCode, { localFieldConfig as BenefitItemCodeConfig } from './BenefitItemCode';
import BenefitTypeCode, { localFieldConfig as BenefitTypeCodeConfig } from './BenefitTypeCode';
import PolicyNo, { localFieldConfig as PolicyNoConfig } from './PolicyNo';
import ProductCode, { localFieldConfig as ProductCodeConfig } from './ProductCode';
import Remark, { localFieldConfig as RemarkConfig } from './Remark';
import PayableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';
import PayableDays, { localFieldConfig as PayableDaysConfig } from './PayableDays';
import ReimbursementMultiple, {
  localFieldConfig as ReimbursementMultipleConfig,
} from './ReimbursementMultiple';
import ReversalFlag, { localFieldConfig as ReversalFlagConfig } from './ReversalFlag';

export const localFieldConfigs = [
  BenefitItemCodeConfig,
  BenefitTypeCodeConfig,
  PolicyNoConfig,
  ProductCodeConfig,
  RemarkConfig,
  PayableAmountConfig,
  ReimbursementMultipleConfig,
  PayableDaysConfig,
  ReversalFlagConfig,
];

export default {
  BenefitItemCode,
  BenefitTypeCode,
  PolicyNo,
  ProductCode,
  Remark,
  PayableAmount,
  ReimbursementMultiple,
  PayableDays,
  ReversalFlag,
};
