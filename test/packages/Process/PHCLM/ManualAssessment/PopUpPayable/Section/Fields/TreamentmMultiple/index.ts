import TreamentPayableAmount, {
  localFieldConfig as BasicPayableAmountConfig,
} from './PayableAmount';
import TreamentPayableDays, { localFieldConfig as BasicPayableDaysConfig } from './PayableDays';

import Chooise, { localFieldConfig as ChooiseConfig } from './Chooise';
import TreatmentNo, { localFieldConfig as TreatmentNoConfig } from './TreatmentNo';
import DateOfAdmission, { localFieldConfig as DateOfAdmissionConfig } from './DateOfAdmission';
import DateOfDischarge, { localFieldConfig as DateOfDischargeConfig } from './DateOfDischarge';
export const localFieldConfigs = [
  ChooiseConfig,

  TreatmentNoConfig,
  BasicPayableAmountConfig,
  BasicPayableDaysConfig,
  DateOfAdmissionConfig,
  DateOfDischargeConfig,
];

export default {
  Chooise,
  TreatmentNo,
  TreamentPayableAmount,
  TreamentPayableDays,
  DateOfAdmission,
  DateOfDischarge,
};
