import PayableAmount, { localFieldConfig as BasicPayableAmountConfig } from './PayableAmount';
import TreamentPayableDays, { localFieldConfig as BasicPayableDaysConfig } from './PayableDays';

import Chooise, { localFieldConfig as ChooiseConfig } from './Chooise';
import TreatmentNo, { localFieldConfig as TreatmentNoConfig } from './TreatmentNo';
import IncidentNo, { localFieldConfig as IncidentNoConfig } from './IncidentNo';
import HospitalizationPeriod, {
  localFieldConfig as HospitalizationPeriodConfig,
} from './HospitalizationPeriod';
import PolicyYear, { localFieldConfig as PolicyYearConfig } from './PolicyYear';

export const localFieldConfigs = [
  ChooiseConfig,
  PolicyYearConfig,
  TreatmentNoConfig,
  IncidentNoConfig,
  HospitalizationPeriodConfig,
  BasicPayableAmountConfig,
  BasicPayableDaysConfig,
];

export default {
  Chooise,
  PolicyYear,
  TreatmentNo,
  IncidentNo,
  HospitalizationPeriod,
  PayableAmount,
  TreamentPayableDays,
};
