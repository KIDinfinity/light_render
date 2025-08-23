import Ckaflag, { fieldConfig as ckaFlagConfig } from './Ckaflag';
import UnitsName, { fieldConfig as unitsNameConfig } from './UnitsName';
import Educationcode, { fieldConfig as educationCodeConfig } from './Educationcode';
import Employeraddressline1, {
  fieldConfig as employerAddressLine1Config,
} from './Employeraddressline1';
import Employeraddressline2, {
  fieldConfig as employerAddressLine2Config,
} from './Employeraddressline2';
import Employeraddressline3, {
  fieldConfig as employerAddressLine3Config,
} from './Employeraddressline3';
import Employeraddressline4, {
  fieldConfig as employerAddressLine4Config,
} from './Employeraddressline4';
import Employercountry, { fieldConfig as employerCountryConfig } from './Employercountry';
import Employerzipcode, { fieldConfig as employerZipCodeConfig } from './Employerzipcode';
import Employmentstatus, { fieldConfig as employmentStatusConfig } from './Employmentstatus';
import Englishproficiency, { fieldConfig as englishProficiencyConfig } from './Englishproficiency';
import Positiondescription, {
  fieldConfig as positionDescriptionConfig,
} from './Positiondescription';
import Natureofbusiness, { fieldConfig as natureOfBusinessConfig } from './Natureofbusiness';
import Occupationclass, { fieldConfig as occupationClassConfig } from './Occupationclass';
import Occupationcode, { fieldConfig as occupationCodeConfig } from './Occupationcode';
import OccupationSubGroup, { fieldConfig as occupationSubGroupConfig } from './OccupationSubGroup';
import Occupationgroup, { fieldConfig as occupationGroupConfig } from './Occupationgroup';
import Position, { fieldConfig as positionConfig } from './Position';
import Nameofbusinessemployer, {
  fieldConfig as nameOfBusinessEmployerConfig,
} from './Nameofbusinessemployer';
import Occupation, { fieldConfig as occupationConfig } from './Occupation';
import OccupationSector, { fieldConfig as occupationSectorConfig } from './OccupationSector';
import Nonincomeearnertype, {
  fieldConfig as nonIncomeEarnerTypeConfig,
} from './Nonincomeearnertype';
import EntityAffiliation, { fieldConfig as EntityAffiliationConfig } from './EntityAffiliation';
import ExactAffiliation1, { fieldConfig as ExactAffiliation1Config } from './ExactAffiliation1';
import ExactAffiliation2, { fieldConfig as ExactAffiliation2Config } from './ExactAffiliation2';
import IndustryAffiliation1, {
  fieldConfig as IndustryAffiliation1Config,
} from './IndustryAffiliation1';
import IndustryAffiliation2, {
  fieldConfig as IndustryAffiliation2Config,
} from './IndustryAffiliation2';
import StaffId, { fieldConfig as StaffIdConfig } from './StaffId';

export const localFieldConfigs = [
  educationCodeConfig,
  englishProficiencyConfig,
  ckaFlagConfig,
  occupationGroupConfig,
  occupationClassConfig,
  occupationCodeConfig,
  occupationSubGroupConfig,
  employmentStatusConfig,
  positionConfig,
  positionDescriptionConfig,
  unitsNameConfig,
  employerCountryConfig,
  employerZipCodeConfig,
  employerAddressLine1Config,
  employerAddressLine2Config,
  employerAddressLine3Config,
  employerAddressLine4Config,
  natureOfBusinessConfig,
  nameOfBusinessEmployerConfig,
  occupationConfig,
  occupationSectorConfig,
  nonIncomeEarnerTypeConfig,
  EntityAffiliationConfig,
  ExactAffiliation1Config,
  ExactAffiliation2Config,
  IndustryAffiliation1Config,
  IndustryAffiliation2Config,
  StaffIdConfig,
];

export default {
  Educationcode,
  Englishproficiency,
  Ckaflag,
  Occupationgroup,
  Occupationclass,
  Occupationcode,
  OccupationSubGroup,
  Employmentstatus,
  Position,
  Positiondescription,
  UnitsName,
  Employercountry,
  Employerzipcode,
  Employeraddressline1,
  Employeraddressline2,
  Employeraddressline3,
  Employeraddressline4,
  Natureofbusiness,
  Nameofbusinessemployer,
  Occupation,
  OccupationSector,
  Nonincomeearnertype,
  EntityAffiliation,
  ExactAffiliation1,
  ExactAffiliation2,
  IndustryAffiliation1,
  IndustryAffiliation2,
  StaffId,
};
