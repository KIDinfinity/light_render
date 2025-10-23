import Fulladdress, { fieldConfig as FulladdressConfig } from './Fulladdress';
import Email, { fieldConfig as emailConfig } from './Email';
import Telegram, { fieldConfig as telegramConfig } from './Telegram';
import Whatsapp, { fieldConfig as whatsAppConfig } from './Whatsapp';
import Phoneno, { fieldConfig as phoneNoConfig } from './Phoneno';
import Phonenoreadonly, { fieldConfig as phonenoreadonlyConfig } from './Phonenoreadonly';
import Worknumber, { fieldConfig as workNumberConfig } from './Worknumber';
import Homenumber, { fieldConfig as homeNumberConfig } from './Homenumber';
import AddressHomenumber, { fieldConfig as AddressHomenumberConfig } from './AddressHomenumber';
import Contacttype, { fieldConfig as contactTypeConfig } from './Contacttype';
import Contactno, { fieldConfig as contactNoConfig } from './Contactno';
import Countrycode, { fieldConfig as countryCodeConfig } from './Countrycode';
import Currentaddress7, { fieldConfig as currentAddress7Config } from './Currentaddress7';
import Currentaddress6, { fieldConfig as currentAddress6Config } from './Currentaddress6';
import Currentaddress5, { fieldConfig as currentAddress5Config } from './Currentaddress5';
import Currentaddress4, { fieldConfig as currentAddress4Config } from './Currentaddress4';
import Currentaddress3, { fieldConfig as currentAddress3Config } from './Currentaddress3';
import Currentaddress2, { fieldConfig as currentAddress2Config } from './Currentaddress2';
import Currentaddress1, { fieldConfig as currentAddress1Config } from './Currentaddress1';
import Currentzipcode, { fieldConfig as currentZipCodeConfig } from './Currentzipcode';
import Businessaddress7, { fieldConfig as businessAddress7Config } from './Businessaddress7';
import Businessaddress6, { fieldConfig as businessAddress6Config } from './Businessaddress6';
import Businessaddress5, { fieldConfig as businessAddress5Config } from './Businessaddress5';
import Businessaddress4, { fieldConfig as businessAddress4Config } from './Businessaddress4';
import Businessaddress3, { fieldConfig as businessAddress3Config } from './Businessaddress3';
import Businessaddress2, { fieldConfig as businessAddress2Config } from './Businessaddress2';
import Businessaddress1, { fieldConfig as businessAddress1Config } from './Businessaddress1';
import Address7, { fieldConfig as address7Config } from './Address7';
import Address6, { fieldConfig as address6Config } from './Address6';
import Address5, { fieldConfig as address5Config } from './Address5';
import Address4, { fieldConfig as address4Config } from './Address4';
import Address3, { fieldConfig as address3Config } from './Address3';
import Address2, { fieldConfig as address2Config } from './Address2';
import Address1, { fieldConfig as address1Config } from './Address1';
import AddressType, { fieldConfig as addressTypeConfig } from './AddressType';
import Zipcode, { fieldConfig as zipCodeConfig } from './Zipcode';
import Businesszipcode, { fieldConfig as businessZipCodeConfig } from './Businesszipcode';
import Language, { fieldConfig as languageConfig } from './Language';
import EntityPOBusinessAddress, {
  fieldConfig as entityPOBusinessAddressConfig,
} from './EntityPOBusinessAddress';
import Currentaddress, { fieldConfig as currentAddressConfig } from './Currentaddress';
import Businessaddress, { fieldConfig as businessAddressConfig } from './Businessaddress';
import EntityPolicyOwnerBusinessAddress, {
  fieldConfig as EntityPolicyOwnerBusinessAddressConfig,
} from './EntityPolicyOwnerBusinessAddress';
import Addcontacttype, { fieldConfig as addContactTypeConfig } from './Addcontacttype';
import Addcontactno, { fieldConfig as addContactNoConfig } from './Addcontactno';
import Residentialaddress7, {
  fieldConfig as residentialAddress7Config,
} from './Residentialaddress7';
import Residentialaddress6, {
  fieldConfig as residentialAddress6Config,
} from './Residentialaddress6';
import Residentialaddress5, {
  fieldConfig as residentialAddress5Config,
} from './Residentialaddress5';
import Residentialaddress4, {
  fieldConfig as residentialAddress4Config,
} from './Residentialaddress4';
import Residentialaddress3, {
  fieldConfig as residentialAddress3Config,
} from './Residentialaddress3';
import Residentialaddress2, {
  fieldConfig as residentialAddress2Config,
} from './Residentialaddress2';
import Residentialaddress1, {
  fieldConfig as residentialAddress1Config,
} from './Residentialaddress1';
import Residentialaddress, { fieldConfig as residentialAddressConfig } from './Residentialaddress';
import Residentialzipcode, { fieldConfig as residentialZipCodeConfig } from './Residentialzipcode';
import Businessfulladdress, {
  fieldConfig as businessFullAddressConfig,
} from './Businessfulladdress';
import Entitycurrentofficeaddress, {
  fieldConfig as entityCurrentOfficeAddressConfig,
} from './Entitycurrentofficeaddress';
import CommunicationLane, { fieldConfig as communicationLaneConfig } from './CommunicationLane';
import CorrespondenceViaEmail, {
  fieldConfig as correspondenceViaEmailConfig,
} from './CorrespondenceViaEmail';

