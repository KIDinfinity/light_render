import Pepflag, { fieldConfig as pepFlagConfig } from './Pepflag';
import Pepassoicateflag, { fieldConfig as pepAssoicateFlagConfig } from './Pepassoicateflag';
import Titleofpep, { fieldConfig as titleOfPepConfig } from './Titleofpep';
import Relationshiptopep, { fieldConfig as relationshipToPepConfig } from './Relationshiptopep';
import Bankruptcy, { fieldConfig as bankruptcyConfig } from './Bankruptcy';
import Bankruptcydate, { fieldConfig as bankruptcyDateConfig } from './Bankruptcydate';
import FatcaDropdownValue, { fieldConfig as fatcaDropdownValueConfig } from './FatcaDropdownValue';
import Fatcadate, { fieldConfig as fatcadateConfig } from './Fatcadate';
import Kyc, { fieldConfig as kycConfig } from './Kyc';
import KycRemark, { fieldConfig as KycRemarkConfig } from './KycRemark';
import Fecriskmsg, { fieldConfig as FecriskmsgConfig } from './Fecriskmsg';
import Alertid, { fieldConfig as alertIdConfig } from './Alertid';
import Crralertid, { fieldConfig as crrAlertIdConfig } from './Crralertid';
import Risklevel, { fieldConfig as riskLevelConfig } from './Risklevel';
import Riskscore, { fieldConfig as riskScoreConfig } from './Riskscore';
import AmlRiskscore, { fieldConfig as amlRiskScoreConfig } from './AmlRiskscore';
import Fecriskmsgcrr, { fieldConfig as fecriskmsgcrrConfig } from './Fecriskmsgcrr';

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
  KycRemarkConfig,
  FecriskmsgConfig,
  alertIdConfig,
  crrAlertIdConfig,
  riskLevelConfig,
  riskScoreConfig,
  amlRiskScoreConfig,
  fecriskmsgcrrConfig,
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
  KycRemark,
  Fecriskmsg,
  Alertid,
  Crralertid,
  Risklevel,
  Riskscore,
  AmlRiskscore,
  Fecriskmsgcrr,
};
