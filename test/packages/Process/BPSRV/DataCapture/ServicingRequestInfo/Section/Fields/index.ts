import ServicingRequestInfo, {
  localFieldConfig as ServicingRequestInfoConfig,
} from './ServicingRequestInfo';
import TransactionTypeCode, {
  localFieldConfig as TransactionTypeCodeConfig,
} from './TransactionTypeCode';

export const localFieldConfigs = [ServicingRequestInfoConfig, TransactionTypeCodeConfig];

export default {
  ServicingRequestInfo,
  TransactionTypeCode,
};
