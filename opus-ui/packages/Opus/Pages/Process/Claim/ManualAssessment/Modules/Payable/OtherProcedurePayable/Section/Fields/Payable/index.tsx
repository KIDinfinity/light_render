import BenefitItemCode, { localFieldConfig as BenefitItemCodeConfig } from './BenefitItemCode';
import BenefitTypeCode, { localFieldConfig as BenefitTypeCodeConfig } from './BenefitTypeCode';
import PolicyNo, { localFieldConfig as PolicyNoConfig } from './PolicyNo';
import ProductCode, { localFieldConfig as ProductCodeConfig } from './ProductCode';
import Remark, { localFieldConfig as RemarkConfig } from './Remark';
import PayableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';
import PayableDays, { localFieldConfig as PayableDaysConfig } from './PayableDays';
import RadioDateList, { localFieldConfig as RadioDateListConfig } from './RadioDateList';
import ConsultationDate, { fieldConfig as ConsultationDateConfig } from './ConsultationDate';
import AssessorOverrideTimes, {
  localFieldConfig as AssessorOverrideTimesConfig,
} from './AssessorOverrideTimes';
import RadioTherapyReasonDate1, {
  localFieldConfig as RadioTherapyReasonDate1Config,
} from './RadioTherapyReasonDate1';
import RadioTherapyReasonDate2, {
  localFieldConfig as RadioTherapyReasonDate2Config,
} from './RadioTherapyReasonDate2';
import ReimbursementMultiple, {
  localFieldConfig as ReimbursementMultipleConfig,
} from './ReimbursementMultiple';
import ReferenceDate, { localFieldConfig as ReferenceDateConfig } from './ReferenceDate';
import MultiReasonDates, { fieldConfig as MultiReasonDatesConfig } from './MultiReasonDates';
import NumberOfReasonMonths, {
  fieldConfig as NumberOfReasonMonthsConfig,
} from './NumberOfReasonMonths';

export const localFieldConfigs = [
  BenefitItemCodeConfig,
  BenefitTypeCodeConfig,
  PolicyNoConfig,
  ProductCodeConfig,
  RemarkConfig,
  PayableAmountConfig,
  ReimbursementMultipleConfig,
  PayableDaysConfig,
  RadioTherapyReasonDate1Config,
  RadioTherapyReasonDate2Config,
  RadioDateListConfig,
  AssessorOverrideTimesConfig,
  ConsultationDateConfig,
  ReferenceDateConfig,
  MultiReasonDatesConfig,
  NumberOfReasonMonthsConfig,
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
  RadioTherapyReasonDate1,
  RadioTherapyReasonDate2,
  RadioDateList,
  AssessorOverrideTimes,
  ConsultationDate,
  ReferenceDate,
  MultiReasonDates,
  NumberOfReasonMonths,
};
