import getClaim from './getCaseDetails';
import getSnapshot from './getSnapshot';
import validateFields from './validateFields';
import queryListPolicy from './queryListPolicy';
import checkIsCIByDiagnosisCode from './checkIsCIByDiagnosisCode';
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
import decisionMapping from './decisionMapping';
import initCompareClaimData from './initCompareClaimData';
import getPolicyList from './getPolicyList';
import getPopUpInfo from './getPopUpInfo';
import getPolicyAgent from './getPolicyAgent';
import getRelationTreatmentInfo from './getRelationTreatmentInfo';
import validatorCase from './validatorCase';

import getSerialClaimMap from './getSerialClaimMap';
import fetchClientInfoList from './fetchClientInfoList';
import BOchangeHosNo from './BOchangeHosNo';
import BOclaimReversal from './BOclaimReversal';
import getRefundAmount from './getRefundAmount';
import getLifeJClaimId from './getLifeJClaimId';
import getLifeJRefundInfo from './getLifeJRefundInfo';
import validatePaymentAllocation from './validatePaymentAllocation';
import saveFormDataV2 from './saveFormDataV2';
import getCaseDetails from './getCaseDetails';
import validatePopupFields from './validatePopupFields';
import getDiagnosisMisDict from './getDiagnosisMisDict';
import setIntegrationData from './setIntegrationData';
import getAccountHolderId from './getAccountHolderId';
import saveSnapshot from './saveSnapshot';
import syncFieldData from './syncFieldData';
import getprocedureList from './getprocedureList';
import { paymentEffects } from 'process/Payment/_models';
import getotherProcedureList from './getotherProcedureList';

import { getDrugsDetailList } from '../../../Components/Procedure/AntiCancerAndHormone/_models/effects';

export default {
  getotherProcedureList,
  getDiagnosisMisDict,
  getClaim,
  getSnapshot,
  validateFields,
  queryListPolicy,
  checkIsCIByDiagnosisCode,
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
  decisionMapping,
  initCompareClaimData,
  getPolicyList,
  getPopUpInfo,
  getPolicyAgent,
  getRelationTreatmentInfo,
  validatorCase,
  getSerialClaimMap,
  BOchangeHosNo,
  BOclaimReversal,
  getRefundAmount,
  getLifeJClaimId,
  getLifeJRefundInfo,
  validatePaymentAllocation,
  saveFormDataV2,
  getCaseDetails,
  fetchClientInfoList,
  validatePopupFields,
  setIntegrationData,
  getAccountHolderId,
  saveSnapshot,
  syncFieldData,
  getprocedureList,
  ...paymentEffects,
  getDrugsDetailList,
};
