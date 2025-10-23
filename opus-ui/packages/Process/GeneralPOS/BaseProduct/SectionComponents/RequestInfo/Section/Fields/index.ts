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
import Remark, { localFieldConfig as RemarkConfig } from './Remark';
import RequestDate, { localFieldConfig as RequestDateConfig} from './RequestDate';
import TransactionRemark, { localFieldConfig as TransactionRemarkConfig } from './TransactionRemark';

export const localFieldConfigs = [
  DecisionConfig,
  DeclineReasonConfig,
  EditDeclineReasonConfig,
  EffectiveDateConfig,
  ReferenceTransactionNoConfig,
  ServicingRequestInfoConfig,
  RemarkConfig,
  TransactionRemarkConfig,
  RequestDateConfig
];

export default {
  Decision,
  DeclineReason,
  EditDeclineReason,
  EffectiveDate,
  ReferenceTransactionNo,
  ServicingRequestInfo,
  Remark,
  TransactionRemark,
  RequestDate
};
