import TherapyType, { localFieldConfig as TherapyTypeConfig } from './TherapyType';
import FirstTreatmentDate, {
  localFieldConfig as FirstTreatmentDateConfig,
} from './FirstTreatmentDate';
import IntravenousTreatment, {
  localFieldConfig as IntravenousTreatmentConfig,
} from './IntravenousTreatment';

export const localFieldConfigs = [
  TherapyTypeConfig,
  FirstTreatmentDateConfig,
  IntravenousTreatmentConfig,
];

export default {
  TherapyType,
  FirstTreatmentDate,
  IntravenousTreatment,
};
