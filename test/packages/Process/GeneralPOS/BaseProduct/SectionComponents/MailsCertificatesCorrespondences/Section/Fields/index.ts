import BranchCode, { localFieldConfig as BranchCodeConfig } from './BranchCode';
import MailType, { localFieldConfig as MailTypeConfig } from './MailType';
import SendTo, { localFieldConfig as SendToConfig } from './SendTo';

export const localFieldConfigs = [BranchCodeConfig, MailTypeConfig, SendToConfig];

export default {
  BranchCode,
  MailType,
  SendTo,
};
