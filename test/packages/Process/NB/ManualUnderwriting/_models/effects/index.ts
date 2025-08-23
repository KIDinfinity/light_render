import confirmPerposal from './confirmPerposal';
import discard from './discard';
import getDataForPerposalConfirm from './getDataForPerposalConfirm';
import getDataForSave from './getDataForSave';
import getDataForSubmit from './getDataForSubmit';
import getDropdownList from './getDropdownList';
import getExclusionList from './getExclusionList';
import getNBHistoryData from './getNBHistoryData';
import saveEntry from './saveEntry';
import saveEntryEnd from './saveEntryEnd';
import saveFormData from './saveFormData';
import savePerposal from './savePerposal';
import setPremiumCalculation from './setPremiumCalculation';
import updateNtuJob from './updateNtuJob';
import validateFields from './validateFields';
import resetStepSecondData from './resetStepSecondData';
import resetThirdStepData from './resetThirdStepData';
import getAgentList from './getAgentList';
import getRoleDicts from './getRoleDicts';
import handleProposalClientChange from './handleProposalClientChange';
import getAllReasonConfigList from './getAllReasonConfigList';
import getAllFundConfigList from './getAllFundConfigList';
import getAddressSubList from './getAddressSubList';
import validatePerposal from './validatePerposal';
import getClientsQuestionnaire from './getClientsQuestionnaire';
import getEWS from './getEWS';
import getCaseDetail from './getCaseDetail';
import getExchangeRate from './getExchangeRate';
import loadOccupationCodeDropdwon from './loadOccupationCodeDropdwon';
import retryAutoUnderwrite from './retryAutoUnderwrite';
import validateProduct from './validateProduct';
import updateCustomerIndentification from './updateCustomerIndentification';
import queryRegionDefaultCurrency from './queryRegionDefaultCurrency';
import loadPlanProduct from './loadPlanProduct';
import loadProductCodeConfig from './loadProductCodeConfig';
import reLoadBizDataSkipSnapshot from './reLoadBizDataSkipSnapshot';
import reLoadBizDataWithSnapshot from './reLoadBizDataWithSnapshot';
import getNationality from './getNationality';
import getCampaignList from './getCampaignList';
import searchBankCode from './searchBankCode';
import searchFactoringHouse from './searchFactoringHouse';
import reLoadBizDataUseSnapshot from './reLoadBizDataUseSnapshot';
import loadDefaultCurrentAddressConfig from './loadDefaultCurrentAddressConfig';
import checkQuestionnaireSwitch from './checkQuestionnaireSwitch';
import submitClientChange from './submitClientChange';
import getDiffSourceSnapshot from './getDiffSourceSnapshot';
import deleteDiffSourceSnapshot from './deleteDiffSourceSnapshot';
import loadUWMeLinkAge from './loadUWMeLinkAge';
import generateSI from './generateSI';
import getLinkDicts from './getLinkDicts';
import getRelationOfProposerDefaultValue from './getRelationOfProposerDefaultValue';
import searchAllCfgBranchCode from './searchAllCfgBranchCode';
import searchAllCfgBankCode from './searchAllCfgBankCode';
import getNumberofunitsList from './getNumberofunitsList';
import getPolicyLoanHistorys from './getPolicyLoanHistorys';
import getRenewalPaymentMethod from './getRenewalPaymentMethod';
import getCfgPlanbankInfosByPaymentMode from './getCfgPlanbankInfosByPaymentMode';
import getFundConfigListByProductCodeList from './getFundConfigListByProductCodeList';
import getContractType from './getContractType';
import getConfirmPerposalData from './getConfirmPerposalData';
import getSubmitClientChangeData from './getSubmitClientChangeData';
import getCheckRule from './getCheckRule';
import getDataForPaperSubmission from './getDataForPaperSubmission';
import getPaperSubmissionSubmitFormat from './getPaperSubmissionSubmitFormat';
import loadRegionalDefaultValueList from './loadRegionalDefaultValueList';
import getNewBankCodeList from './getNewBankCodeList';
import getSpecificCfgFactoringHouses from './getSpecificCfgFactoringHouses';
import getExceptLoadingSetup from './getExceptLoadingSetup';
import loadUWLinkDisplayConfig from './loadUWLinkDisplayConfig';
import loadProposalFlags from './loadProposalFlags';
import loadPlanProductDuration from './loadPlanProductDuration';
import editChequeInfo from 'process/NB/Share/models/effects/editChequeInfo';
import saveChequeInfo from 'process/NB/Share/models/effects/saveChequeInfo';
import loadChequeInfoList from 'process/NB/Share/models/effects/loadChequeInfoList';
import verifyChequeInfo from 'process/NB/Share/models/effects/verifyChequeInfo';
import getCfgWaiverList from './getCfgWaiverList';
import updatePaymentListData from './updatePaymentListData';
import triggerCaseOverdueJob from './triggerCaseOverdueJob';
import getPlanLoadingReasons from './getPlanLoadingReasons';
import getListDedupCheckCfg from './getListDedupCheckCfg';
import updateCheckduplicateData from './updateCheckduplicateData';
import getAllSubAddress from './getAllSubAddress';
import loadRegionalDefaultValue from './loadRegionalDefaultValue';
import getCfgPlanHospitalBenefit from './getCfgPlanHospitalBenefit';
import checkSustainabilitySelected from './checkSustainabilitySelected';
import collectErrors from './collectErrors';
import trySustainabilityCalculate from './trySustainabilityCalculate';
import validateSustainability from './validateSustainability';
import deleteSustainabilityOptionsSnashot from './deleteSustainabilityOptionsSnashot';
import getRuleResultList from './getRuleResultList';
import loadPlanDictProductRegion from './loadPlanDictProductRegion';
import getCfgLoadingAllowable from './getCfgLoadingAllowable';
import getCfgLoadingMappingUIRule from './getCfgLoadingMappingUIRule';
import getRiskIndicator from './getRiskIndicator';
import getEWSVersions from './getEWSVersions';
import getCfgOccupationRiskLevel from './getCfgOccupationRiskLevel';
import premiumCalculation from './premiumCalculation';
import getRopList from './getRopList';
import getIdDisplayConfigList from './getIdDisplayConfigList';
import loadPolicyLevelFecRiskMsg from './loadPolicyLevelFecRiskMsg';
import loadSingleVersionEWS from './loadSingleVersionEWS';
import getRopPlanOptionList from './getRopPlanOptionList';
import getSAMultiplierOPUS from './getSAMultiplierOPUS';
import getCascadeAddress from './getCascadeAddress';
import supplyUwDecisionEditInd from './supplyUwDecisionEditInd';
import getAgentBankList from './getAgentBankList';
import validateForms from './validateForms';
import saveSustainabilityAuditLog from './saveSustainabilityAuditLog';
import getFundConfigListByProductCodeListByChange from './getFundConfigListByProductCodeListByChange';
import autoAttachFunds from './autoAttachFunds';
import deleteSpareFundAllocation from './deleteSpareFundAllocation';
import getDistributionChannelDisplayMethod from './getDistributionChannelDisplayMethod';

