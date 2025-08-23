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
import saveInvoiceItem from './saveInvoiceItem';
import addServiceItem from './addServiceItem';
import removeServiceItem from './removeServiceItem';
import saveServiceItem from './saveServiceItem';
import addClaimPayableItem from './addClaimPayableItem';
import removeClaimPayableItem from './removeClaimPayableItem';
import saveClaimPayableItem from './saveClaimPayableItem';
import saveListPolicy from './saveListPolicy';
import removeTreatmentPayableItem from './removeTreatmentPayableItem';
import saveTreatmentPayableAddItem from './saveTreatmentPayableAddItem';
import saveTreatmentPayableAddItemCallback from './saveTreatmentPayableAddItemCallback';
import saveInvoicePayableAddItem from './saveInvoicePayableAddItem';
import saveInvoicePayableAddItemCallback from './saveInvoicePayableAddItemCallback';
import removeServicePayableItem from './removeServicePayableItem';
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
import accidentBenefitPayableItemAdd from './accidentBenefitPayableItemAdd';
import accidentBenefitPayableItemDelete from './accidentBenefitPayableItemDelete';
import accidentBenefitPayableItemUpdate from './accidentBenefitPayableItemUpdate';
import originClaimProcessData from './originClaimProcessData';
import registerForm from './registerForm';
import unRegisterForm from './unRegisterForm';
import addPayableItem from './addPayableItem';
import registerExpand from './registerExpand';
import updatePolicyBackgrounds from './updatePolicyBackgrounds';
import benefitItemGroupUpdate from './benefitItemGroupUpdate';
import benefitItemGroupDelete from './benefitItemGroupDelete';
import benefitTypeGroupUpdate from './benefitTypeGroupUpdate';
import benefitItemRecover from './benefitItemRecover';
import saveIntegrationError from './saveIntegrationError';
import setAssessmentDecisionError from './setAssessmentDecisionError';
import setServiceItemUnitError from './setServiceItemUnitError';
import saveSerialTreatment from './saveSerialTreatment';
import saveSelectionTreatment from './saveSelectionTreatment';
import saveTreatmentRelation from './saveTreatmentRelation';
import saveDiagnosisMisDict from './saveDiagnosisMisDict';
import removeICUItem from './removeICUItem';
import packDataForSubmit from './packDataForSubmit';
import calcuPopPayableTotalVal from './calcuPopPayableTotalVal';
import updatePopPayable from './updatePopPayable';
import setExpandState from './setExpandState';
import removeMainBenefitItem from './removeMainBenefitItem';
import saveMainBenefitItem from './saveMainBenefitItem';
import addMainBenefitItem from './addMainBenefitItem';
import saveSummaryTreatmentPayable from './saveSummaryTreatmentPayable';
import benefitTypeGroupDelete from './benefitTypeGroupDelete';
import link from './link';
import isClickRegisterToggle from './isClickRegisterToggle';
import save3CiIndicator from './save3CiIndicator';

// Add Payable
import popUpPableDelete from './popUpPableDelete';
import popUpPableInit from './popUpPableInit';
import popUpPableUpdateBase from './popUpPableUpdateBase';
import popUpPableAddBenefitItem from './popUpPableAddBenefitItem';
import popUpPableRemoveBenefitItem from './popUpPableRemoveBenefitItem';
import popUpPableUpdateBenefitItem from './popUpPableUpdateBenefitItem';
import popUpPableUpdateListMap from './popUpPableUpdateListMap';
import popUpPableUpdateBenefitListMap from './popUpPableUpdateBenefitListMap';
import popUpPablePoint from './popUpPablePoint';

import savePopUpEditPayable from './savePopUpEditPayable';
import savePopUpEditItemUpdate from './savePopUpEditItemUpdate';
import addInvoiceItem from './addInvoiceItem';
import removeInvoiceItem from './removeInvoiceItem';

export default {
  removeInvoiceItem,
  addInvoiceItem,
  addMainBenefitItem,
  saveMainBenefitItem,
  removeMainBenefitItem,
  removeICUItem,
  setServiceItemUnitError,
  setAssessmentDecisionError,
  addPayableItem,
  registerForm,
  unRegisterForm,
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
  saveInvoiceItem,
  addServiceItem,
  removeServiceItem,
  saveServiceItem,
  addClaimPayableItem,
  removeClaimPayableItem,
  saveClaimPayableItem,
  saveListPolicy,
  removeTreatmentPayableItem,
  saveTreatmentPayableAddItem,
  saveTreatmentPayableAddItemCallback,
  saveInvoicePayableAddItem,
  saveInvoicePayableAddItemCallback,
  removeServicePayableItem,
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
  accidentBenefitPayableItemAdd,
  accidentBenefitPayableItemDelete,
  accidentBenefitPayableItemUpdate,
  originClaimProcessData,
  registerExpand,
  updatePolicyBackgrounds,
  benefitItemGroupUpdate,
  benefitTypeGroupUpdate,
  benefitItemGroupDelete,
  benefitItemRecover,
  saveIntegrationError,
  saveSerialTreatment,
  saveSelectionTreatment,
  saveTreatmentRelation,
  saveDiagnosisMisDict,
  packDataForSubmit,
  calcuPopPayableTotalVal,
  updatePopPayable,
  setExpandState,
  saveSummaryTreatmentPayable,
  benefitTypeGroupDelete,
  link,
  isClickRegisterToggle,
  save3CiIndicator,

  popUpPableDelete,
  popUpPableInit,
  popUpPableUpdateBase,
  popUpPableAddBenefitItem,
  popUpPableRemoveBenefitItem,
  popUpPableUpdateBenefitItem,
  popUpPableUpdateListMap,
  popUpPableUpdateBenefitListMap,
  popUpPablePoint,

  savePopUpEditPayable,
  savePopUpEditItemUpdate,
};
