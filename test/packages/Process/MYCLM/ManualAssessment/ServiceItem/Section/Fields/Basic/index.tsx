import Expense, { localFieldConfig as ExpenseConfig } from './Expense';
import OtherInsurerPaidAmount, {
  localFieldConfig as OtherInsurerPaidAmountConfig,
} from './OtherInsurerPaidAmount';
import ServiceItem, { localFieldConfig as ServiceItemConfig } from './ServiceItem';
import SurgeryClass, { localFieldConfig as SurgeryClassConfig } from './SurgeryClass';
import Unit, { localFieldConfig as UnitConfig } from './Unit';
import NetExpense, { localFieldConfig as NetExpenseConfig } from './NetExpense';
import VatExpense, { localFieldConfig as VatExpenseConfig } from './VatExpense';
import ProcedureCode, { localFieldConfig as ProcedureCodeConfig } from './ProcedureCode';

export const localFieldConfigs = [
  ExpenseConfig,
  OtherInsurerPaidAmountConfig,
  ServiceItemConfig,
  SurgeryClassConfig,
  UnitConfig,
  NetExpenseConfig,
  VatExpenseConfig,
  ProcedureCodeConfig,
];

export default {
  Expense,
  OtherInsurerPaidAmount,
  ServiceItem,
  SurgeryClass,
  Unit,
  NetExpense,
  VatExpense,
  ProcedureCode,
};