export default {
  getCfgWaiverList,
  getNewBankCodeList,
  getPolicyLoanHistorys,
  getAddressSubList,
  getAllFundConfigList,
  getAllReasonConfigList,
  validateFields,
  getDataForSubmit,
  getDataForSave,
  saveEntry,
  saveFormData,
  saveEntryEnd,
  setPremiumCalculation,
  getExclusionList,
  getNBHistoryData,
  updateNtuJob,
  getDataForPerposalConfirm,
  getDropdownList,
  discard,
  savePerposal,
  confirmPerposal,
  resetStepSecondData,
  resetThirdStepData,
  getAgentList,
  getRoleDicts,
  handleProposalClientChange,
  validatePerposal,
  getClientsQuestionnaire,
  getEWS,
  getCaseDetail,
  getExchangeRate,
  loadOccupationCodeDropdwon,
  retryAutoUnderwrite,
  validateProduct,
  updateCustomerIndentification,
  queryRegionDefaultCurrency,
  loadPlanProduct,
  loadProductCodeConfig,
  reLoadBizDataSkipSnapshot,
  reLoadBizDataWithSnapshot,
  getNationality,
  getCampaignList,
  searchBankCode,
  searchFactoringHouse,
  reLoadBizDataUseSnapshot,
  loadDefaultCurrentAddressConfig,
  checkQuestionnaireSwitch,
  submitClientChange,
  getDiffSourceSnapshot,
  deleteDiffSourceSnapshot,
  loadUWMeLinkAge,
  generateSI,
  getLinkDicts,
  getRelationOfProposerDefaultValue,
  searchAllCfgBranchCode,
  searchAllCfgBankCode,
  getNumberofunitsList,
  getRenewalPaymentMethod,
  getCfgPlanbankInfosByPaymentMode,
  getFundConfigListByProductCodeList,
  getContractType,
  getConfirmPerposalData,
  getSubmitClientChangeData,
  getCheckRule,
  getDataForPaperSubmission,
  getPaperSubmissionSubmitFormat,
  loadRegionalDefaultValueList,
  getSpecificCfgFactoringHouses,
  getExceptLoadingSetup,
  loadUWLinkDisplayConfig,
  loadProposalFlags,
  loadPlanProductDuration,
  editChequeInfo,
  saveChequeInfo,
  loadChequeInfoList,
  verifyChequeInfo,
  updatePaymentListData,
  triggerCaseOverdueJob,
  getPlanLoadingReasons,
  getListDedupCheckCfg,
  updateCheckduplicateData,
  getAllSubAddress,
  loadRegionalDefaultValue,
  getCfgPlanHospitalBenefit,
  checkSustainabilitySelected,
  collectErrors,
  trySustainabilityCalculate,
  validateSustainability,
  deleteSustainabilityOptionsSnashot,
  getRuleResultList,
  loadPlanDictProductRegion,
  getCfgLoadingAllowable,
  getCfgLoadingMappingUIRule,
  getRiskIndicator,
  getEWSVersions,
  getCfgOccupationRiskLevel,
  premiumCalculation,
  getRopList,
  getIdDisplayConfigList,
  loadPolicyLevelFecRiskMsg,
  loadSingleVersionEWS,
  getRopPlanOptionList,
  getSAMultiplierOPUS,
  getCascadeAddress,
  supplyUwDecisionEditInd,
  getAgentBankList,
  validateForms,
  saveSustainabilityAuditLog,
  getFundConfigListByProductCodeListByChange,
  autoAttachFunds,
  deleteSpareFundAllocation,
  getDistributionChannelDisplayMethod,
};
