import getClaim from './getClaim';
import getSnapshot from './getSnapshot';
import validateFields from './validateFields';
import queryListPolicy from './queryListPolicy';
import checkIsCIByDiagnosisCode from './checkIsCIByDiagnosisCode';
import updatePayableAmount from './updatePayableAmount';
import getDataForSubmit from './getDataForSubmit';
import saveEntry from './saveEntry';
import saveEntryEnd from './saveEntryEnd';
import saveFormData from './saveFormData';
import updateMandatoryDoc from './updateMandatoryDoc';
import getExchangeRateForPolicy from './getExchangeRateForPolicy';
import getExchangeRateForInvoice from './getExchangeRateForInvoice';
import getExchangeRateForExchangeDate from './getExchangeRateForExchangeDate';
import getDenormalizedData from './getDenormalizedData';
import getExchangeRateForInvoiceCurrencyPayout from './getExchangeRateForInvoiceCurrencyPayout';
import refreshNameScreening from './refreshNameScreening';
import fcrmNameScreening from './fcrmNameScreening';
import registerHkClaimCase from './registerHkClaimCase';
import getPolicyOwnerList from './getPolicyOwnerList';
import checkRegisterMcs from './checkRegisterMcs';
import getAgentNoList from './getAgentNoList';
import getPolicyAgentInfo from './getPolicyAgentInfo';
import agentRefresh from './agentRefresh';
import getRepeatableByServiceCode from './getRepeatableByServiceCode';
import getProviderPlaceByMedicalCode from './getProviderPlaceByMedicalCode';
import getCategoryByProcedureCode from './getCategoryByProcedureCode';
import getClaimData from './getClaimData';
import getRelationTreatmentInfo from './getRelationTreatmentInfo';
import refreshSerialTreatment from './refreshSerialTreatment';
import getDiagnosisMisDict from './getDiagnosisMisDict';
import initCompareClaimData from './initCompareClaimData';
import getPopPayableExchangeRate from './getPopPayableExchangeRate';
import retrieve3CiIndicator from './retrieve3CiIndicator';

export default {
  getClaim,
  getSnapshot,
  validateFields,
  queryListPolicy,
  checkIsCIByDiagnosisCode,
  updatePayableAmount,
  getDataForSubmit,
  saveEntry,
  saveEntryEnd,
  saveFormData,
  updateMandatoryDoc,
  getExchangeRateForPolicy,
  getExchangeRateForInvoice,
  getExchangeRateForExchangeDate,
  getDenormalizedData,
  getExchangeRateForInvoiceCurrencyPayout,
  refreshNameScreening,
  fcrmNameScreening,
  registerHkClaimCase,
  getPolicyOwnerList,
  checkRegisterMcs,
  getAgentNoList,
  getPolicyAgentInfo,
  agentRefresh,
  getRepeatableByServiceCode,
  getProviderPlaceByMedicalCode,
  getCategoryByProcedureCode,
  getClaimData,
  getRelationTreatmentInfo,
  refreshSerialTreatment,
  getDiagnosisMisDict,
  initCompareClaimData,
  getPopPayableExchangeRate,
  retrieve3CiIndicator,
};
