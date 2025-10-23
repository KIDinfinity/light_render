import Expense, { localFieldConfig as ExpenseConfig } from './Expense';
import Unit, { localFieldConfig as UnitConfig } from './Unit';
import FeeItem, { localFieldConfig as FeeItemConfig } from './FeeItem';

export const localFieldConfigs = [ExpenseConfig, FeeItemConfig, UnitConfig];

export default {
  Expense,
  FeeItem,
  Unit,
};
