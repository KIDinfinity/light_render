import Newfatca, { fieldConfig as newFatcaConfig } from './Newfatca';

import Ctfid, { fieldConfig as ctfIdConfig } from './Ctfid';

import Ctfexpiredate, { fieldConfig as ctfExpireDateConfig } from './Ctfexpiredate';

import Nationality2, { fieldConfig as nationality2Config } from './Nationality2';

import Nationality3, { fieldConfig as nationality3Config } from './Nationality3';

import Countryworkplace, { fieldConfig as countryWorkPlaceConfig } from './Countryworkplace';

import Provinceworkplace, { fieldConfig as provinceWorkPlaceConfig } from './Provinceworkplace';

import Firstregisterdate, { fieldConfig as firstRegisterDateConfig } from './Firstregisterdate';

import Signdate, { fieldConfig as signDateConfig } from './Signdate';

import Usfatcaperson, { fieldConfig as usFatcaPersonConfig } from './Usfatcaperson';

import Greencardid, { fieldConfig as greenCardIdConfig } from './Greencardid';
import Greencardexpiredate, {
  fieldConfig as greenCardExpireDateConfig,
} from './Greencardexpiredate';

const localFieldConfigs = [
  newFatcaConfig,

  nationality2Config,

  nationality3Config,

  countryWorkPlaceConfig,

  provinceWorkPlaceConfig,

  firstRegisterDateConfig,

  signDateConfig,

  usFatcaPersonConfig,
  greenCardIdConfig,

  greenCardExpireDateConfig,

  ctfIdConfig,

  ctfExpireDateConfig,
];

export default {
  Newfatca,

  Ctfid,

  Ctfexpiredate,

  Nationality2,

  Nationality3,

  Countryworkplace,

  Provinceworkplace,

  Firstregisterdate,

  Signdate,

  Usfatcaperson,

  Greencardid,

  Greencardexpiredate,
};

export { localFieldConfigs };
