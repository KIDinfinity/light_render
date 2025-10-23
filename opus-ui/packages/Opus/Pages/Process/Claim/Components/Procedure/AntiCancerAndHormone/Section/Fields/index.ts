import TherapeuticDrugs, { fieldConfig as TherapeuticDrugsConfig } from './TherapeuticDrugs';
import TherapeuticDrugNameDesc, {
  fieldConfig as TherapeuticDrugNameDescConfig,
} from './TherapeuticDrugNameDesc';
import TherapeuticDateList, {
  fieldConfig as TherapeuticDateListConfig,
} from './TherapeuticDateList';
import TherapyType, { localFieldConfig as TherapyTypeConfig } from './TherapyType';

export const localFieldConfigs = [
  TherapeuticDrugsConfig,
  TherapeuticDrugNameDescConfig,
  TherapeuticDateListConfig,
  TherapyTypeConfig,
];

export default {
  TherapeuticDrugs,
  TherapeuticDateList,
  TherapeuticDrugNameDesc,
  TherapyType,
};
