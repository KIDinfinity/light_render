import dedupCheckIdentify from './dedupCheckIdentify';
import dedupCheckIdentifyDouble from './dedupCheckIdentifyDouble';
import ewsGetBusinessNo from './ewsGetBusinessNo';
import ewsGetCaseDetail from './ewsGetCaseDetail';
import ewsGetVersionList from './ewsGetVersionList';
import getAddress from './getAddress';
import getAddressByCode from './getAddressByCode';
import getAge from './getAge';
import getAllBank from './getAllBank';
import getAllBranchCodeByBankCode from './getAllBranchCodeByBankCode';
import getAllFundConfigList from './getAllFundConfigList';
import getAllFunds from './getAllFunds';
import getAllPrice from './getAllPrice';
import getCheckReassessButtonStatus from './getCheckReassessButtonStatus';
import getDataForSubmit from './getDataForSubmit';
import getDedupCheckKey from './getDedupCheckKey';
import getIndicator from './getIndicator';
import getLimitDataByType from './getLimitDataByType';
import getLiteDataAsyncLoop from './getLiteDataAsyncLoop';
import getPersonName from './getPersonName';
import getPolicyInfoAsyncLoop from './getPolicyInfoAsyncLoop';
import getPolicyPmMode from './getPolicyPmMode';
import getReinstatementExList from './getReinstatementExList';
import getSrvCase from './getSrvCase';
import getTimesOfReplacement from './getTimesOfReplacement';
import getTransactionTypeCodeMap from './getTransactionTypeCodeMap';
import getUIConfig from './getUIConfig';
import liteDataRemoteAsyncEnd from './liteDataRemoteAsyncEnd';
import liteDataRemoteAsyncStart from './liteDataRemoteAsyncStart';
import policyInfoRemote from './policyInfoRemote';
import policyInfoRemoteAsyncEnd from './policyInfoRemoteAsyncEnd';
import policyInfoRemoteAsyncStart from './policyInfoRemoteAsyncStart';
import queryRegionDefaultCurrency from './queryRegionDefaultCurrency';
import reAssess from './reAssess';
import refreshDate from './refreshDate';
import refreshEffectiveDate from './refreshEffectiveDate';
import saveEntry from './saveEntry';
import saveEntryEnd from './saveEntryEnd';
import saveFormData from './saveFormData';
import saveSnapshot from './saveSnapshot';
import validateFields from './validateFields';
import validateFieldsBefore from './validateFieldsBefore';
import getLoanQuotation from './getLoanQuotation';
import getAddNewRidersConfigList from './getAddNewRidersConfigList';
import getPlanProductConfig from './getPlanProductConfig';
import skipValidate from './skipValidate';
import getGlobalConfig from './getGlobalConfig';

export default {
  validateFields,
  getDataForSubmit,
  saveEntry,
  saveEntryEnd,
  saveFormData,
  saveSnapshot,
  policyInfoRemote,
  getTransactionTypeCodeMap,
  getSrvCase,
  getUIConfig,
  getAllFundConfigList,
  getAllFunds,
  reAssess,
  getPersonName,
  getAllBank,
  getAllBranchCodeByBankCode,
  getAllPrice,
  validateFieldsBefore,
  refreshEffectiveDate,
  ewsGetVersionList,
  ewsGetBusinessNo,
  ewsGetCaseDetail,
  getIndicator,
  getAge,
  getLimitDataByType,
  getAddress,
  getAddressByCode,
  queryRegionDefaultCurrency,
  refreshDate,
  getPolicyInfoAsyncLoop,
  policyInfoRemoteAsyncStart,
  policyInfoRemoteAsyncEnd,
  getTimesOfReplacement,
  getCheckReassessButtonStatus,
  getLiteDataAsyncLoop,
  liteDataRemoteAsyncStart,
  liteDataRemoteAsyncEnd,
  getReinstatementExList,
  dedupCheckIdentify,
  getPolicyPmMode,
  getDedupCheckKey,
  dedupCheckIdentifyDouble,
  getLoanQuotation,
  getAddNewRidersConfigList,
  getPlanProductConfig,
  skipValidate,
  getGlobalConfig,
};
