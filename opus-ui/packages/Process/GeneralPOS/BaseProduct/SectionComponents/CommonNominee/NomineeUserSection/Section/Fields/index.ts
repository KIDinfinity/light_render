import Relationship, { localFieldConfig as RelationshipConfig } from './Relationship';
import FirstName, { localFieldConfig as FirstNameConfig } from './FirstName';
import MiddleName, { localFieldConfig as MiddleNameConfig } from './MiddleName';
import Surname, { localFieldConfig as SurnameConfig } from './Surname';
import IdentityNo, { localFieldConfig as IdentityNoConfig } from './IdentityNo';
import DateofBirth, { localFieldConfig as DateofBirthConfig } from './DateofBirth';
import IdentityType, { localFieldConfig as IdentityTypeConfig } from './IdentityType';
import Gender, { localFieldConfig as GenderConfig } from './Gender';
import OtherRelationship, {
  localFieldConfig as OtherRelationshipConfig,
} from './OtherRelationship';

export const localFieldConfigs = [
  RelationshipConfig,
  FirstNameConfig,
  MiddleNameConfig,
  SurnameConfig,
  IdentityNoConfig,
  DateofBirthConfig,
  IdentityTypeConfig,
  GenderConfig,
  OtherRelationshipConfig,
];

export default {
  Relationship,
  FirstName,
  MiddleName,
  Surname,
  IdentityNo,
  DateofBirth,
  IdentityType,
  Gender,
  OtherRelationship,
};
