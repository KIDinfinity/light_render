import saveClaimProcessData from './saveClaimProcessData';
import clearClaimProcessData from './clearClaimProcessData';
import saveInsured from './saveInsured';
import saveClaimant from './saveClaimant';
import savePayee from './savePayee';
import saveIncidentItem from './saveIncidentItem';
import saveTreatmentItem from './saveTreatmentItem';
import addDiagnosisItem from './addDiagnosisItem';
import removeDiagnosisItem from './removeDiagnosisItem';
import saveDiagnosisItem from './saveDiagnosisItem';
import addProcedureItem from './addProcedureItem';
import removeProcedureItem from './removeProcedureItem';
import saveProcedureItem from './saveProcedureItem';
import addInvoiceItem from './addInvoiceItem';
import saveInvoiceItem from './saveInvoiceItem';
import serviceUpdate from './serviceUpdate';
import addClaimPayableItem from './addClaimPayableItem';
import removeClaimPayableItem from './removeClaimPayableItem';
import saveClaimPayableItem from './saveClaimPayableItem';
import saveListPolicy from './saveListPolicy';
import saveLifePayable from './saveLifePayable';
import removeTreatmentPayableItem from './removeTreatmentPayableItem';
import saveTreatmentPayableItem from './saveTreatmentPayableItem';
import addTreatmentPayableItem from './addTreatmentPayableItem';
import removeTreatmentPayableAddItem from './removeTreatmentPayableAddItem';
import saveTreatmentPayableAddItem from './saveTreatmentPayableAddItem';
import saveTreatmentPayableAddItemCallback from './saveTreatmentPayableAddItemCallback';
import saveInvoicePayableAddItem from './saveInvoicePayableAddItem';
import removeInvoicePayableItem from './removeInvoicePayableItem';
import saveInvoicePayableAddItemCallback from './saveInvoicePayableAddItemCallback';
import removeServicePayableItem from './removeServicePayableItem';
import addServicePayableItem from './addServicePayableItem';
import removeServicePayableAddItem from './removeServicePayableAddItem';
import saveServicePayableAddItem from './saveServicePayableAddItem';
import saveServicePayableAddItemCallback from './saveServicePayableAddItemCallback';
import saveServicePayableItem from './saveServicePayableItem';
import updatePayableAmountCallback from './updatePayableAmountCallback';
import saveClaimDecision from './saveClaimDecision';
import addPayeeItem from './addPayeeItem';
import removePayeeItem from './removePayeeItem';
import savePayeeItem from './savePayeeItem';
import addBeneficiaryItem from './addBeneficiaryItem';
import removeBeneficiaryItem from './removeBeneficiaryItem';
import saveBeneficiaryItem from './saveBeneficiaryItem';
import hideDecisionModalok from './hideDecisionModalok';
import saveState from './saveState';
import hideCurrencyModal from './hideCurrencyModal';
import saveExchangeRate from './saveExchangeRate';
import saveInvoiceCurrency from './saveInvoiceCurrency';
import saveClaimPayablePolicyCurrency from './saveClaimPayablePolicyCurrency';
import saveInvoicePayablePolicyCurrency from './saveInvoicePayablePolicyCurrency';
import hideExchangeDateModal from './hideExchangeDateModal';
import savePaymentAllocation from './savePaymentAllocation';
import saveExchangeRateForInvoice from './saveExchangeRateForInvoice';
import saveExchangeRateForInvoiceCurrencyPayout from './saveExchangeRateForInvoiceCurrencyPayout';
import saveInvoiceItemRateCurrencyPayout from './saveInvoiceItemRateCurrencyPayout';
import saveNameScreening from './saveNameScreening';
import savePolicyOwnerList from './savePolicyOwnerList';
import saveRegisterMcs from './saveRegisterMcs';
import updateAssessDecision from './updateAssessDecision';
import savePolicyAgentInfo from './savePolicyAgentInfo';
import saveRefreshStatus from './saveRefreshStatus';
import savePolicyAgent from './savePolicyAgent';
import savePartyListInfo from './savePartyListInfo';
import saveOtherProcedureItem from './saveOtherProcedureItem';
import addProcedurePayableItemAdd from './addProcedurePayableItemAdd';
import removeProcedurePayableItemAdd from './removeProcedurePayableItemAdd';
import saveProcedurePayableItemAdd from './saveProcedurePayableItemAdd';
import addOtherProcedurePayableItemAdd from './addOtherProcedurePayableItemAdd';
import removeOtherProcedurePayableItemAdd from './removeOtherProcedurePayableItemAdd';
import saveOtherProcedurePayableItemAdd from './saveOtherProcedurePayableItemAdd';
import removeOtherProcedurePayableItem from './removeOtherProcedurePayableItem';
import removeProcedurePayableItem from './removeProcedurePayableItem';
import saveOtherProcedurePayableItem from './saveOtherProcedurePayableItem';
import saveProcedurePayableItem from './saveProcedurePayableItem';
import saveProcedurePayableItemAddCallback from './saveProcedurePayableItemAddCallback';
import saveOtherProcedurePayableItemAddCallback from './saveOtherProcedurePayableItemAddCallback';
import saveClaimPayableListGroupResult from './saveClaimPayableListGroupResult';
import saveDecisionMapping from './saveDecisionMapping';
import updateSubmissionDate from './updateSubmissionDate';
import updateInformationPerfectionDate from './updateInformationPerfectionDate';
import update from './update';
import klipCaseInfoAdd from './klipCaseInfoAdd';
import klipCaseInfoDelete from './klipCaseInfoDelete';
import klipCaseInfoUpdate from './klipCaseInfoUpdate';
import policyListUpdate from './policyListUpdate';
import addOpTreatmentList from './addOpTreatmentList';
import saveOpTreatmentList from './saveOpTreatmentList';
import saveClaimPayableListGroupResultError from './saveClaimPayableListGroupResultError';
import updateClaimOpTreatmentList from './updateClaimOpTreatmentList';
import updateOpTreatmentList from './updateOpTreatmentList';
import treatmentUpdate from './treatmentUpdate';
import originClaimProcessData from './originClaimProcessData';
import addOPTreatmentPayableItemAdd from './addOPTreatmentPayableItemAdd';
import saveOPTreatmentPayableItem from './saveOPTreatmentPayableItem';
import removeOPTreatmentPayableItem from './removeOPTreatmentPayableItem';
import saveSerialTreatment from './saveSerialTreatment';
import saveSelectionTreatment from './saveSelectionTreatment';
import saveFurtherClaimRelationshipId from './saveFurtherClaimRelationshipId';
import addTreatments from './addTreatments';
import treatmentDelete from './treatmentDelete';
import otherProcedureAdd from './otherProcedureAdd';
import otherProcedureDelete from './otherProcedureDelete';
import otherProcedurePayableReasonDateGroupAdd from './otherProcedurePayableReasonDateGroupAdd';
import otherProcedurePayableReasonDateGroupRemove from './otherProcedurePayableReasonDateGroupRemove';
import otherProcedurePayableReasonDateUpdate from './otherProcedurePayableReasonDateUpdate';
import saveTaskDetail from './saveTaskDetail';

