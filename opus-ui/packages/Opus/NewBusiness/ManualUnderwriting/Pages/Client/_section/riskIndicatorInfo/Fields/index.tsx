import Pepflag, { fieldConfig as pepFlagConfig } from './Pepflag';
import Pepassoicateflag, { fieldConfig as pepAssoicateFlagConfig } from './Pepassoicateflag';
import Titleofpep, { fieldConfig as titleOfPepConfig } from './Titleofpep';
import Relationshiptopep, { fieldConfig as relationshipToPepConfig } from './Relationshiptopep';
import Bankruptcy, { fieldConfig as bankruptcyConfig } from './Bankruptcy';
import Bankruptcydate, { fieldConfig as bankruptcyDateConfig } from './Bankruptcydate';
import FatcaDropdownValue, { fieldConfig as fatcaDropdownValueConfig } from './FatcaDropdownValue';
import Fatcadate, { fieldConfig as fatcadateConfig } from './Fatcadate';
import Kyc, { fieldConfig as kycConfig } from './Kyc';

export const localFieldConfigs = [
  pepFlagConfig,
  pepAssoicateFlagConfig,
  titleOfPepConfig,
  relationshipToPepConfig,
  bankruptcyConfig,
  bankruptcyDateConfig,
  fatcaDropdownValueConfig,
  fatcadateConfig,
  kycConfig,
];

export default {
  Pepflag,
  Pepassoicateflag,
  Titleofpep,
  Relationshiptopep,
  Bankruptcy,
  Bankruptcydate,
  FatcaDropdownValue,
  Fatcadate,
  Kyc,
};
