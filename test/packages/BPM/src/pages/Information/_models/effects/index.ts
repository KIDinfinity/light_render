import getCurrentActivityCategory from './getCurrentActivityCategory';
import changeAddShowButton from './changeAddShowButton';
import formatLoadHistoryParams from './formatLoadHistoryParams';
import loadAllCategoryInformation from './loadAllCategoryInformation';
import setFieldsFromOutside from './setFieldsFromOutside';
import getTriggerPointData from './getTriggerPointData';
import getAuditLogsList from './getAuditLogsList';
import chatLink from './chatLink';
import setInforamtionCasegetoryToRemakWhenChatLink from './setInforamtionCasegetoryToRemakWhenChatLink';
import handleReply from './handleReply';
import addInformationChange from './addInformationChange';
import submitInformation from './submitInformation';
import setInformationReaded from './setInformationReaded';
import saveProcessInstanceIdReducer from './saveProcessInstanceIdReducer';
import laterLoadInformationData from './laterLoadInformationData';
import loadInformationInitData from './loadInformationInitData';
import setDefaultCategoryByActivivityCode from './setDefaultCategoryByActivivityCode';
import loadDefaultActiveCategory from './loadDefaultActiveCategory';
import loadActiveNameList from './loadActiveNameList';
import findLatesTaskByCaseNo from './findLatesTaskByCaseNo';
import findStatusByTaskId from './findStatusByTaskId';
import changeInformationFields from './changeInformationFields';
import changeCategoryFields from './changeCategoryFields';
import changeFieldsEffects from './changeFieldsEffects';
import setInformationDataByKey from './setInformationDataByKey';
import loadCategoryDict from './loadCategoryDict';
import handleChangeTabs from './handleChangeTabs';
import loaAuditLogdNextPage from './loaAuditLogdNextPage';
import loadFirstPage from './loadFirstPage';
import getClassificationData from './getClassificationData';
import mergeInformation from './mergeInformation';
import changeCollapseByCategory from './changeCollapseByCategory';
import handleOpenInformation from './handleOpenInformation';
import updateReadStatusLocal from './updateReadStatusLocal';
import clear from './clear';
import saveSnapshot from './saveSnapshot';
import getSnapshot from './getSnapshot';
import addInformationRecord from './addInformationRecord';
import deleteInformation from './deleteInformation';
import changeCategoryCode from './changeCategoryCode';
import autoAddInformationHandle from './autoAddInformationHandle';
import clearAddInformations from './clearAddInformations';
import toggleActiveEditTab from './toggleActiveEditTab';
import findDictionaryByTypeCode from './findDictionaryByTypeCode';
import getCategoryReason from './getCategoryReason';
import sendEmail from './sendEmail';

export default {
  getCurrentActivityCategory,
  changeAddShowButton,
  formatLoadHistoryParams,
  loadAllCategoryInformation,
  setFieldsFromOutside,
  getTriggerPointData,
  getAuditLogsList,
  chatLink,
  setInforamtionCasegetoryToRemakWhenChatLink,
  handleReply,
  addInformationChange,
  submitInformation,
  setInformationReaded,
  saveProcessInstanceIdReducer,
  laterLoadInformationData,
  loadInformationInitData,
  setDefaultCategoryByActivivityCode,
  loadDefaultActiveCategory,
  loadActiveNameList,
  findLatesTaskByCaseNo,
  findStatusByTaskId,
  changeInformationFields,
  changeCategoryFields,
  changeFieldsEffects,
  setInformationDataByKey,
  loadCategoryDict,
  handleChangeTabs,
  loaAuditLogdNextPage,
  loadFirstPage,
  getClassificationData,
  mergeInformation,
  changeCollapseByCategory,
  handleOpenInformation,
  updateReadStatusLocal,
  clear,
  saveSnapshot,
  getSnapshot,
  addInformationRecord,
  deleteInformation,
  changeCategoryCode,
  autoAddInformationHandle,
  clearAddInformations,
  toggleActiveEditTab,
  findDictionaryByTypeCode,
  getCategoryReason,
  sendEmail,
};
