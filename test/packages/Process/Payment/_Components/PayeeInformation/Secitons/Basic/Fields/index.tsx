import PayeeType, { localFieldConfig as PayeeTypeConfig } from './PayeeType';
import Corporation, { localFieldConfig as CorporationConfig } from './Corporation';

import FirstName, { localFieldConfig as FirstNameConfig } from './FirstName';
import MiddleName, { localFieldConfig as MiddleNameConfig } from './MiddleName';
import Surname, { localFieldConfig as SurnameConfig } from './Surname';
import SourceBank, { localFieldConfig as SourceBankConfig } from './SourceBank';
import CompanyName, { localFieldConfig as CompanyNameConfig } from './CompanyName';

export const localFieldConfigs = [
  CorporationConfig,
  MiddleNameConfig,
  FirstNameConfig,
  PayeeTypeConfig,
  SurnameConfig,
  SourceBankConfig,
  CompanyNameConfig,
];

export default {
  Corporation,
  MiddleName,
  FirstName,
  PayeeType,
  Surname,
  SourceBank,
  CompanyName,
};
