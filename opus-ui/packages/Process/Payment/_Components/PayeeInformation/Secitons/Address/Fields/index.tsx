import Email, { localFieldConfig as EmailConfig } from './Email';
import PostCode, { localFieldConfig as PostCodeConfig } from './PostCode';
import Address, { localFieldConfig as AddressConfig } from './Address';

export const localFieldConfigs = [EmailConfig, PostCodeConfig, AddressConfig];

export default {
  Email,
  PostCode,
  Address,
};
