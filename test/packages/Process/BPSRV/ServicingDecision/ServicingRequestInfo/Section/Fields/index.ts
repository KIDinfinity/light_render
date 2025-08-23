import Decision, { localFieldConfig as DecisionConfig } from './Decision';
import DeclineReason, { localFieldConfig as DeclineReasonConfig } from './DeclineReason';
import EditDeclineReason, {
  localFieldConfig as EditDeclineReasonConfig,
} from './EditDeclineReason';
import EffectiveDate, { localFieldConfig as EffectiveDateConfig } from './EffectiveDate';
import ReferenceTransactionNo, {
  localFieldConfig as ReferenceTransactionNoConfig,
} from './ReferenceTransactionNo';
import ServicingRequestInfo, {
  localFieldConfig as ServicingRequestInfoConfig,
} from './ServicingRequestInfo';
import TransactionTypeCode, {
  localFieldConfig as TransactionTypeCodeConfig,
} from './TransactionTypeCode';
import Remark, { localFieldConfig as RemarkConfig } from './Remark';

export const localFieldConfigs = [
  DecisionConfig,
  DeclineReasonConfig,
  EditDeclineReasonConfig,
  EffectiveDateConfig,
  ReferenceTransactionNoConfig,
  ServicingRequestInfoConfig,
  TransactionTypeCodeConfig,
  RemarkConfig,
];

export default {
  Decision,
  DeclineReason,
  EditDeclineReason,
  EffectiveDate,
  ReferenceTransactionNo,
  ServicingRequestInfo,
  TransactionTypeCode,
  Remark,
};
