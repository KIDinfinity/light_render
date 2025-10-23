
import Country, { localFieldConfig as CountryConfig } from './Country';
import FATCAStatus, { localFieldConfig as FATCAStatusConfig } from './FATCAStatus';
import HasTinNumber, { localFieldConfig as HasTinNumberConfig } from './HasTinNumber';
import TINNo, { localFieldConfig as TINNoConfig } from './TINNo';
import Remark, { localFieldConfig as RemarkConfig } from './Remark';
import ReasonfornoTinnumber, { localFieldConfig as ReasonfornoTinnumberConfig } from './ReasonfornoTinnumber';

export const localFieldConfigs = [
  CountryConfig,
  FATCAStatusConfig,
  HasTinNumberConfig,
  TINNoConfig,
  RemarkConfig,
  ReasonfornoTinnumberConfig,
];

export default {
  Country,
  FATCAStatus,
  HasTinNumber,
  TINNo,
  Remark,
  ReasonfornoTinnumber
};
