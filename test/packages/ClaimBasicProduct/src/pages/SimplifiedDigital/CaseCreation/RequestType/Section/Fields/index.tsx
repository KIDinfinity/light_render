import BusinessType, { localFieldConfig as BusinessTypeConfig } from './BusinessType';
import TransactionTypeCode, {
  localFieldConfig as TransactionTypeCodeConfig,
} from './TransactionTypeCode';

export const localFieldConfigs = [BusinessTypeConfig, TransactionTypeCodeConfig];

export default {
  BusinessType,
  TransactionTypeCode,
};
