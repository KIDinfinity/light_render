import BenefitPercentage, {
  localFieldConfig as BenefitPercentageConfig,
} from './BenefitPercentage';
import FirstName, { localFieldConfig as FirstNameConfig } from './FirstName';
import MiddleName, { localFieldConfig as MiddleNameConfig } from './MiddleName';
import Name, { localFieldConfig as NameConfig } from './Name';
import Relationship, { localFieldConfig as RelationshipConfig } from './Relationship';
import Surname, { localFieldConfig as SurnameConfig } from './Surname';
import Total, { localFieldConfig as TotalConfig } from './Total';
import BeneficiaryType, { localFieldConfig as BeneficiaryTypeConfig } from './BeneficiaryType';

export const localFieldConfigs = [
  RelationshipConfig,
  FirstNameConfig,
  MiddleNameConfig,
  SurnameConfig,
  BenefitPercentageConfig,
  TotalConfig,
  NameConfig,
  BeneficiaryTypeConfig,
];

export default {
  Relationship,
  FirstName,
  MiddleName,
  Surname,
  BenefitPercentage,
  Total,
  Name,
  BeneficiaryType,
};
