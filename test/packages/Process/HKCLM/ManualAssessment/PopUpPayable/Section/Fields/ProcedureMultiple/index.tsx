import OperationDate, { localFieldConfig as OperationDateConfig } from './OperationDate';
import ProcedureCode, { localFieldConfig as ProcedureCodeConfig } from './ProcedureCode';
import payableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';
import Chooise, { localFieldConfig as ChooiseConfig } from './Chooise';

export const localFieldConfigs = [
  OperationDateConfig,
  ProcedureCodeConfig,
  PayableAmountConfig,
  ChooiseConfig,
];

export default {
  OperationDate,
  ProcedureCode,
  payableAmount,
  Chooise,
};
