import EntityName, { fieldConfig as EntityNameConfig } from './EntityName';
import Companyregistrationnumber, {
  fieldConfig as CompanyregistrationnumberConfig,
} from './Companyregistrationnumber';
import DateofIncorporation, {
  fieldConfig as DateofIncorporationConfig,
} from './DateofIncorporation';

export const localFieldConfigs = [
  EntityNameConfig,
  CompanyregistrationnumberConfig,
  DateofIncorporationConfig,
];

export default {
  EntityName,
  Companyregistrationnumber,
  DateofIncorporation,
};
