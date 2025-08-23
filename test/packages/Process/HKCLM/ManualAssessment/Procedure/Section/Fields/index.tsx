import OperationDate, { localFieldConfig as OperationDateConfig } from './OperationDate';
import ProcedureCode, { localFieldConfig as ProcedureCodeConfig } from './ProcedureCode';
import ProcedureDescription, {
  localFieldConfig as ProcedureDescriptionConfig,
} from './ProcedureDescription';
import SurgeryCategory, { localFieldConfig as SurgeryCategoryConfig } from './SurgeryCategory';
import TherapiesType, { localFieldConfig as TherapiesTypeConfig } from './TherapiesType';
import TherapiesTypeICU, { localFieldConfig as TherapiesTypeICUConfig } from './TherapiesTypeICU';
import TherapiesTypeAdd, { localFieldConfig as TherapiesTypeAddConfig } from './TherapiesTypeIAdd';
import IcuFromDate, { localFieldConfig as IcuFromDateConfig } from './IcuFromDate';
import IcuToDate, { localFieldConfig as IcuToDateConfig } from './IcuToDate';
import IcuDays, { localFieldConfig as IcuDaysConfig } from './IcuDays';

export const localFieldConfigs = [
  OperationDateConfig,
  ProcedureCodeConfig,
  ProcedureDescriptionConfig,
  SurgeryCategoryConfig,
  TherapiesTypeConfig,
  TherapiesTypeICUConfig,
  TherapiesTypeAddConfig,
  IcuFromDateConfig,
  IcuToDateConfig,
  IcuDaysConfig,
];

export default {
  OperationDate,
  ProcedureCode,
  ProcedureDescription,
  SurgeryCategory,
  TherapiesType,
  TherapiesTypeICU,
  TherapiesTypeAdd,
  IcuFromDate,
  IcuToDate,
  IcuDays,
};
