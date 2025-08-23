import OperationDate, { localFieldConfig as OperationDateConfig } from './OperationDate';
import ProcedureCode, { localFieldConfig as ProcedureCodeConfig } from './ProcedureCode';
import ProcedureDescription, {
  localFieldConfig as ProcedureDescriptionConfig,
} from './ProcedureDescription';
import SurgeryCategory, { localFieldConfig as SurgeryCategoryConfig } from './SurgeryCategory';
import TherapiesType, { localFieldConfig as TherapiesTypeConfig } from './TherapiesType';
import IcuFromDate, { localFieldConfig as IcuFromDateConfig } from './IcuFromDate';
import IcuToDate, { localFieldConfig as IcuToDateConfig } from './IcuToDate';
import IcuDays, { localFieldConfig as IcuDaysConfig } from './IcuDays';
import MainBenefit, { localFieldConfig as MainBenefitConfig } from './MainBenefit';
import Doctor, { localFieldConfig as DoctorConfig } from './Doctor';
import ReimbursementPercentage, {
  localFieldConfig as ReimbursementPercentageConfig,
} from './ReimbursementPercentage';

export const localFieldConfigs = [
  OperationDateConfig,
  ProcedureCodeConfig,
  ProcedureDescriptionConfig,
  SurgeryCategoryConfig,
  TherapiesTypeConfig,
  IcuFromDateConfig,
  IcuToDateConfig,
  IcuDaysConfig,
  MainBenefitConfig,
  DoctorConfig,
  ReimbursementPercentageConfig,
];

export default {
  OperationDate,
  ProcedureCode,
  ProcedureDescription,
  SurgeryCategory,
  TherapiesType,
  IcuFromDate,
  IcuToDate,
  IcuDays,
  MainBenefit,
  Doctor,
  ReimbursementPercentage,
};
