import Email, { localFieldConfig as EmailConfig } from './Email';
import PostCode, { localFieldConfig as PostCodeConfig } from './PostCode';

export const localFieldConfigs = [EmailConfig, PostCodeConfig];

export default {
  Email,
  PostCode,
};
