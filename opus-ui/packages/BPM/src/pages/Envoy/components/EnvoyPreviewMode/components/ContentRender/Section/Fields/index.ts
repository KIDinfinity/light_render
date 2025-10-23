import SmsContent, { localFieldConfig as SmsContentConfig } from './SmsContent';
import EmailContent, { localFieldConfig as EmailContentConfig } from './EmailContent';

export const localFieldConfigs = [SmsContentConfig, EmailContentConfig];

export default {
  SmsContent,
  EmailContent,
};
