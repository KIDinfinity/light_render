import ChequeAmount, { localFieldConfig as ChequeAmountConfig } from './ChequeAmount';
import PayeeName, { localFieldConfig as PayeeNameConfig } from './PayeeName';
import CostCentre, { localFieldConfig as CostCenterConfig } from './CostCentre';
import BudgetCode, { localFieldConfig as BudgetCodeConfig } from './BudgetCode';
import DoctorName, { localFieldConfig as DoctorNameConfig } from './DoctorName';
import Reason, { localFieldConfig as ReasonConfig } from './Reason'

export const localFieldConfigs = [
  ChequeAmountConfig,
  PayeeNameConfig,
  CostCenterConfig,
  BudgetCodeConfig,
  CostCenterConfig,
  DoctorNameConfig,
  ReasonConfig,
];

export default {
  ChequeAmount,
  PayeeName,
  CostCentre,
  BudgetCode,
  DoctorName,
  Reason,
};
