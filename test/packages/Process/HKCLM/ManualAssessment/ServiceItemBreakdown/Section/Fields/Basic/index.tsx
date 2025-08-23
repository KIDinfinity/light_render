import Expense, { localFieldConfig as ExpenseConfig } from './Expense';
import Unit, { localFieldConfig as UnitConfig } from './Unit';

export const localFieldConfigs = [
  ExpenseConfig,
  UnitConfig,
];

export default {
  Expense,
  Unit,
};
