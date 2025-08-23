import saveClaimProcessData from './saveClaimProcessData';
import clearClaimProcessData from './clearClaimProcessData';
import saveInsured from './saveInsured';
import saveClaimant from './saveClaimant';
import savePayee from './savePayee';
import addIncidentItem from './addIncidentItem';
import saveIncidentItem from './saveIncidentItem';
import addTreatmentItem from './addTreatmentItem';
import saveTreatmentItem from './saveTreatmentItem';
import addDiagnosisItem from './addDiagnosisItem';
import removeDiagnosisItem from './removeDiagnosisItem';
import saveDiagnosisItem from './saveDiagnosisItem';
import addProcedureItem from './addProcedureItem';
import removeProcedureItem from './removeProcedureItem';
import saveInvoiceItem from './saveInvoiceItem';
import saveServiceItem from './saveServiceItem';
import addClaimPayableItem from './addClaimPayableItem';
import removeClaimPayableItem from './removeClaimPayableItem';

import saveListPolicy from './saveListPolicy';
import removeTreatmentPayableItem from './removeTreatmentPayableItem';
import saveTreatmentPayableAddItem from './saveTreatmentPayableAddItem';
import saveTreatmentPayableAddItemCallback from './saveTreatmentPayableAddItemCallback';
import addInvoicePayableItem from './addInvoicePayableItem';
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
import benefitItemRecover from './benefitItemRecover';
import saveIntegrationError from './saveIntegrationError';
import setAssessmentDecisionError from './setAssessmentDecisionError';
import setServiceItemUnitError from './setServiceItemUnitError';
import saveSerialTreatment from './saveSerialTreatment';
import saveTreatmentRelation from './saveTreatmentRelation';
import saveDiagnosisMisDict from './saveDiagnosisMisDict';
import removeICUItem from './removeICUItem';
import calcuPopPayableTotalVal from './calcuPopPayableTotalVal';
import setExpandState from './setExpandState';
import saveSummaryTreatmentPayable from './saveSummaryTreatmentPayable';
import benefitTypeGroupDelete from './benefitTypeGroupDelete';
import packDataForSubmit from './packDataForSubmit';
import link from './link';
import isClickRegisterToggle from './isClickRegisterToggle';
import saveSelectionTreatment from './saveSelectionTreatment';
import setAdjustmentFactorState from './setAdjustmentFactorState';
import saveListBenefitFactor from './saveListBenefitFactor';
import packFactorList from './packFactorList';
import saveFactorItem from './saveFactorItem';
import saveFactorItemSelect from './saveFactorItemSelect';
import packAdjustmentFactorForSubmit from './packAdjustmentFactorForSubmit';

// Add Payable
import popUpPableDelete from './popUpPableDelete';
import popUpPableInit from './popUpPableInit';
import popUpPableUpdateBase from './popUpPableUpdateBase';
import popUpPableRemoveBenefitItem from './popUpPableRemoveBenefitItem';
import popUpPableChangeBenefitItem from './popUpPableChangeBenefitItem';
import popUpPableUpdateBenefitListMap from './popUpPableUpdateBenefitListMap';
import popUpPablePoint from './popUpPablePoint';
import popUpPableUpdateListMap from './popUpPableUpdateListMap';
import popUpPableUpdateListMapChoice from './popUpPableUpdateListMapChoice';

import savePopUpEditPayable from './savePopUpEditPayable';
import savePopUpEditItemUpdate from './savePopUpEditItemUpdate';
import addServiceItem from './addServiceItem';
import addInvoiceItem from './addInvoiceItem';
import removeServiceItem from './removeServiceItem';
import removeInvoiceItem from './removeInvoiceItem';

import totalBenefitTypeBasicUpdate from './totalBenefitTypeBasicUpdate';
import payableSeriesDelete from './payableSeriesDelete';
import payableItemDelete from './payableItemDelete';

// procedure
import saveProcedureItem from './saveProcedureItem';
import saveProcedurePayableItem from './saveProcedurePayableItem';
import removeProcedurePayableItem from './removeProcedurePayableItem';

import saveRoomTypeDict from './saveRoomTypeDict';
import clearRoomType from './clearRoomType';
import serviceItemBreakdownDelete from './serviceItemBreakdownDelete';
import serviceItemBreakdownInit from './serviceItemBreakdownInit';
import saveServiceItemBreakdown from './saveServiceItemBreakdown';
import saveServiceItemBreakdownForms from './saveServiceItemBreakdownForms';
import saveServiceItemBreakdownList from './saveServiceItemBreakdownList';
import serviceItemBreakdownPoint from './serviceItemBreakdownPoint';
import clearReAssessmentBreakdownError from './clearReAssessmentBreakdownError';
import setBreakdownConfirm from './setBreakdownConfirm';