import saveSerialClaimAllList from './saveSerialClaimAllList';
import saveSerialClaimFilterList from './saveSerialClaimFilterList';
import saveSerialClaimList from './saveSerialClaimList';
import saveSerialClaimPayableData from './saveSerialClaimPayableData';
import saveSerialClaimSearchParams from './saveSerialClaimSearchParams';
import saveSerialClaimSelects from './saveSerialClaimSelects';
import saveSerialClaimShow from './saveSerialClaimShow';
import saveSerialClaimHidden from './saveSerialClaimHidden';
import saveSerialClaimTreatmentPayableDetail from './saveSerialClaimTreatmentPayableDetail';
import saveSerialTreatmentPayableList from './saveSerialTreatmentPayableList';
import addAdjOpTreatmentPayableItem from './addAdjOpTreatmentPayableItem';
import saveAdjOpTreatmentPayable from './saveAdjOpTreatmentPayable';
import saveAdjOpTreatmentPayableItem from './saveAdjOpTreatmentPayableItem';

import opTreatmentListAdd from './opTreatmentListAdd';
import opTreatmentListDelete from './opTreatmentListDelete';
import opTreatmentListDiagnosisListAdd from './opTreatmentListDiagnosisListAdd';
import opTreatmentListDiagnosisListUpdate from './opTreatmentListDiagnosisListUpdate';
import opTreatmentListDiagnosisListDelete from './opTreatmentListDiagnosisListDelete';
import opTreatmentListUpdateDiagnosisList from './opTreatmentListUpdateDiagnosisList';
import therapeuticDateListAdd from './therapeuticDateListAdd';
import therapeuticDateListDelete from './therapeuticDateListDelete';
import therapeuticDrugListUpdate from './therapeuticDrugListUpdate';
import therapeuticMonthListAdd from './therapeuticMonthListAdd';
import therapeuticMonthListDelete from './therapeuticMonthListDelete';

