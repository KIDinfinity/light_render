import Email, { localFieldConfig as EmailConfig } from './Email';
import ContactNo, { localFieldConfig as ContactNoConfig } from './ContactNo';
import InsuredName, { localFieldConfig as InsuredNameConfig } from './InsuredName';
import OwnerName, { localFieldConfig as OwnerNameTypeConfig } from './OwnerName';
import DateofBirth, { localFieldConfig as DateofBirthConfig } from './DateofBirth';

export const localFieldConfigs = [
  EmailConfig,
  ContactNoConfig,
  InsuredNameConfig,
  OwnerNameTypeConfig,
  DateofBirthConfig,
];

export default {
  Email,
  ContactNo,
  InsuredName,
  OwnerName,
  DateofBirth,
};
