import TransactionTypeCode, {
  localFieldConfig as TransactionTypeCodeConfig,
} from './TransactionTypeCode';
import EffectiveDate, { localFieldConfig as EffectiveDateConfig } from './EffectiveDate';
import BackDateFlag, { localFieldConfig as BackDateConfig } from './BackDateFlag';
import MoniesDate, { localFieldConfig as MoniesDateConfig } from './MoniesDate';
import RequestDate, { localFieldConfig as RequestDateConfig } from './RequestDate';

export const localFieldConfigs = [
  TransactionTypeCodeConfig,
  EffectiveDateConfig,
  BackDateConfig,
  MoniesDateConfig,
  RequestDateConfig,
];

export default {
  EffectiveDate,
  BackDateFlag,
  MoniesDate,
  TransactionTypeCode,
  RequestDate,
};
