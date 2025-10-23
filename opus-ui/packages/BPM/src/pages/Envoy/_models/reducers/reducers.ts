import addEnvoy from './addEnvoy';
import addMemoReason from './addMemoReason';
import addReasonAttachment from './addReasonAttachment';
import addReasonPolicy from './addReasonPolicy';
import addSendDataId from './addSendDataId';
import changePreivewModeShow from './changePreivewModeShow';
import clearPreivewModeData from './clearPreivewModeData';
import deleteMemoReason from './deleteMemoReason';
import delReasonAttachment from './delReasonAttachment';
import delReasonPolicy from './delReasonPolicy';
import delSendDataId from './delSendDataId';
import handleBatchEnvoySelect from './handleBatchEnvoySelect';
import revertPreivewModeData from './revertPreivewModeData';
import saveAttachDocArr from './saveAttachDocArr';
import saveCaseCategoryReasonConfigs from './saveCaseCategoryReasonConfigs';
import saveCaseCategoryReasonDocConfigs from './saveCaseCategoryReasonDocConfigs';
import saveDelEnvoyResult from './saveDelEnvoyResult';
import saveDestRoleInfo from './saveDestRoleInfo';
import saveDocumentTypes from './saveDocumentTypes';
import saveEnclosureData from './saveEnclosureData';
import saveEnvoyBatchSendConfig from './saveEnvoyBatchSendConfig';
import saveEnvoyInfo from './saveEnvoyInfo';
import saveEnvoyTaskStatus from './saveEnvoyTaskStatus';
import saveErrorInfo from './saveErrorInfo';
import saveFreeFieldsOfCheckboxReasonData from './saveFreeFieldsOfCheckboxReasonData';
import saveFreeFieldsOfCheckboxReminderData from './saveFreeFieldsOfCheckboxReminderData';
import saveFreeFieldsOfDateReasonData from './saveFreeFieldsOfDateReasonData';
import saveFreeFieldsOfDateReminderData from './saveFreeFieldsOfDateReminderData';
import saveFreeFieldsOfInputReasonData from './saveFreeFieldsOfInputReasonData';
import saveFreeFieldsOfInputReminderData from './saveFreeFieldsOfInputReminderData';
import saveFreeFieldsOfSelectReasonData from './saveFreeFieldsOfSelectReasonData';
import saveFreeFieldsOfSelectReminderData from './saveFreeFieldsOfSelectReminderData';
import saveFreeFieldsOfTextareaReasonData from './saveFreeFieldsOfTextareaReasonData';
import saveFreeFieldsOfTextareaReminderData from './saveFreeFieldsOfTextareaReminderData';
import saveGetProcessJobInfoTimeStamp from './saveGetProcessJobInfoTimeStamp';
import saveGroupInfo from './saveGroupInfo';
import saveLetterForm from './saveLetterForm';
import saveLinkMemoCode from './saveLinkMemoCode';
import saveListMemos from './saveListMemos';
import saveMemoReason from './saveMemoReason';
import saveMemoSubTypeList from './saveMemoSubTypeList';
import savePaymentNoArr from './savePaymentNoArr';
import savePolicyNoInfo from './savePolicyNoInfo';
import savePreivewForm from './savePreivewForm';
import savePreviewModeData from './savePreviewModeData';
import savePreviewModePageAtomConfig from './savePreviewModePageAtomConfig';
import savePreviewSelectLetter from './savePreviewSelectLetter';
import saveReasonAttachDocument from './saveReasonAttachDocument';
import saveReasonAttachment from './saveReasonAttachment';
import saveReasonChannelInfo from './saveReasonChannelInfo';
import saveReasonChannelTpl from './saveReasonChannelTpl';
import saveReasonConfigs from './saveReasonConfigs';
import saveReasonDefine from './saveReasonDefine';
import saveReasonDelayLetter from './saveReasonDelayLetter';
import saveReasonDestInfo from './saveReasonDestInfo';
import saveReasonDetails from './saveReasonDetails';
import saveReasonDispatchDate from './saveReasonDispatchDate';
import saveReasonDocumentComment from './saveReasonDocumentComment';
import saveReasonDocumentCopies from './saveReasonDocumentCopies';
import saveReasonDocuments from './saveReasonDocuments';
import saveReasonEnabelChannel from './saveReasonEnabelChannel';
import saveReasonGroup from './saveReasonGroup';
import saveReasonLetter from './saveReasonLetter';
import saveReasonMemoCode from './saveReasonMemoCode';
import saveReasonMemoDesc from './saveReasonMemoDesc';
import saveReasonMemoRemark from './saveReasonMemoRemark';
import saveReasonPayment from './saveReasonPayment';
import saveReasonPolicy from './saveReasonPolicy';
import saveReasonPolicyNo from './saveReasonPolicyNo';
import saveReasonRemark from './saveReasonRemark';
import saveReasonRoleInfo from './saveReasonRoleInfo';
import saveReminderChannelInfo from './saveReminderChannelInfo';
import saveReminderChannelTpl from './saveReminderChannelTpl';
import saveReminderDestInfo from './saveReminderDestInfo';
import saveReminderDispatchDate from './saveReminderDispatchDate';
import saveReminderEnabelChannel from './saveReminderEnabelChannel';
import saveReminderPolicyNo from './saveReminderPolicyNo';
import saveReminderRoleInfo from './saveReminderRoleInfo';
import saveRequestClientInfoList from './saveRequestClientInfoList';
import saveRetryList from './saveRetryList';
import saveSelectEnclosureIndex from './saveSelectEnclosureIndex';
import saveState from './saveState';
import saveThPendPolicyReasons from './saveThPendPolicyReasons';
import saveTplDetail from './saveTplDetail';
import saveViewReasonInfo from './saveViewReasonInfo';
import setActivedGroupKey from './setActivedGroupKey';
import setCaseNo from './setCaseNo';
import setFocusToNewHistoryItem from './setFocusToNewHistoryItem';
import setHistoryGroupKey from './setHistoryGroupKey';
import setMedicalProviderDicts from './setMedicalProviderDicts';
import setPendingMemoList from './setPendingMemoList';
import setReminderIndex from './setReminderIndex';
import setViewChannel from './setViewChannel';
import unifyGroupCode from './unifyGroupCode';
import updateEnvoyData from './updateEnvoyData';

