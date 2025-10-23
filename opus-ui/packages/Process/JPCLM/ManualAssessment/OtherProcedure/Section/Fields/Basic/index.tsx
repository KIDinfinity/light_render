import FromDate, { localFieldConfig as FromDateConfig } from './FromDate';
import ToDate, { localFieldConfig as ToDateConfig } from './ToDate';
import OtherRadiationNames, {
  localFieldConfig as OtherRadiationNamesConfig,
} from './OtherRadiationNames';
import IrradiationContent, {
  localFieldConfig as IrradiationContentConfig,
} from './IrradiationContent';
import RadiationContent, { localFieldConfig as RadiationContentConfig } from './RadiationContent';
import TherapyType, { localFieldConfig as TherapyTypeConfig } from './TherapyType';
import TherapeuticDate, { localFieldConfig as TherapeuticDateConfig } from './TherapeuticDate';
import TherapeuticDrug, { localFieldConfig as TherapeuticDrugConfig } from './TherapeuticDrug';
import TherapeuticMonth, { localFieldConfig as TherapeuticMonthConfig } from './TherapeuticMonth';
import RadiationCategory, {
  localFieldConfig as RadiationCategoryConfig,
} from './RadiationCategory';
import RadiationAppFlg, { localFieldConfig as RadiationAppFlgConfig } from './RadiationAppFlg';
import KjCode, { localFieldConfig as KjCodeConfig } from './KjCode';
export const localFieldConfigs = [
  FromDateConfig,
  ToDateConfig,
  OtherRadiationNamesConfig,
  IrradiationContentConfig,
  RadiationContentConfig,
  RadiationCategoryConfig,
  TherapyTypeConfig,
  TherapeuticDateConfig,
  TherapeuticDrugConfig,
  TherapeuticMonthConfig,
  RadiationAppFlgConfig,
  KjCodeConfig,
];

export default {
  FromDate,
  ToDate,
  RadiationCategory,
  RadiationContent,
  IrradiationContent,
  OtherRadiationNames,
  TherapyType,
  TherapeuticDate,
  TherapeuticDrug,
  TherapeuticMonth,
  RadiationAppFlg,
  KjCode,
};
