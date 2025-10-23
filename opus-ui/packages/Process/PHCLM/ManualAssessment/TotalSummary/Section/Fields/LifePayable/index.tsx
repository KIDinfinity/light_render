import BenefitItemCode, { localFieldConfig as BenefitItemCodeConfig } from './BenefitItemCode';
import BenefitTypeCode, { localFieldConfig as BenefitTypeCodeConfig } from './BenefitTypeCode';
import PayableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';
import PayableDays, { localFieldConfig as PayableDaysConfig } from './PayableDays';
import PolicyNo, { localFieldConfig as PolicyNoConfig } from './PolicyNo';
import Sumassured, { localFieldConfig as SumassuredConfig } from './Sumassured';
import RefundAmount, { localFieldConfig as RefundAmountConfig } from './RefundAmount';
import ProductCode, { localFieldConfig as ProductCodeConfig } from './ProductCode';
import ReimbursementPercentage, {
  localFieldConfig as ReimbursementPercentageConfig,
} from './ReimbursementPercentage';

export const localFieldConfigs = [
  BenefitItemCodeConfig,
  BenefitTypeCodeConfig,
  PayableAmountConfig,
  PayableDaysConfig,
  PolicyNoConfig,
  SumassuredConfig,
  RefundAmountConfig,
  ProductCodeConfig,
  ReimbursementPercentageConfig,
];

export default {
  BenefitItemCode,
  BenefitTypeCode,
  PayableAmount,
  PayableDays,
  PolicyNo,
  Sumassured,
  RefundAmount,
  ProductCode,
  ReimbursementPercentage,
};