import addFeeItem from './addFeeItem';
import removeFeeItem from './removeFeeItem';
import saveFeeItem from './saveFeeItem';
import saveServiceItemFeesListMap from './saveServiceItemFeesListMap';
import removeFeeItemList from './removeFeeItemList';

import saveOtherProcedureItem from './saveOtherProcedureItem';
import removeOtherProcedureItem from './removeOtherProcedureItem';
import addOtherProcedure from './addOtherProcedure';
import saveOtherProcedurePayableItem from './saveOtherProcedurePayableItem';
import removeOtherProcedurePayableItem from './removeOtherProcedurePayableItem';
import saveAllExchangeRate from './saveAllExchangeRate';
import hanldExchangeRateForPolicy from './hanldExchangeRateForPolicy';
import handleExchangeRateForInvoiceCurrencyPayout from './handleExchangeRateForInvoiceCurrencyPayout';
import handleExchangeRateForExchangeDate from './handleExchangeRateForExchangeDate';
import surgeryProcedureByRegion from './surgeryProcedureByRegion';
import saveSearchAdjustSurgeryInfo from './saveSearchAdjustSurgeryInfo';
import saveLifePayable from './saveLifePayable';
import setRegisterAlert from './setRegisterAlert';
import setBeneficiaryPopUp from './setBeneficiaryPopUp';
import fillBeneficiary from './fillBeneficiary';
import saveAppealInformation from './saveAppealInformation';
import adjustClaimPayable from './adjustClaimPayable';
import loadAppealPayables from './loadAppealPayables';
import updateAdjustClaimPayableList from './updateAdjustClaimPayableList';

import saveCaseInfo from './saveCaseInfo';

import saveReimbursementPercentageMap from './saveReimbursementPercentageMap';

import { paymentReducers } from 'process/Payment/_models';

export default {
  removeFeeItemList,
  saveServiceItemFeesListMap,
  saveFeeItem,
  removeFeeItem,
  addFeeItem,
  setBreakdownConfirm,
  clearReAssessmentBreakdownError,
  serviceItemBreakdownPoint,
  saveServiceItemBreakdownList,
  saveServiceItemBreakdownForms,
  saveServiceItemBreakdown,
  serviceItemBreakdownInit,
  serviceItemBreakdownDelete,
  removeInvoiceItem,
  removeServiceItem,
  addInvoiceItem,
  addServiceItem,
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
  saveIncidentItem,
  addTreatmentItem,
  saveTreatmentItem,
  addDiagnosisItem,
  removeDiagnosisItem,
  saveDiagnosisItem,
  addProcedureItem,
  removeProcedureItem,
  saveInvoiceItem,
  saveServiceItem,
  addClaimPayableItem,
  removeClaimPayableItem,
  saveListPolicy,
  removeTreatmentPayableItem,
  saveTreatmentPayableAddItem,
  saveTreatmentPayableAddItemCallback,
  addInvoicePayableItem,
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
  benefitItemGroupDelete,
  benefitItemRecover,
  saveIntegrationError,
  saveSerialTreatment,
  saveTreatmentRelation,
  saveDiagnosisMisDict,
  calcuPopPayableTotalVal,
  setExpandState,
  saveSummaryTreatmentPayable,
  benefitTypeGroupDelete,
  packDataForSubmit,
  link,
  isClickRegisterToggle,
  saveSelectionTreatment,
  setAdjustmentFactorState,
  saveListBenefitFactor,
  packFactorList,
  saveFactorItem,
  packAdjustmentFactorForSubmit,
  saveFactorItemSelect,

  popUpPableDelete,
  popUpPableInit,
  popUpPableUpdateBase,
  popUpPableRemoveBenefitItem,
  popUpPableUpdateBenefitListMap,
  popUpPablePoint,
  popUpPableUpdateListMapChoice,
  popUpPableUpdateListMap,
  popUpPableChangeBenefitItem,
  savePopUpEditPayable,
  savePopUpEditItemUpdate,
  saveProcedureItem,
  saveProcedurePayableItem,
  removeProcedurePayableItem,

  totalBenefitTypeBasicUpdate,
  payableSeriesDelete,
  payableItemDelete,

  saveRoomTypeDict,
  clearRoomType,

  saveOtherProcedureItem,
  removeOtherProcedureItem,
  addOtherProcedure,
  saveOtherProcedurePayableItem,
  removeOtherProcedurePayableItem,
  saveAllExchangeRate,
  hanldExchangeRateForPolicy,
  handleExchangeRateForInvoiceCurrencyPayout,
  handleExchangeRateForExchangeDate,
  surgeryProcedureByRegion,
  saveSearchAdjustSurgeryInfo,
  saveLifePayable,
  setRegisterAlert,
  setBeneficiaryPopUp,
  fillBeneficiary,
  saveAppealInformation,
  adjustClaimPayable,
  loadAppealPayables,
  updateAdjustClaimPayableList,

  saveCaseInfo,

  saveReimbursementPercentageMap,

  ...paymentReducers,
};
