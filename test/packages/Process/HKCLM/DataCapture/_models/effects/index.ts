import getClaim from './getClaim';
import validateFields from './validateFields';
import getDataForSubmit from './getDataForSubmit';
import saveEntry from './saveEntry';
import saveEntryEnd from './saveEntryEnd';
import saveFormData from './saveFormData';
import getInsuredInfo from './getInsuredInfo';
import saveSnapshot from './saveSnapshot';
import checkRegisterMcs from './checkRegisterMcs';
import getAgentNoList from './getAgentNoList';
import getPolicyAgentInfo from './getPolicyAgentInfo';
import agentRefresh from './agentRefresh';
import getC360Data from './getC360Data';
import getRepeatableByServiceCode from './getRepeatableByServiceCode';
import getProviderPlaceByMedicalCode from './getProviderPlaceByMedicalCode';
import getCategoryByProcedureCode from './getCategoryByProcedureCode';
import getRelationTreatmentInfo from './getRelationTreatmentInfo';
import refreshSerialTreatment from './refreshSerialTreatment';
import getDiagnosisMisDict from './getDiagnosisMisDict';
import getRoomTypeDict from './getRoomTypeDict';
import getServiceItemFeesListMap from './getServiceItemFeesListMap';
import getSurgeryProcedureByRegion from './getSurgeryProcedureByRegion';
import getDefaultPayment from './getDefaultPayment';
import getLatestOcrStatus from './getLatestOcrStatus';
import getClaimData from './getClaimData';
import checkBusinessNo from './checkBusinessNo';
import getMarkinId from './getMarkinId';
import getHasTimeError from './getHasTimeError';
import idTypeRefresh from './idTypeRefresh';

export default {
  getServiceItemFeesListMap,
  getClaim,
  validateFields,
  getDataForSubmit,
  saveEntry,
  saveEntryEnd,
  saveFormData,
  getInsuredInfo,
  saveSnapshot,
  checkRegisterMcs,
  getAgentNoList,
  getPolicyAgentInfo,
  agentRefresh,
  getC360Data,
  getRepeatableByServiceCode,
  getProviderPlaceByMedicalCode,
  getCategoryByProcedureCode,
  getRelationTreatmentInfo,
  refreshSerialTreatment,
  getDiagnosisMisDict,
  getRoomTypeDict,
  getSurgeryProcedureByRegion,
  getDefaultPayment,
  getLatestOcrStatus,
  getClaimData,
  checkBusinessNo,
  getMarkinId,
  getHasTimeError,
  idTypeRefresh,
};
