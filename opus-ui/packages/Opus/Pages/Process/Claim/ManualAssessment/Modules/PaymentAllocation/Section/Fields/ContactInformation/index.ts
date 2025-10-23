import AddressKana, { fieldConfig as AddressKanaLocalFieldConfig } from './AddressKana';
import AddressKJ, { fieldConfig as AddressKJLocalFieldConfig } from './AddressKJ';
import ContactType, { localFieldConfig as ContactTypeLocalFieldConfig } from './ContactType';
import Email, { fieldConfig as EmailLocalFieldConfig } from './Email';
import PhoneNo, { fieldConfig as PhoneNoLocalFieldConfig } from './PhoneNo';
import PostalCode, { fieldConfig as PostalCodeLocalFieldConfig } from './PostalCode';
import Sms, { localFieldConfig as SmsLocalFieldConfig } from './Sms';

export const localFieldConfigs = [
  AddressKanaLocalFieldConfig,
  AddressKJLocalFieldConfig,
  ContactTypeLocalFieldConfig,
  EmailLocalFieldConfig,
  PhoneNoLocalFieldConfig,
  PostalCodeLocalFieldConfig,
  SmsLocalFieldConfig,
];

export default {
  AddressKana,
  AddressKJ,
  ContactType,
  Email,
  PhoneNo,
  PostalCode,
  Sms,
};
