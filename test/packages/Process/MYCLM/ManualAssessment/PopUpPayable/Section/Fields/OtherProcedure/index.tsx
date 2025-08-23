import ProcedureCode, { localFieldConfig as ProcedureCodeConfig } from './ProcedureCode';
import payableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';
import Chooise, { localFieldConfig as ChooiseConfig } from './Chooise';
import PolicyYear, { localFieldConfig as PolicyYearConfig } from './PolicyYear';
import DateOfConsultation, {
  localFieldConfig as DateOfConsultationConfig,
} from './DateOfConsultation';
import PayableDays, { localFieldConfig as PayableDaysConfig } from './PayableDays';

export const localFieldConfigs = [
  ProcedureCodeConfig,
  PayableAmountConfig,
  ChooiseConfig,
  PolicyYearConfig,
  DateOfConsultationConfig,
  PayableDaysConfig,
];

export default {
  ProcedureCode,
  payableAmount,
  Chooise,
  PolicyYear,
  DateOfConsultation,
  PayableDays,
};
