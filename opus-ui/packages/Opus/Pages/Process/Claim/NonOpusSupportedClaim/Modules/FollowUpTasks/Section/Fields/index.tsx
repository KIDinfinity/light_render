import CompletionDate, { localFieldConfig as CompletionDateConfig } from './completionDate';
import ItemNo, { localFieldConfig as ItemNoConfig } from './itemNo';
import FollowUpTask, { localFieldConfig as FollowUpTaskConfig } from './followUpTask';
import Remark, { localFieldConfig as RemarkConfig } from './Remark';

export const localFieldConfigs = [
  CompletionDateConfig,
  ItemNoConfig,
  FollowUpTaskConfig,
  RemarkConfig,
];

export default {
  ItemNo,
  FollowUpTask,
  CompletionDate,
  Remark,
};
