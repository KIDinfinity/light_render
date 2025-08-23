import AddressOfBusinessEmployer, {
  localFieldConfig as AddressOfBusinessEmployerConfig,
} from './AddressOfBusinessEmployer';
import CompanyRegistrationNumber, {
  localFieldConfig as CompanyRegistrationNumberConfig,
} from './CompanyRegistrationNumber';
import Email, { localFieldConfig as EmailConfig } from './Email';
import ExactDuty, { localFieldConfig as ExactDutyConfig } from './ExactDuty';
import NameOfBusinessEmployer, {
  localFieldConfig as NameOfBusinessEmployerConfig,
} from './NameOfBusinessEmployer';
import NatureOfBusiness, { localFieldConfig as NatureOfBusinessConfig } from './NatureOfBusiness';
import Occupation, { localFieldConfig as OccupationConfig } from './Occupation';

export const localFieldConfigs = [
  AddressOfBusinessEmployerConfig,
  CompanyRegistrationNumberConfig,
  EmailConfig,
  ExactDutyConfig,
  NameOfBusinessEmployerConfig,
  NatureOfBusinessConfig,
  OccupationConfig,
];

export default {
  AddressOfBusinessEmployer,
  CompanyRegistrationNumber,
  Email,
  ExactDuty,
  NameOfBusinessEmployer,
  NatureOfBusiness,
  Occupation,
};
