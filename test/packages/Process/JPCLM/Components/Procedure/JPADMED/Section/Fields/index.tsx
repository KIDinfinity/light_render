import Expense, { localFieldConfig as ExpenseConfig } from './Expense';
import FromDate, { localFieldConfig as FromDateConfig } from './FromDate';
import ToDate, { localFieldConfig as ToDateConfig } from './ToDate';
import ServiceItem, { localFieldConfig as ServiceItemConfig } from './ServiceItem';
import AdvancedMedicalCn, {
  localFieldConfig as AdvancedMedicalCnConfig,
} from './AdvancedMedicalCn';

import MedicalProvider, { fieldConfig as MedicalProviderConfig } from './MedicalProvider';
import MedicalProviderDescription, {
  fieldConfig as MedicalProviderDescriptionConfig,
} from './MedicalProviderDescription';
import MedicalProviderEffectiveDate, {
  localFieldConfig as MedicalProviderEffectiveDateConfig,
} from './MedicalProviderEffectiveDate';
import MedicalProviderExpireDate, {
  localFieldConfig as MedicalProviderExpireDateConfig,
} from './MedicalProviderExpireDate';
import ProcedureType, { localFieldConfig as ProcedureTypeConfig } from './ProcedureType';

export const localFieldConfigs = [
  ExpenseConfig,
  FromDateConfig,
  ToDateConfig,
  AdvancedMedicalCnConfig,
  ServiceItemConfig,
  MedicalProviderConfig,
  MedicalProviderDescriptionConfig,
  MedicalProviderEffectiveDateConfig,
  MedicalProviderExpireDateConfig,
  ProcedureTypeConfig
];

export default {
  Expense,
  FromDate,
  ToDate,
  ServiceItem,
  AdvancedMedicalCn,
  MedicalProvider,
  MedicalProviderDescription,
  MedicalProviderEffectiveDate,
  MedicalProviderExpireDate,
  ProcedureType
};
