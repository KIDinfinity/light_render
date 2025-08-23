import getPreApprovalValue from './getPreApprovalValue';
import getClaim from './getClaim';
import validateFields from './validateFields';
import validateFieldsAsync from './validateFieldsAsync';
import queryListPolicy from './queryListPolicy';
import getBeneficiaryTypeByBenefitType from './getBeneficiaryTypeByBenefitType';
import reAssessment from './reAssessment';
import getPolicyInsuredBeneficiaryOwner from './getPolicyInsuredBeneficiaryOwner';
import initBusinessData from './initBusinessData';
import saveDateOfTreatmentItem from './saveDateOfTreatmentItem';
import updatePayableAmount from './updatePayableAmount';
import truthPendingConfirm from './truthPendingConfirm';
import getDataForSubmit from './getDataForSubmit';
import getHospitalizationDate from './getHospitalizationDate';
import saveEntry from './saveEntry';
import saveEntryEnd from './saveEntryEnd';
import judgmentOfCauseOfIncident from './judgmentOfCauseOfIncident';
import delayResetValue from './delayResetValue';
import resetProcedureItemFieldsValue from './resetProcedureItemFieldsValue';
import resetOtherProdureFieldsValue from './resetOtherProdureFieldsValue';
import resetDiagnosisListItemFieldsValue from './resetDiagnosisListItemFieldsValue';
import saveFormData from './saveFormData';
import judgmentOfCauseOfIncidentChain from './judgmentOfCauseOfIncidentChain';
import triggerSnapshot from './triggerSnapshot';
import getPolicyInfo from './getPolicyInfo';
import getDenormalizedData from './getDenormalizedData';

export default {
  getPreApprovalValue,
  getClaim,
  validateFields,
  validateFieldsAsync,
  queryListPolicy,
  getBeneficiaryTypeByBenefitType,
  reAssessment,
  getPolicyInsuredBeneficiaryOwner,
  initBusinessData,
  saveDateOfTreatmentItem,
  updatePayableAmount,
  truthPendingConfirm,
  getDataForSubmit,
  getHospitalizationDate,
  saveEntry,
  saveEntryEnd,
  judgmentOfCauseOfIncident,
  delayResetValue,
  resetProcedureItemFieldsValue,
  resetOtherProdureFieldsValue,
  resetDiagnosisListItemFieldsValue,
  saveFormData,
  judgmentOfCauseOfIncidentChain,
  triggerSnapshot,
  getPolicyInfo,
  getDenormalizedData,
};
