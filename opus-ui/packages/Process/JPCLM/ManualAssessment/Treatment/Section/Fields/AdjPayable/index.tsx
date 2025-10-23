import BenefitItemCode, { localFieldConfig as BenefitItemCodeConfig } from './BenefitItemCode';
import BenefitTypeCode, { localFieldConfig as BenefitTypeCodeConfig } from './BenefitTypeCode';
import PayableDays, { localFieldConfig as PayableDaysConfig } from './PayableDays';
import PolicyNo, { localFieldConfig as PolicyNoConfig } from './PolicyNo';
import ProductCode, { localFieldConfig as ProductCodeConfig } from './ProductCode';
import PayableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';
import ChangeObjectAmount, {
  localFieldConfig as ChangeObjectAmountConfig,
} from './ChangeObjectAmount';
export const localFieldConfigs = [
  BenefitItemCodeConfig,
  BenefitTypeCodeConfig,
  PayableDaysConfig,
  PolicyNoConfig,
  ProductCodeConfig,
  PayableAmountConfig,
  ChangeObjectAmountConfig,
];

export default {
  BenefitItemCode,
  BenefitTypeCode,
  PayableDays,
  PolicyNo,
  ProductCode,
  PayableAmount,
  ChangeObjectAmount,
};
