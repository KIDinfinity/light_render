import AddressLine1, { localFieldConfig as AddressLine1Config } from './AddressLine1';
import AddressLine2, { localFieldConfig as AddressLine2Config } from './AddressLine2';
import AddressLine3, { localFieldConfig as AddressLine3Config } from './AddressLine3';
import AddressLine4, { localFieldConfig as AddressLine4Config } from './AddressLine4';
import Claimant, { localFieldConfig as ClaimantConfig } from './Claimant';
import ClaimNumber, { localFieldConfig as ClaimNumberConfig } from './ClaimNumber';
import EventDate, { localFieldConfig as EventDateConfig } from './EventDate';
import Postcode, { localFieldConfig as PostcodeConfig } from './Postcode';
import State, { localFieldConfig as StateConfig } from './State';
import Town, { localFieldConfig as TownConfig } from './Town';

export const localFieldConfigs = [
  AddressLine1Config,
  AddressLine2Config,
  AddressLine3Config,
  AddressLine4Config,
  ClaimantConfig,
  ClaimNumberConfig,
  EventDateConfig,
  PostcodeConfig,
  StateConfig,
  TownConfig,
];

export default {
  AddressLine1,
  AddressLine2,
  AddressLine3,
  AddressLine4,
  Claimant,
  ClaimNumber,
  EventDate,
  Postcode,
  State,
  Town,
};