// opus
import setSendCondition from './setSendCondition';
import toggleRemark from './toggleRemark';
import clearAllData from './clearAllData';
import saveCurrentProcessMemoDropdown from './saveCurrentProcessMemoDropdown';
import saveReasonGroupWithoutEffects from './saveReasonGroupWithoutEffects';

const reducers = {
  setCaseNo,
  saveEnvoyInfo,
  saveGroupInfo,
  saveDestRoleInfo,
  saveReasonConfigs,
  addEnvoy,
  saveReasonGroup,
  setActivedGroupKey,
  setHistoryGroupKey,
  saveTplDetail,
  saveThPendPolicyReasons,
  savePolicyNoInfo,
  savePaymentNoArr,
  saveDocumentTypes,
  saveAttachDocArr,
  saveErrorInfo,
  saveCaseCategoryReasonConfigs,
  saveListMemos,
  setFocusToNewHistoryItem,
  saveViewReasonInfo,
  setViewChannel,
  setReminderIndex,
  saveDelEnvoyResult,
  addSendDataId,
  delSendDataId,
  saveReasonDispatchDate,
  saveReminderDispatchDate,
  saveReasonRoleInfo,
  saveReminderRoleInfo,
  saveReasonDestInfo,
  saveReminderDestInfo,
  saveReasonEnabelChannel,
  saveReminderEnabelChannel,
  saveReasonChannelInfo,
  saveReminderChannelInfo,
  saveReasonChannelTpl,
  saveReminderChannelTpl,
  saveReasonDocuments,
  saveReasonDocumentCopies,
  saveReasonDocumentComment,
  saveReasonAttachDocument,
  saveReasonPolicy,
  addReasonPolicy,
  delReasonPolicy,
  saveReasonAttachment,
  addReasonAttachment,
  delReasonAttachment,
  saveReasonPayment,
  saveReasonRemark,
  saveReasonDefine,
  saveReasonLetter,
  saveReasonDelayLetter,
  saveReasonMemoCode,
  saveReasonMemoDesc,
  saveState,
  updateEnvoyData,
  saveFreeFieldsOfInputReasonData,
  saveFreeFieldsOfInputReminderData,
  saveFreeFieldsOfTextareaReasonData,
  saveFreeFieldsOfTextareaReminderData,
  saveFreeFieldsOfCheckboxReasonData,
  saveFreeFieldsOfCheckboxReminderData,
  saveFreeFieldsOfDateReasonData,
  saveFreeFieldsOfDateReminderData,
  saveFreeFieldsOfSelectReasonData,
  saveFreeFieldsOfSelectReminderData,
  saveReasonPolicyNo,
  saveReminderPolicyNo,
  saveCaseCategoryReasonDocConfigs,
  saveLinkMemoCode,
  setPendingMemoList,
  saveEnvoyBatchSendConfig,
  handleBatchEnvoySelect,
  saveReasonMemoRemark,
  saveRequestClientInfoList,
  changePreivewModeShow,
  savePreviewModeData,
  saveLetterForm,
  clearPreivewModeData,
  revertPreivewModeData,
  savePreviewSelectLetter,
  saveEnclosureData,
  saveSelectEnclosureIndex,
  savePreviewModePageAtomConfig,
  savePreivewForm,
  saveReasonDetails,
  saveRetryList,
  saveEnvoyTaskStatus,
  saveGetProcessJobInfoTimeStamp,
  unifyGroupCode,
  saveMemoReason,
  addMemoReason,
  deleteMemoReason,
  // opus
  toggleRemark,
  saveMemoSubTypeList,
  setSendCondition,
  setMedicalProviderDicts,
  clearAllData,
  saveCurrentProcessMemoDropdown,
  saveReasonGroupWithoutEffects,
};

export default reducers;
