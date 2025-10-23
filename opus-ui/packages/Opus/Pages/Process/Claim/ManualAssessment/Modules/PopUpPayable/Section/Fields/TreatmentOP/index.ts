import TreatmentPayableAmount, {
  localFieldConfig as BasicPayableAmountConfig,
} from './PayableAmount';
import TreatmentPayableDays, { localFieldConfig as BasicPayableDaysConfig } from './PayableDays';

import Chooise, { localFieldConfig as ChooiseConfig } from './Chooise';
import TreatmentNo, { localFieldConfig as TreatmentNoConfig } from './TreatmentNo';
import TreatmentDate, { localFieldConfig as TreatmentDateConfig } from './TreatmentDate';
import PolicyYear, { localFieldConfig as PolicyYearConfig } from './PolicyYear';

export const localFieldConfigs = [
  ChooiseConfig,
  PolicyYearConfig,
  TreatmentNoConfig,
  TreatmentDateConfig,
  BasicPayableAmountConfig,
  BasicPayableDaysConfig,
];

export default {
  Chooise,
  PolicyYear,
  TreatmentNo,
  TreatmentDate,
  TreatmentPayableAmount,
  TreatmentPayableDays,
};
