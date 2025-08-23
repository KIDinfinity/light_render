import TreamentPayableAmount, {
  localFieldConfig as BasicPayableAmountConfig,
} from './PayableAmount';
import TreamentPayableDays, { localFieldConfig as BasicPayableDaysConfig } from './PayableDays';

import Chooise, { localFieldConfig as ChooiseConfig } from './Chooise';
import TreatmentNo, { localFieldConfig as TreatmentNoConfig } from './TreatmentNo';
import PolicyYear, { localFieldConfig as PolicyYearConfig } from './PolicyYear';

export const localFieldConfigs = [
  ChooiseConfig,
  PolicyYearConfig,
  TreatmentNoConfig,
  BasicPayableAmountConfig,
  BasicPayableDaysConfig,
];

export default {
  Chooise,
  PolicyYear,
  TreatmentNo,
  TreamentPayableAmount,
  TreamentPayableDays,
};
