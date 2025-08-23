import FromDate, { localFieldConfig as FromDateConfig } from './FromDate';
import ServiceItemDescription, {
  fieldConfig as ServiceItemDescriptionConfig,
} from './ServiceItemDescription';
import Expense, { localFieldConfig as ExpenseConfig } from './Expense';
import ServiceItem, { localFieldConfig as ServiceItemConfig } from './ServiceItem';
import ProcedureType, { localFieldConfig as ProcedureTypeConfig } from './ProcedureType';

export const localFieldConfigs = [
  FromDateConfig,
  ServiceItemDescriptionConfig,
  ExpenseConfig,
  ServiceItemConfig,
  ProcedureTypeConfig,
];

export default {
  FromDate,
  ServiceItemDescription,
  Expense,
  ServiceItem,
  ProcedureType,
};
