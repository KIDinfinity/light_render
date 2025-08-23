import saveClaimProcessData from './saveClaimProcessData';
import clearClaimProcessData from './clearClaimProcessData';
import saveInsured from './saveInsured';
import saveClaimant from './saveClaimant';
import savePayee from './savePayee';
import addIncidentItem from './addIncidentItem';
import removeIncidentItem from './removeIncidentItem';
import saveIncidentItem from './saveIncidentItem';
import setIncidentItemExpandStatus from './setIncidentItemExpandStatus';
import addTreatmentItem from './addTreatmentItem';
import removeTreatmentItem from './removeTreatmentItem';
import saveTreatmentItem from './saveTreatmentItem';
import addDiagnosisItem from './addDiagnosisItem';
import removeDiagnosisItem from './removeDiagnosisItem';
import saveDiagnosisItem from './saveDiagnosisItem';
import addProcedureItem from './addProcedureItem';
import removeProcedureItem from './removeProcedureItem';
import saveProcedureItem from './saveProcedureItem';
import addInvoiceItem from './addInvoiceItem';
import removeInvoiceItem from './removeInvoiceItem';
import saveInvoiceItem from './saveInvoiceItem';
import addServiceItem from './addServiceItem';
import removeServiceItem from './removeServiceItem';
import saveServiceItem from './saveServiceItem';
import addClaimPayableItem from './addClaimPayableItem';
import removeClaimPayableItem from './removeClaimPayableItem';
import saveClaimPayableItem from './saveClaimPayableItem';
import saveClaimPayableItemCallback from './saveClaimPayableItemCallback';
import saveListPolicy from './saveListPolicy';
import saveLifePayable from './saveLifePayable';
import addTreatmentPayableAddItem from './addTreatmentPayableAddItem';
import removeTreatmentPayableAddItem from './removeTreatmentPayableAddItem';
import saveTreatmentPayableAddItemCallback from './saveTreatmentPayableAddItemCallback';
import saveTreatmentPayableAddItem from './saveTreatmentPayableAddItem';
import removeTreatmentPayableItem from './removeTreatmentPayableItem';
import saveTreatmentPayableItem from './saveTreatmentPayableItem';
import addBenefitPayableItem from './addBenefitPayableItem';
import deleteBenefitPayableItem from './deleteBenefitPayableItem';
import addInvoicePayableItem from './addInvoicePayableItem';
import removeInvoicePayableItem from './removeInvoicePayableItem';
import saveInvoicePayableAddItem from './saveInvoicePayableAddItem';
import saveInvoicePayableAddItemCallback from './saveInvoicePayableAddItemCallback';
import removeInvoicePayableAddItem from './removeInvoicePayableAddItem';
import addServiceItems from './addServiceItems';
import saveBenefitPayableItem from './saveBenefitPayableItem';
import updatePayableAmountCallback from './updatePayableAmountCallback';
import saveBenefitPayableItemCallback from './saveBenefitPayableItemCallback';
import saveClaimProcessDataTemp from './saveClaimProcessDataTemp';
import saveInvoicePayableItem from './saveInvoicePayableItem';
import saveClaimDecision from './saveClaimDecision';
import addMainBenefitItem from './addMainBenefitItem';
import saveMainBenefitItem from './saveMainBenefitItem';
import removeMainBenefitItem from './removeMainBenefitItem';
import saveFlowUpItem from './saveFlowUpItem';
import addIncidentDecisionItem from './addIncidentDecisionItem';
import removeIncidentDecisionItem from './removeIncidentDecisionItem';
import saveIncidentDecisionItem from './saveIncidentDecisionItem';
import savePolicyBenefitItem from './savePolicyBenefitItem';
import savePayOwerList from './savePayOwerList';
import addPayeeInfoItem from './addPayeeInfoItem';
import removePayeeInfoItem from './removePayeeInfoItem';
import addAccidentBenefitPayableItem from './addAccidentBenefitPayableItem';
import saveAccidentBenefitPayableItem from './saveAccidentBenefitPayableItem';
import saveAccidentBenefitPayableItemCallBack from './saveAccidentBenefitPayableItemCallBack';
import removeAccidentBenefitPayableItem from './removeAccidentBenefitPayableItem';
import saveClaimProcessDataCallback from './saveClaimProcessDataCallback';
import saveInvoiceItemCallback from './saveInvoiceItemCallback';
import saveClaimHospitalBillingRecover from './saveClaimHospitalBillingRecover';
import complementClaimPayableCallback from './complementClaimPayableCallback';
import saveClaimBankAccounts from './saveClaimBankAccounts';
import saveServiceItemCallback from './saveServiceItemCallback';
import hideDecisionModal from './hideDecisionModal';
import saveState from './saveState';
import saveSkipOds from './saveSkipOds';
import savePaymentAllocation from './savePaymentAllocation';
import saveNewPayee from './saveNewPayee';
import clearState from './clearState';
import saveOriginClaimEntities from './saveOriginClaimEntities';
import saveHasChangeSection from './saveHasChangeSection';
import save3CiIndicator from './save3CiIndicator';
import saveListPerConfinementLimit from './saveListPerConfinementLimit';
import saveNewPayeeSelection from './saveNewPayeeSelection';
import savePolicySelection from './savePolicySelection';
import resetPolicyOwnerSelection from './resetPolicyOwnerSelection';
import resetNewPayeeSelection from './resetNewPayeeSelection';
import resetNewPolicyPayorSelection from './resetNewPolicyPayorSelection';
import updateSimpleDiseasePayableDaysError from './updateSimpleDiseasePayableDaysError';
import saveShowSurgicalPackage from './saveShowSurgicalPackage';
import saveSurgicalPackageMapList from './saveSurgicalPackageMapList';
import clearAssessmentRemark from './clearAssessmentRemark';

