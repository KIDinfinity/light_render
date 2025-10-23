import Title, { fieldConfig as titleConfig } from './Title';
import Name, { fieldConfig as nameConfig } from './Name';
import LastName, { fieldConfig as lastNameConfig } from './LastName';
import PreviousName, { fieldConfig as previousNameConfig } from './PreviousName';
import Age, { fieldConfig as ageConfig } from './Age';
import CountryOfNationality, {
  fieldConfig as countryOfNationalityConfig,
} from './CountryOfNationality';
import DateOfBirth, { fieldConfig as dateOfBirthConfig } from './DateOfBirth';
import ExpriyDate, { fieldConfig as expiryDateConfig } from './ExpiryDate';
import Gender, { fieldConfig as genderConfig } from './Gender';
import MaritalStatus, { fieldConfig as maritalStatusConfig } from './MaritalStatus';
import IdCard, { fieldConfig as idCardConfig } from './IdCard';
import Nationality, { fieldConfig as nationalityConfig } from './Nationality';
import PassportNo, { fieldConfig as passportNoConfig } from './PassportNo';
import WholelifeIdCard, { fieldConfig as wholelifeIdCardConfig } from './WholelifeIdCard';
import RelationshipOfInsured, {
  fieldConfig as RelationshipOfInsuredConfig,
} from './RelationshipOfInsured';

export const localFieldConfigs = [
  titleConfig,
  nameConfig,
  lastNameConfig,
  previousNameConfig,
  ageConfig,
  countryOfNationalityConfig,
  dateOfBirthConfig,
  expiryDateConfig,
  genderConfig,
  maritalStatusConfig,
  idCardConfig,
  nationalityConfig,
  passportNoConfig,
  wholelifeIdCardConfig,
  RelationshipOfInsuredConfig,
];

export default {
  Title,
  Name,
  LastName,
  PreviousName,
  Age,
  CountryOfNationality,
  DateOfBirth,
  ExpriyDate,
  Gender,
  MaritalStatus,
  IdCard,
  Nationality,
  PassportNo,
  WholelifeIdCard,
  RelationshipOfInsured,
};
