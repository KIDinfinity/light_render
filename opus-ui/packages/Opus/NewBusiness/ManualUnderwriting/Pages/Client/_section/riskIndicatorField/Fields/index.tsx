import Alertid, { fieldConfig as alertIdConfig } from './Alertid';

import Crralertid, { fieldConfig as crrAlertIdConfig } from './Crralertid';

import Fecriskmsg, { fieldConfig as fecRiskMsgConfig } from './Fecriskmsg';

import Risklevel, { fieldConfig as riskLevelConfig } from './Risklevel';

export const localFieldConfigs = [
  alertIdConfig,

  crrAlertIdConfig,

  fecRiskMsgConfig,

  riskLevelConfig,
];
export default {
  Alertid,

  Crralertid,

  Fecriskmsg,

  Risklevel,
};