import removeClaimIncidentPayableItem from './removeClaimIncidentPayableItem';
import saveClaimIncidentPayableItem from './saveClaimIncidentPayableItem';
import removeTempClaimPayable from './removeTempClaimPayable';
import saveAdjHPTreatmentPayableItem from './saveAdjHPTreatmentPayableItem';
import saveAdjHPChangeNo from './saveAdjHPChangeNo';
import showDrugsDetailList from './showDrugsDetailList';
import updateDrugsDetailList from './updateDrugsDetailList';
import saveSearchListParams from './saveSearchListParams';
import saveDrugsDetailList from './saveDrugsDetailList';
import updateDrugsListStore from './updateDrugsListStore';
import saveRefundAmount from './saveRefundAmount';
import saveLifeJClaimId from './saveLifeJClaimId';
import saveLifeJRefundInfo from './saveLifeJRefundInfo';
import removeServiceItem from './removeServiceItem';
export default {
  otherProcedureDelete,
  otherProcedureAdd,
  addTreatments,
  saveFurtherClaimRelationshipId,
  saveSelectionTreatment,
  removeOPTreatmentPayableItem,
  saveOPTreatmentPayableItem,
  addOPTreatmentPayableItemAdd,
  updateOpTreatmentList,
  updateClaimOpTreatmentList,
  saveOpTreatmentList,
  addOpTreatmentList,
  saveClaimPayableListGroupResultError,
  saveClaimProcessData,
  clearClaimProcessData,
  saveInsured,
  saveClaimant,
  savePayee,
  saveIncidentItem,
  saveTreatmentItem,
  addDiagnosisItem,
  removeDiagnosisItem,
  saveDiagnosisItem,
  addProcedureItem,
  removeProcedureItem,
  saveProcedureItem,
  addInvoiceItem,
  saveInvoiceItem,
  serviceUpdate,
  addClaimPayableItem,
  removeClaimPayableItem,
  saveClaimPayableItem,
  saveListPolicy,
  saveLifePayable,
  removeTreatmentPayableItem,
  saveTreatmentPayableItem,
  addTreatmentPayableItem,
  removeTreatmentPayableAddItem,
  saveTreatmentPayableAddItem,
  saveTreatmentPayableAddItemCallback,
  saveInvoicePayableAddItem,
  removeInvoicePayableItem,
  saveInvoicePayableAddItemCallback,
  removeServicePayableItem,
  addServicePayableItem,
  removeServicePayableAddItem,
  saveServicePayableAddItem,
  saveServicePayableAddItemCallback,
  saveServicePayableItem,
  updatePayableAmountCallback,
  saveClaimDecision,
  addPayeeItem,
  removePayeeItem,
  savePayeeItem,
  addBeneficiaryItem,
  removeBeneficiaryItem,
  saveBeneficiaryItem,
  hideDecisionModalok,
  saveState,
  hideCurrencyModal,
  saveExchangeRate,
  saveInvoiceCurrency,
  saveClaimPayablePolicyCurrency,
  saveInvoicePayablePolicyCurrency,
  hideExchangeDateModal,
  savePaymentAllocation,
  saveExchangeRateForInvoiceCurrencyPayout,
  saveInvoiceItemRateCurrencyPayout,
  saveExchangeRateForInvoice,
  saveNameScreening,
  savePolicyOwnerList,
  saveRegisterMcs,
  updateAssessDecision,
  savePolicyAgentInfo,
  saveRefreshStatus,
  savePolicyAgent,
  savePartyListInfo,
  saveOtherProcedureItem,
  addProcedurePayableItemAdd,
  removeProcedurePayableItemAdd,
  addOtherProcedurePayableItemAdd,
  removeOtherProcedurePayableItemAdd,
  removeOtherProcedurePayableItem,
  removeProcedurePayableItem,
  saveOtherProcedurePayableItem,
  saveProcedurePayableItem,
  saveOtherProcedurePayableItemAdd,
  saveProcedurePayableItemAdd,
  saveProcedurePayableItemAddCallback,
  saveOtherProcedurePayableItemAddCallback,
  saveClaimPayableListGroupResult,
  saveDecisionMapping,
  updateSubmissionDate,
  updateInformationPerfectionDate,
  update,
  klipCaseInfoAdd,
  klipCaseInfoDelete,
  klipCaseInfoUpdate,
  policyListUpdate,
  treatmentUpdate,
  originClaimProcessData,
  saveSerialTreatment,
  treatmentDelete,
  otherProcedurePayableReasonDateGroupAdd,
  otherProcedurePayableReasonDateGroupRemove,
  otherProcedurePayableReasonDateUpdate,
  saveTaskDetail,

  saveSerialClaimAllList,
  saveSerialClaimFilterList,
  saveSerialClaimList,
  saveSerialClaimPayableData,
  saveSerialClaimSearchParams,
  saveSerialClaimSelects,
  saveSerialClaimShow,
  saveSerialClaimHidden,
  saveSerialClaimTreatmentPayableDetail,
  saveSerialTreatmentPayableList,
  addAdjOpTreatmentPayableItem,
  saveAdjOpTreatmentPayable,
  saveAdjOpTreatmentPayableItem,

  opTreatmentListAdd,
  opTreatmentListDelete,
  opTreatmentListDiagnosisListAdd,
  opTreatmentListDiagnosisListUpdate,
  opTreatmentListDiagnosisListDelete,
  opTreatmentListUpdateDiagnosisList,

  removeClaimIncidentPayableItem,
  saveClaimIncidentPayableItem,
  removeTempClaimPayable,
  therapeuticDateListAdd,
  therapeuticDateListDelete,
  therapeuticDrugListUpdate,
  therapeuticMonthListAdd,
  therapeuticMonthListDelete,
  saveAdjHPTreatmentPayableItem,
  saveAdjHPChangeNo,
  saveDrugsDetailList,
  saveSearchListParams,
  updateDrugsDetailList,
  showDrugsDetailList,
  updateDrugsListStore,
  saveRefundAmount,
  saveLifeJClaimId,
  saveLifeJRefundInfo,
  removeServiceItem,
};
