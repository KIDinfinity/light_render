import TreamentPayableAmount, {
  localFieldConfig as BasicPayableAmountConfig,
} from './PayableAmount';
import TreamentPayableDays, { localFieldConfig as BasicPayableDaysConfig } from './PayableDays';

import Chooise, { localFieldConfig as ChooiseConfig } from './Chooise';
import TreatmentNo, { localFieldConfig as TreatmentNoConfig } from './TreatmentNo';
import PolicyYear, { localFieldConfig as PolicyYearConfig } from './PolicyYear';
import DateOfAdmission, { localFieldConfig as DateOfAdmissionConfig } from './DateOfAdmission';
import DateOfDischarge, { localFieldConfig as DateOfDischargeConfig } from './DateOfDischarge';
export const localFieldConfigs = [
  ChooiseConfig,
  PolicyYearConfig,
  TreatmentNoConfig,
  BasicPayableAmountConfig,
  BasicPayableDaysConfig,
  DateOfAdmissionConfig,
  DateOfDischargeConfig,
];

export default {
  Chooise,
  PolicyYear,
  TreatmentNo,
  TreamentPayableAmount,
  TreamentPayableDays,
  DateOfAdmission,
  DateOfDischarge,
};
