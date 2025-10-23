import changeReasonDestInfo from './changeReasonDestInfo';
import changeReasonRoleInfo from './changeReasonRoleInfo';
import changeReminderDestInfo from './changeReminderDestInfo';
import changeReminderRoleInfo from './changeReminderRoleInfo';
import delEnvoy from './delEnvoy';
import findSuccessTemplateByGroupId from './findSuccessTemplateByGroupId';
import getAttachDocArr from './getAttachDocArr';
import getAttachmentFile from './getAttachmentFile';
import getBusinessData from './getBusinessData';
import getChannelData from './getChannelData';
import getCurRoleInfo from './getCurRoleInfo';
import getDocumentTypes from './getDocumentTypes';
import getEnclosureData from './getEnclosureData';
import getEnvoyInfo from './getEnvoyInfo';
import getListMemos from './getListMemos';
import getListRequestClientInfo from './getListRequestClientInfo';
import getMedicalProviderDicts from './getMedicalProviderDicts';
import getMemoSubTypeList from './getMemoSubTypeList';
import getPaymentNoArr from './getPaymentNoArr';
import getPolicyNoInfo from './getPolicyNoInfo';
import getPreivewModeData from './getPreivewModeData';
import getPreviewModePageAtomConfig from './getPreviewModePageAtomConfig';
import getReasonConfigs from './getReasonConfigs';
import getRetryList from './getRetryList';
import getSendEnvoyData from './getSendEnvoyData';
import getThPendPolicyReasonsData from './getThPendPolicyReasonsData';
import initEnvoyData from './initEnvoyData';
import loadEnvoyBatchSendConfig from './loadEnvoyBatchSendConfig';
import refreshProcessPremium from './refreshProcessPremium';
import saveEntry from './saveEntry';
import saveEntryEnd from './saveEntryEnd';
import sendEnvoy from './sendEnvoy';
import sendPreviewData from './sendPreviewData';
import sendReminder from './sendReminder';
import sendRetry from './sendRetry';
import setDestRoleOpt from './setDestRoleOpt';
import setMemoStatus from './setMemoStatus';
import setMemoWaive from './setMemoWaive';
import setReasonGroup from './setReasonGroup';
import setScheduleSendTime from './setScheduleSendTime';
import setStatus from './setStatus';
import switchReminder from './switchReminder';
import validateEnvoy from './validateEnvoy';
import validateFields from './validateFields';
import validateExtraFields from './validateExtraFields';
import validatePreview from './validatePreview';
import validateStatus from './validateStatus';
import loadCurrentProcessMemoDropdown from './loadCurrentProcessMemoDropdown';

export default {
  initEnvoyData,
  getEnvoyInfo,
  getReasonConfigs,
  setStatus,
  setReasonGroup,
  getCurRoleInfo,
  changeReasonRoleInfo,
  changeReminderRoleInfo,
  changeReasonDestInfo,
  changeReminderDestInfo,
  sendEnvoy,
  validateEnvoy,
  switchReminder,
  setScheduleSendTime,
  sendReminder,
  getThPendPolicyReasonsData,
  getPolicyNoInfo,
  getPaymentNoArr,
  getDocumentTypes,
  getAttachDocArr,
  validateFields,
  validateExtraFields,
  validateStatus,
  setMemoStatus,
  setMemoWaive,
  getListMemos,
  delEnvoy,
  getChannelData,
  loadEnvoyBatchSendConfig,
  setDestRoleOpt,
  getBusinessData,
  getListRequestClientInfo,
  getPreivewModeData,
  getSendEnvoyData,
  saveEntry,
  saveEntryEnd,
  validatePreview,
  getEnclosureData,
  sendPreviewData,
  getPreviewModePageAtomConfig,
  getRetryList,
  sendRetry,
  getAttachmentFile,
  refreshProcessPremium,
  getMemoSubTypeList,
  findSuccessTemplateByGroupId,
  getMedicalProviderDicts,
  loadCurrentProcessMemoDropdown,
};