export default {
  saveListPerConfinementLimit,
  saveClaimProcessData,
  clearClaimProcessData,
  saveInsured,
  saveClaimant,
  savePayee,
  addIncidentItem,
  removeIncidentItem,
  saveIncidentItem,
  setIncidentItemExpandStatus,
  addTreatmentItem,
  removeTreatmentItem,
  saveTreatmentItem,
  addDiagnosisItem,
  removeDiagnosisItem,
  saveDiagnosisItem,
  addProcedureItem,
  removeProcedureItem,
  saveProcedureItem,
  addInvoiceItem,
  removeInvoiceItem,
  saveInvoiceItem,
  addServiceItem,
  removeServiceItem,
  saveServiceItem,
  addClaimPayableItem,
  removeClaimPayableItem,
  saveClaimPayableItem,
  saveListPolicy,
  saveLifePayable,
  addTreatmentPayableAddItem,
  removeTreatmentPayableAddItem,
  saveTreatmentPayableAddItemCallback,
  saveTreatmentPayableAddItem,
  removeTreatmentPayableItem,
  saveTreatmentPayableItem,
  addInvoicePayableItem,
  removeInvoicePayableItem,
  saveInvoicePayableAddItem,
  saveInvoicePayableAddItemCallback,
  removeInvoicePayableAddItem,
  addBenefitPayableItem,
  deleteBenefitPayableItem,
  addServiceItems,
  saveBenefitPayableItem,
  updatePayableAmountCallback,
  saveBenefitPayableItemCallback,
  saveClaimProcessDataTemp,
  saveInvoicePayableItem,
  saveClaimDecision,
  saveClaimPayableItemCallback,
  addMainBenefitItem,
  saveMainBenefitItem,
  removeMainBenefitItem,
  saveFlowUpItem,
  addIncidentDecisionItem,
  removeIncidentDecisionItem,
  saveIncidentDecisionItem,
  savePolicyBenefitItem,
  savePayOwerList,
  addPayeeInfoItem,
  removePayeeInfoItem,
  addAccidentBenefitPayableItem,
  saveAccidentBenefitPayableItem,
  saveAccidentBenefitPayableItemCallBack,
  removeAccidentBenefitPayableItem,
  saveClaimProcessDataCallback,
  saveInvoiceItemCallback,
  saveClaimHospitalBillingRecover,
  complementClaimPayableCallback,
  saveClaimBankAccounts,
  saveServiceItemCallback,
  hideDecisionModal,
  saveState,
  saveSkipOds,
  savePaymentAllocation,
  saveNewPayee,
  clearState,
  saveOriginClaimEntities,
  saveHasChangeSection,
  save3CiIndicator,
  saveNewPayeeSelection,
  savePolicySelection,
  resetPolicyOwnerSelection,
  resetNewPolicyPayorSelection,
  resetNewPayeeSelection,
  updateSimpleDiseasePayableDaysError,
  saveShowSurgicalPackage,
  saveSurgicalPackageMapList,
  clearAssessmentRemark,
};
