import Relationship, { localFieldConfig as RelationshipConfig } from './Relationship';
import FirstName, { localFieldConfig as FirstNameConfig } from './FirstName';
import MiddleName, { localFieldConfig as MiddleNameConfig } from './MiddleName';
import Surname, { localFieldConfig as SurnameConfig } from './Surname';
import IdentityType, { localFieldConfig as IdentityTypeConfig } from './IdentityType';
import IdentityNumber, { localFieldConfig as IdentityNumberConfig } from './IdentityNumber';
import DateofBirth, { localFieldConfig as DateofBirthConfig } from './DateofBirth';
import BenefitPercentage, {
  localFieldConfig as BenefitPercentageConfig,
} from './BenefitPercentage';
import Gender, { localFieldConfig as GenderConfig } from './Gender';
import ClientID, { localFieldConfig as ClientIDConfig } from './ClientID';

export const localFieldConfigs = [
  RelationshipConfig,
  FirstNameConfig,
  MiddleNameConfig,
  SurnameConfig,
  IdentityTypeConfig,
  IdentityNumberConfig,
  DateofBirthConfig,
  BenefitPercentageConfig,
  GenderConfig,
  ClientIDConfig,
];

export default {
  Relationship,
  FirstName,
  MiddleName,
  Surname,
  IdentityType,
  IdentityNumber,
  DateofBirth,
  BenefitPercentage,
  Gender,
  ClientID,
};
