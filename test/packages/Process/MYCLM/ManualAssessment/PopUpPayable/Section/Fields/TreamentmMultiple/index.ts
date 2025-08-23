import TreamentPayableAmount, {
  localFieldConfig as BasicPayableAmountConfig,
} from './PayableAmount';
import TreamentPayableDays, { localFieldConfig as BasicPayableDaysConfig } from './PayableDays';

import Chooise, { localFieldConfig as ChooiseConfig } from './Chooise';
import TreatmentNo, { localFieldConfig as TreatmentNoConfig } from './TreatmentNo';

export const localFieldConfigs = [
  ChooiseConfig,

  TreatmentNoConfig,
  BasicPayableAmountConfig,
  BasicPayableDaysConfig,
];

export default {
  Chooise,
  TreatmentNo,
  TreamentPayableAmount,
  TreamentPayableDays,
};
