import Expense, { localFieldConfig as ExpenseConfig } from './Expense';
import InvoiceNo, { localFieldConfig as InvoiceNoConfig } from './InvoiceNo';
import OtherInsurerPaidAmount, {
  localFieldConfig as OtherInsurerPaidAmountConfig,
} from './OtherInsurerPaidAmount';

import ServiceItem, { localFieldConfig as ServiceItemConfig } from './ServiceItem';
import SurgeryClass, { localFieldConfig as SurgeryClassConfig } from './SurgeryClass';
import Unit, { localFieldConfig as UnitConfig } from './Unit';

export const localFieldConfigs = [
  ExpenseConfig,
  InvoiceNoConfig,
  OtherInsurerPaidAmountConfig,
  ServiceItemConfig,
  SurgeryClassConfig,
  UnitConfig,
];

export default {
  Expense,
  InvoiceNo,
  OtherInsurerPaidAmount,
  ServiceItem,
  SurgeryClass,
  Unit,
};
