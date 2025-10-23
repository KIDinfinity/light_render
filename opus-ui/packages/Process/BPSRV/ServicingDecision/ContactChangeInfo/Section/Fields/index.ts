import Email, { localFieldConfig as EmailConfig } from './Email';
import HomeNo, { localFieldConfig as HomeNoConfig } from './HomeNo';
import PhoneNo, { localFieldConfig as PhoneNoConfig } from './PhoneNo';
import WorkNo, { localFieldConfig as WorkNoConfig } from './WorkNo';

export const localFieldConfigs = [EmailConfig, HomeNoConfig, PhoneNoConfig, WorkNoConfig];

export default {
  Email,
  HomeNo,
  PhoneNo,
  WorkNo,
};
