import setCaseNo from './setCaseNo';
import saveEnvoyInfo from './saveEnvoyInfo';
import saveGroupInfo from './saveGroupInfo';
import saveDestRoleInfo from './saveDestRoleInfo';
import saveReasonConfigs from './saveReasonConfigs';
import addEnvoy from './addEnvoy';
import saveReasonGroup from './saveReasonGroup';
import setActivedGroupKey from './setActivedGroupKey';
import setHistoryGroupKey from './setHistoryGroupKey';
import saveTplDetail from './saveTplDetail';
import saveThPendPolicyReasons from './saveThPendPolicyReasons';
import savePolicyNoInfo from './savePolicyNoInfo';
import savePaymentNoArr from './savePaymentNoArr';
import saveDocumentTypes from './saveDocumentTypes';
import saveAttachDocArr from './saveAttachDocArr';
import saveErrorInfo from './saveErrorInfo';
import saveCaseCategoryReasonConfigs from './saveCaseCategoryReasonConfigs';
import saveListMemos from './saveListMemos';
import setFocusToNewHistoryItem from './setFocusToNewHistoryItem';
import saveViewReasonInfo from './saveViewReasonInfo';
import setViewChannel from './setViewChannel';
import setReminderIndex from './setReminderIndex';
import saveDelEnvoyResult from './saveDelEnvoyResult';
import addSendDataId from './addSendDataId';
import delSendDataId from './delSendDataId';
import saveReasonDispatchDate from './saveReasonDispatchDate';
import saveReminderDispatchDate from './saveReminderDispatchDate';
import saveReasonRoleInfo from './saveReasonRoleInfo';
import saveReminderRoleInfo from './saveReminderRoleInfo';
import saveReasonDestInfo from './saveReasonDestInfo';
import saveReminderDestInfo from './saveReminderDestInfo';
import saveReasonEnabelChannel from './saveReasonEnabelChannel';
import saveReminderEnabelChannel from './saveReminderEnabelChannel';
import saveReasonChannelInfo from './saveReasonChannelInfo';
import saveReminderChannelInfo from './saveReminderChannelInfo';
import saveReasonChannelTpl from './saveReasonChannelTpl';
import saveReminderChannelTpl from './saveReminderChannelTpl';
import saveReasonDocuments from './saveReasonDocuments';
import saveReasonDocumentCopies from './saveReasonDocumentCopies';
import saveReasonDocumentComment from './saveReasonDocumentComment';
import saveReasonAttachDocument from './saveReasonAttachDocument';
import saveReasonPolicy from './saveReasonPolicy';
import addReasonPolicy from './addReasonPolicy';
import delReasonPolicy from './delReasonPolicy';
import saveReasonAttachment from './saveReasonAttachment';
import addReasonAttachment from './addReasonAttachment';
import delReasonAttachment from './delReasonAttachment';
import saveReasonPayment from './saveReasonPayment';
import saveReasonRemark from './saveReasonRemark';
import saveReasonDefine from './saveReasonDefine';
import saveReasonLetter from './saveReasonLetter';
import saveReasonDelayLetter from './saveReasonDelayLetter';
import saveReasonMemoCode from './saveReasonMemoCode';
import saveReasonMemoDesc from './saveReasonMemoDesc';
import saveState from './saveState';
import updateEnvoyData from './updateEnvoyData';
import saveFreeFieldsOfInputReasonData from './saveFreeFieldsOfInputReasonData';
import saveFreeFieldsOfInputReminderData from './saveFreeFieldsOfInputReminderData';
import saveFreeFieldsOfTextareaReasonData from './saveFreeFieldsOfTextareaReasonData';
import saveFreeFieldsOfTextareaReminderData from './saveFreeFieldsOfTextareaReminderData';
import saveFreeFieldsOfCheckboxReasonData from './saveFreeFieldsOfCheckboxReasonData';
import saveFreeFieldsOfCheckboxReminderData from './saveFreeFieldsOfCheckboxReminderData';
import saveFreeFieldsOfDateReasonData from './saveFreeFieldsOfDateReasonData';
import saveFreeFieldsOfDateReminderData from './saveFreeFieldsOfDateReminderData';
import saveFreeFieldsOfSelectReasonData from './saveFreeFieldsOfSelectReasonData';
import saveFreeFieldsOfSelectReminderData from './saveFreeFieldsOfSelectReminderData';
import saveReasonPolicyNo from './saveReasonPolicyNo';
import saveReminderPolicyNo from './saveReminderPolicyNo';
import saveCaseCategoryReasonDocConfigs from './saveCaseCategoryReasonDocConfigs';
import saveLinkMemoCode from './saveLinkMemoCode';
import setPendingMemoList from './setPendingMemoList';
import saveEnvoyBatchSendConfig from './saveEnvoyBatchSendConfig';
import handleBatchEnvoySelect from './handleBatchEnvoySelect';
import saveReasonMemoRemark from './saveReasonMemoRemark';
import saveRequestClientInfoList from './saveRequestClientInfoList';
import changePreivewModeShow from './changePreivewModeShow';
import savePreviewModeData from './savePreviewModeData';
import savePreviewCurrentReason from './savePreviewCurrentReason';
import saveLetterForm from './saveLetterForm';
import clearPreivewModeData from './clearPreivewModeData';
import revertPreivewModeData from './revertPreivewModeData';
import savePreviewSelectLetter from './savePreviewSelectLetter';
import saveEnclosureData from './saveEnclosureData';
import saveSelectEnclosureIndex from './saveSelectEnclosureIndex';
import savePreviewModePageAtomConfig from './savePreviewModePageAtomConfig';
import savePreivewForm from './savePreivewForm';
import saveReasonDetails from './saveReasonDetails';
import saveRetryList from './saveRetryList';
import saveEnvoyTaskStatus from './saveEnvoyTaskStatus';
import saveGetProcessJobInfoTimeStamp from './saveGetProcessJobInfoTimeStamp';
import unifyGroupCode from './unifyGroupCode';
import saveMemoReason from './saveMemoReason';
import addMemoReason from './addMemoReason';
import deleteMemoReason from './deleteMemoReason';
import saveTemplateParams from './saveTemplateParams';
import saveSelectEnclosureEdit from './saveSelectEnclosureEdit';
import savePreviewEditContent from './savePreviewEditContent';
import saveCurPreviewHtml from './saveCurPreviewHtml';
import savePreviewUrl from './savePreviewUrl';
import clearPreviewEditContent from './clearPreviewEditContent';
import clearAttachmentData from './clearAttachmentData';
import clearReasonInfo from './clearReasonInfo';

// opus
import toggleRemark from './toggleRemark';

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
  savePreviewCurrentReason,
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
  saveTemplateParams,
  saveSelectEnclosureEdit,
  savePreviewEditContent,
  saveCurPreviewHtml,
  savePreviewUrl,
  clearPreviewEditContent,
  clearAttachmentData,
  clearReasonInfo,
  // opus
  toggleRemark,
};

export default reducers;
