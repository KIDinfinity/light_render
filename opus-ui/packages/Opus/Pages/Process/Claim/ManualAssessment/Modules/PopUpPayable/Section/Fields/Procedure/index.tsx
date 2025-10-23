import OperationDate, { localFieldConfig as OperationDateConfig } from './OperationDate';
import ProcedureCode, { localFieldConfig as ProcedureCodeConfig } from './ProcedureCode';
import ProcedureName, { localFieldConfig as ProcedureNameConfig } from './ProcedureName';
import payableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';
import Chooise, { localFieldConfig as ChooiseConfig } from './Chooise';
import PolicyYear, { localFieldConfig as PolicyYearConfig } from './PolicyYear';
import TreatmentNo, { localFieldConfig as TreatmentNoConfig } from './TreatmentNo';
import ReimbursementMultiple, {
  localFieldConfig as ReimbursementMultipleConfig,
} from './ReimbursementMultiple';

export const localFieldConfigs = [
  OperationDateConfig,
  ProcedureCodeConfig,
  ProcedureNameConfig,
  PayableAmountConfig,
  ChooiseConfig,
  PolicyYearConfig,
  TreatmentNoConfig,
  ReimbursementMultipleConfig,
];

export default {
  OperationDate,
  ProcedureCode,
  ProcedureName,
  payableAmount,
  Chooise,
  PolicyYear,
  TreatmentNo,
  ReimbursementMultiple,
};
