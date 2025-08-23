import TherapeuticDrugs, { fieldConfig as TherapeuticDrugsConfig } from './TherapeuticDrugs';
import TherapeuticDate, { fieldConfig as TherapeuticDateConfig } from './TherapeuticDate';
import TherapyType, { localFieldConfig as TherapyTypeConfig } from './TherapyType';
import TherapeuticDrugNameDesc, {
  fieldConfig as TherapeuticDrugNameDescConfig,
} from './TherapeuticDrugNameDesc';
export const localFieldConfigs = [
  TherapeuticDrugsConfig,
  TherapeuticDateConfig,
  TherapyTypeConfig,
  TherapeuticDrugNameDescConfig,
];

export default {
  TherapeuticDrugs,
  TherapeuticDate,
  TherapyType,
  TherapeuticDrugNameDesc,
};
