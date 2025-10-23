import AnnualIncome, { fieldConfig as AnnualIncomeConfig } from './AnnualIncome';
import JobDescription, { fieldConfig as JobDescriptionConfig } from './JobDescription';
import NatureOfBusiness, { fieldConfig as NatureOfBusinessConfig } from './NatureOfBusiness';
import OtherJobDescription, {
  fieldConfig as OtherJobDescriptionConfig,
} from './OtherJobDescription';
import OtherNatureOfBusiness, {
  fieldConfig as OtherNatureOfBusinessConfig,
} from './OtherNatureOfBusiness';
import OtherPosition, { fieldConfig as OtherPositionConfig } from './Otherposition';
import Position, { fieldConfig as PositionConfig } from './Position';
import OccupationClass, { fieldConfig as OccupationClassConfig } from './OccupationClass';
import OccupationName, { fieldConfig as OccupationNameConfig } from './OccupationName';
import OtherAnnualIncome, { fieldConfig as OtherAnnualIncomeConfig } from './OtherAnnualIncome';
import OtherOccupation, { fieldConfig as OtherOccupationConfig } from './OtherOccupation';
import OtherOccupationClass, {
  fieldConfig as OtherOccupationClassConfig,
} from './OtherOccupationClass';

export const localFieldConfigs = [
  AnnualIncomeConfig,
  JobDescriptionConfig,
  NatureOfBusinessConfig,
  OtherJobDescriptionConfig,
  OtherNatureOfBusinessConfig,
  OtherPositionConfig,
  PositionConfig,
  OccupationClassConfig,
  OccupationNameConfig,
  OtherAnnualIncomeConfig,
  OtherOccupationConfig,
  OtherOccupationClassConfig,
];

export default {
  AnnualIncome,
  JobDescription,
  NatureOfBusiness,
  OtherJobDescription,
  OtherNatureOfBusiness,
  OtherPosition,
  Position,
  OccupationClass,
  OccupationName,
  OtherAnnualIncome,
  OtherOccupation,
  OtherOccupationClass,
};
