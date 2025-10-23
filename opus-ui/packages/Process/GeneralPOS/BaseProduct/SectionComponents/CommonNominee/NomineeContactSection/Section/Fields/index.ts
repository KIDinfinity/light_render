import ContactNo, { localFieldConfig as ContactNoConfig } from './ContactNo';
import ContactDisplayName, {
  localFieldConfig as ContactDisplayNameConfig,
} from './ContactDisplayName';
import ContactType, { localFieldConfig as ContactTypeConfig } from './ContactType';
import Mobile, { localFieldConfig as MobileConfig } from './Mobile';
import Residential, { localFieldConfig as ResidentialConfig } from './Residential';
import Business, { localFieldConfig as BusinessConfig } from './Business';

export const localFieldConfigs = [
  ContactNoConfig,
  ContactDisplayNameConfig,
  ContactTypeConfig,
  MobileConfig,
  ResidentialConfig,
  BusinessConfig,
];

export default {
  ContactNo,
  ContactDisplayName,
  ContactType,
  Mobile,
  Residential,
  Business,
};