import AddressTypeAdd, { fieldConfig as addressTypeAddConfig } from './AddressTypeAdd';
import IdentityAddress, { fieldConfig as identityAddressConfig } from './Identityaddress';
import IdentityZipCode, { fieldConfig as identityZipCodeConfig } from './Identityzipcode';

export const localFieldConfigs = [
  telegramConfig,
  whatsAppConfig,
  phoneNoConfig,
  workNumberConfig,
  homeNumberConfig,
  AddressHomenumberConfig,
  emailConfig,
  communicationLaneConfig,
  correspondenceViaEmailConfig,
  addressTypeConfig,
  address7Config,
  address6Config,
  address5Config,
  address4Config,
  address3Config,
  address2Config,
  address1Config,
  zipCodeConfig,
  languageConfig,
  FulladdressConfig,
  phonenoreadonlyConfig,
  contactTypeConfig,
  contactNoConfig,
  countryCodeConfig,
  currentAddress7Config,
  currentAddress6Config,
  currentAddress5Config,
  currentAddress4Config,
  currentAddress3Config,
  currentAddress2Config,
  currentAddress1Config,
  currentZipCodeConfig,
  businessAddress7Config,
  businessAddress6Config,
  businessAddress5Config,
  businessAddress4Config,
  businessAddress3Config,
  businessAddress2Config,
  businessAddress1Config,
  businessZipCodeConfig,
  entityPOBusinessAddressConfig,
  currentAddressConfig,
  businessAddressConfig,
  EntityPolicyOwnerBusinessAddressConfig,
  addContactTypeConfig,
  addContactNoConfig,
  residentialAddress7Config,
  residentialAddress6Config,
  residentialAddress5Config,
  residentialAddress4Config,
  residentialAddress3Config,
  residentialAddress2Config,
  residentialAddress1Config,
  residentialAddressConfig,
  residentialZipCodeConfig,
  businessFullAddressConfig,
  entityCurrentOfficeAddressConfig,
  addressTypeAddConfig,
  identityZipCodeConfig,
  identityAddressConfig
];

export default {
  Telegram,
  Whatsapp,
  Phoneno,
  Worknumber,
  Homenumber,
  AddressHomenumber,
  Email,
  CommunicationLane,
  CorrespondenceViaEmail,
  AddressType,
  Address7,
  Address6,
  Address5,
  Address4,
  Address3,
  Address2,
  Address1,
  Zipcode,
  Language,
  Fulladdress,
  Phonenoreadonly,
  Contacttype,
  Contactno,
  Countrycode,
  Currentaddress7,
  Currentaddress6,
  Currentaddress5,
  Currentaddress4,
  Currentaddress3,
  Currentaddress2,
  Currentaddress1,
  Currentzipcode,
  Businessaddress7,
  Businessaddress6,
  Businessaddress5,
  Businessaddress4,
  Businessaddress3,
  Businessaddress2,
  Businessaddress1,
  Businesszipcode,
  EntityPOBusinessAddress,
  Currentaddress,
  Businessaddress,
  EntityPolicyOwnerBusinessAddress,
  Addcontacttype,
  Addcontactno,
  Residentialaddress7,
  Residentialaddress6,
  Residentialaddress5,
  Residentialaddress4,
  Residentialaddress3,
  Residentialaddress2,
  Residentialaddress1,
  Residentialaddress,
  Residentialzipcode,
  Businessfulladdress,
  Entitycurrentofficeaddress,

  AddressTypeAdd,
  IdentityAddress,
  IdentityZipCode
};
