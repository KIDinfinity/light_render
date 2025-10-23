import BenefitItemCode, { localFieldConfig as BenefitItemCodeConfig } from './BenefitItemCode';
import BenefitTypeCode, { localFieldConfig as BenefitTypeCodeConfig } from './BenefitTypeCode';
import PolicyNo, { localFieldConfig as PolicyNoConfig } from './PolicyNo';
import ProductCode, { localFieldConfig as ProductCodeConfig } from './ProductCode';
import PolicyYear, { localFieldConfig as PolicyYearConfig } from './PolicyYear';
import Remark, { localFieldConfig as RemarkConfig } from './Remark';
import ReimbursementMultiple, {
  localFieldConfig as ReimbursementMultipleConfig,
} from './ReimbursementMultiple';
import HospitalizationFlg, {
  localFieldConfig as HospitalizationFlgConfig,
} from './HospitalizationFlg';
import HospitalizationSequentialNo, {
  localFieldConfig as HospitalizationSequentialNoConfig,
} from './HospitalizationSequentialNo';

import DiagnosisCode, { localFieldConfig as DiagnosisCodeConfig } from './DiagnosisCode';
import PayableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';
import PayableDays, { localFieldConfig as PayableDaysConfig } from './PayableDays';
import ReversalFlag, { localFieldConfig as ReversalFlagConfig } from './ReversalFlag';

export const localFieldConfigs = [
  BenefitItemCodeConfig,
  BenefitTypeCodeConfig,
  PolicyNoConfig,
  ProductCodeConfig,
  RemarkConfig,
  HospitalizationFlgConfig,
  HospitalizationSequentialNoConfig,
  DiagnosisCodeConfig,
  PayableAmountConfig,
  PayableDaysConfig,
  ReimbursementMultipleConfig,
  ReversalFlagConfig,
  PolicyYearConfig,
];

export default {
  BenefitItemCode,
  BenefitTypeCode,
  PolicyNo,
  ProductCode,
  Remark,
  HospitalizationFlg,
  HospitalizationSequentialNo,
  DiagnosisCode,
  PayableAmount,
  PayableDays,
  ReimbursementMultiple,
  ReversalFlag,
  PolicyYear,
};
