import TherapyType, { localFieldConfig as TherapyTypeConfig } from './TherapyType';
import TherapeuticDate, { localFieldConfig as TherapeuticDateConfig } from './TherapeuticDate';
import TherapeuticDrugs, { localFieldConfig as TherapeuticDrugsConfig } from './TherapeuticDrugs';
import FromDate, { localFieldConfig as FromDateConfig } from './FromDate';
import ToDate, { localFieldConfig as ToDateConfig } from './ToDate';

export const localFieldConfigs = [
  TherapyTypeConfig,
  TherapeuticDateConfig,
  TherapeuticDrugsConfig,
  FromDateConfig,
  ToDateConfig,
];

export default {
  TherapyType,
  TherapeuticDate,
  TherapeuticDrugs,
  FromDate,
  ToDate,
};
