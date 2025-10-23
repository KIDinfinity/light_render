import Expense, { localFieldConfig as ExpenseConfig } from './Expense';
import OtherInsurerPaidAmount, {
  localFieldConfig as OtherInsurerPaidAmountConfig,
} from './OtherInsurerPaidAmount';
import ServiceItem, { localFieldConfig as ServiceItemConfig } from './ServiceItem';
import ServiceItemDescription, {
  localFieldConfig as ServiceItemDescriptionConfig,
} from './ServiceItemDescription';
import SurgeryClass, { localFieldConfig as SurgeryClassConfig } from './SurgeryClass';
import Unit, { localFieldConfig as UnitConfig } from './Unit';
import NetExpense, { localFieldConfig as NetExpenseConfig } from './NetExpense';
import VatExpense, { localFieldConfig as VatExpenseConfig } from './VatExpense';

export const localFieldConfigs = [
  ExpenseConfig,
  OtherInsurerPaidAmountConfig,
  ServiceItemConfig,
  ServiceItemDescriptionConfig,
  SurgeryClassConfig,
  UnitConfig,
  NetExpenseConfig,
  VatExpenseConfig,
];

export default {
  Expense,
  OtherInsurerPaidAmount,
  ServiceItem,
  ServiceItemDescription,
  SurgeryClass,
  Unit,
  NetExpense,
  VatExpense,
};
