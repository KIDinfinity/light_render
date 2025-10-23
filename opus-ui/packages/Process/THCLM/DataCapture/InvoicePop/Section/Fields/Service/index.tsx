import Expense, { localFieldConfig as ExpenseConfig } from './Expense';
import OtherInsurerPaidAmount, {
  localFieldConfig as OtherInsurerPaidAmountConfig,
} from './OtherInsurerPaidAmount';
import ServiceItem, { localFieldConfig as ServiceItemConfig } from './ServiceItem';
import SurgeryClass, { localFieldConfig as SurgeryClassConfig } from './SurgeryClass';
import Unit, { localFieldConfig as UnitConfig } from './Unit';

export const localFieldConfigs = [
  ExpenseConfig,
  OtherInsurerPaidAmountConfig,
  ServiceItemConfig,
  SurgeryClassConfig,
  UnitConfig,
];

export default {
  Expense,
  OtherInsurerPaidAmount,
  ServiceItem,
  SurgeryClass,
  Unit,
};
