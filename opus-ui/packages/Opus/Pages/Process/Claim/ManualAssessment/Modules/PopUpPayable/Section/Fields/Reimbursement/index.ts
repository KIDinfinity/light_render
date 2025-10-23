import TreatmentNo, { localFieldConfig as TreatmentNoConfig } from './TreatmentNo';
import Therapy, { localFieldConfig as TherapyConfig } from './Therapy';
import ServicePayableAmount, {
  localFieldConfig as ServicePayableAmountConfig,
} from './PayableAmount';
import Chooise, { localFieldConfig as ChooiseConfig } from './Chooise';
export const localFieldConfigs = [
  TreatmentNoConfig,
  ServicePayableAmountConfig,
  TherapyConfig,
  ChooiseConfig,
];

export default {
  TreatmentNo,
  Therapy,
  ServicePayableAmount,
  Chooise,
};
