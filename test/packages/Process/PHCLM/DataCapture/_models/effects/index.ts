import getClaim from './getClaim';
import validateFields from './validateFields';
import getDataForSubmit from './getDataForSubmit';
import saveEntry from './saveEntry';
import saveEntryEnd from './saveEntryEnd';
import saveFormData from './saveFormData';
import getInsuredInfo from './getInsuredInfo';
import saveSnapshot from './saveSnapshot';
import checkRegisterMcs from 'claim/pages/HongKong/ProcessOfCLM/ManualAssessment/_models/effects/checkRegisterMcs';
import getAgentNoList from './getAgentNoList';
import getPolicyAgentInfo from './getPolicyAgentInfo';
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
import searchBankName from './searchBankName';
import saveBusinessProcess from './saveBusinessProcess';

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
  searchBankName,
  saveBusinessProcess,
};
