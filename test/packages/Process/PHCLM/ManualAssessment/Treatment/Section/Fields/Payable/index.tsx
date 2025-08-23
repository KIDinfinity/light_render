import PayableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';
import BenefitItemCode, { localFieldConfig as BenefitItemCodeConfig } from './BenefitItemCode';
import PayableDays, { localFieldConfig as PayableDaysConfig } from './PayableDays';
import Remark, { localFieldConfig as RemarkConfig } from './Remark';
import BenefitAmountPerDay, {
  localFieldConfig as BenefitAmountPerDayConfig,
} from './BenefitAmountPerDay';
import PolicyNo, { localFieldConfig as PolicyNoConfig } from './PolicyNo';
import BenefitTypeCode, { localFieldConfig as BenefitTypeCodeConfig } from './BenefitTypeCode';
import ProductCode, { localFieldConfig as ProductCodeConfig } from './ProductCode';
import DateOfAdmission, { localFieldConfig as DateOfAdmissionConfig } from './DateOfAdmission';
import DateOfDischarge, { localFieldConfig as DateOfDischargeConfig } from './DateOfDischarge';

export const localFieldConfigs = [
  PayableAmountConfig,
  BenefitItemCodeConfig,
  PayableDaysConfig,
  RemarkConfig,
  BenefitAmountPerDayConfig,
  PolicyNoConfig,
  BenefitTypeCodeConfig,
  ProductCodeConfig,
  DateOfAdmissionConfig,
  DateOfDischargeConfig,
];

export default {
  PayableAmount,
  BenefitItemCode,
  PayableDays,
  Remark,
  BenefitAmountPerDay,
  PolicyNo,
  BenefitTypeCode,
  ProductCode,
  DateOfAdmission,
  DateOfDischarge,
};
