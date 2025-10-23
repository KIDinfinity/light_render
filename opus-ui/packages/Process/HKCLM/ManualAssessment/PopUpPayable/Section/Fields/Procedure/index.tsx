import OperationDate, { localFieldConfig as OperationDateConfig } from './OperationDate';
import ProcedureCode, { localFieldConfig as ProcedureCodeConfig } from './ProcedureCode';
import payableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';
import Chooise, { localFieldConfig as ChooiseConfig } from './Chooise';
import PolicyYear, { localFieldConfig as PolicyYearConfig } from './PolicyYear';

export const localFieldConfigs = [
  OperationDateConfig,
  ProcedureCodeConfig,
  PayableAmountConfig,
  ChooiseConfig,
  PolicyYearConfig,
];

export default {
  OperationDate,
  ProcedureCode,
  payableAmount,
  Chooise,
  PolicyYear,
};
