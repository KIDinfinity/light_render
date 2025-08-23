import getEnvProfile from './getEnvProfile';
import getRegionCodeBeforeLogin from './getRegionCodeBeforeLogin';
import getDictionaryMap from './getDictionaryMap';
import queryRegionCurrency from './queryRegionCurrency';
import encryptURL from './encryptURL';
import loginThSSO from './loginThSSO';
import loginHkSSO from './loginHkSSO';
import findByUserId from './findByUserId';
import listPermissionMenu from './listPermissionMenu';
import listDisplayConfig from './listDisplayConfig';
import listAllConfigurablePageInfo from './listAllConfigurablePageInfo';
import countTaskByStatus from './countTaskByStatus';
import priorities from './priorities';
import listDashboards from './listDashboards';

export default [
  getDictionaryMap,
  getEnvProfile,
  getRegionCodeBeforeLogin,
  queryRegionCurrency,
  encryptURL,
  loginThSSO,
  loginHkSSO,
  findByUserId,
  listPermissionMenu,
  listDisplayConfig,
  listAllConfigurablePageInfo,
  countTaskByStatus,
  priorities,
  listDashboards,
]
