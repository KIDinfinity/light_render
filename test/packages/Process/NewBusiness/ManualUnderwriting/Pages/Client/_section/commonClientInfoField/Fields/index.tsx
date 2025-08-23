import Ccrclientid, { fieldConfig as ccrClientIdConfig } from './Ccrclientid';
import Laclientid, { fieldConfig as laClientIdConfig } from './Laclientid';
import Firstname, { fieldConfig as firstNameConfig } from './Firstname';
import Surname, { fieldConfig as surnameConfig } from './Surname';
import Newclientflag, { fieldConfig as newClientFlagConfig } from './Newclientflag';
import Customerrole, { fieldConfig as customerRoleConfig } from './Customerrole';
import Relationofinsured, { fieldConfig as relationOfInsuredConfig } from './Relationofinsured';
import Relationofproposer, { fieldConfig as relationOfProposerConfig } from './Relationofproposer';
import Relationofbeneficiary, {
  fieldConfig as relationOfBeneficiaryConfig,
} from './Relationofbeneficiary';
import Customertype, { fieldConfig as customerTypeConfig } from './Customertype';
import Middlename, { fieldConfig as middleNameConfig } from './Middlename';
import Extensionname, { fieldConfig as extensionNameConfig } from './Extensionname';
import Title, { fieldConfig as titleConfig } from './Title';
import Customerenfirstname, {
  fieldConfig as customerEnFirstNameConfig,
} from './Customerenfirstname';
import Customerensurname, { fieldConfig as customerEnSurnameConfig } from './Customerensurname';

import Customerenextensionname, {
  fieldConfig as customerEnExtensionNameConfig,
} from './Customerenextensionname';
import Customerenmiddlename, {
  fieldConfig as customerEnMiddleNameConfig,
} from './Customerenmiddlename';
import Childrelationshiptype,{fieldConfig as childrelationshiptypeConfig} from './Childrelationshiptype'

export const localFieldConfigs = [
  ccrClientIdConfig,
  laClientIdConfig,
  firstNameConfig,
  surnameConfig,
  newClientFlagConfig,
  customerRoleConfig,
  relationOfInsuredConfig,
  relationOfProposerConfig,
  relationOfBeneficiaryConfig,
  customerTypeConfig,
  middleNameConfig,
  extensionNameConfig,
  titleConfig,
  customerEnExtensionNameConfig,
  customerEnFirstNameConfig,
  customerEnMiddleNameConfig,
  customerEnSurnameConfig,
  childrelationshiptypeConfig,
];

export default {
  Ccrclientid,
  Laclientid,
  Firstname,
  Surname,
  Newclientflag,
  Customerrole,
  Relationofinsured,
  Relationofproposer,
  Relationofbeneficiary,
  Customertype,
  Middlename,
  Extensionname,
  Title,
  Customerensurname,
  Customerenfirstname,
  Customerenextensionname,
  Customerenmiddlename,
  Childrelationshiptype,
};
