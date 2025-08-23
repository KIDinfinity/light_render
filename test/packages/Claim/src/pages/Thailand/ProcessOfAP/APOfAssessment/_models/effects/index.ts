import getClaim from './getClaim';
import getSnapshot from './getSnapshot';
import validateFields from './validateFields';
import getSearchName from './getSearchName';
import checkIsCIByDiagnosisCode from './checkIsCIByDiagnosisCode';
import queryListPolicy from './queryListPolicy';
import getDenormalizedClaimData from './getDenormalizedClaimData';
import initCompareClaimData from './initCompareClaimData';
import getDataForSubmit from './getDataForSubmit';
import saveEntry from './saveEntry';
import saveEntryEnd from './saveEntryEnd';
import saveFormData from './saveFormData';
import retrieve3CiIndicator from './retrieve3CiIndicator';
import getSimpleDiseaseFlagByDiagonosis from './getSimpleDiseaseFlagByDiagonosis';

export default {
  getClaim,
  getSnapshot,
  validateFields,
  getSearchName,
  checkIsCIByDiagnosisCode,
  queryListPolicy,
  getDenormalizedClaimData,
  initCompareClaimData,
  getDataForSubmit,
  saveEntry,
  saveEntryEnd,
  saveFormData,
  retrieve3CiIndicator,
  getSimpleDiseaseFlagByDiagonosis,
};
