import getClaim from './getClaim';
import validateFields from './validateFields';
import getTransactionTypeList from './getTransactionTypeList';
import getPolicyInfoByPolicyNo from './getPolicyInfoByPolicyNo';
import getPosDataCapture from './getPosDataCapture';
import getDataForSubmit from './getDataForSubmit';
import getDataForSave from './getDataForSave';
import saveEntry from './saveEntry';
import saveEntryEnd from './saveEntryEnd';
import saveFormData from './saveFormData';
import getQueryPayInStatus from './getQueryPayInStatus';
import getUsTaxInformationByPosNo from './getUsTaxInformationByPosNo';
import getDataSaveUsTaxInfo from './getDataSaveUsTaxInfo';
import checkDuplicatedTransType from './checkDuplicatedTransType';
import initBusinessData from './initBusinessData';
import getPosPendingInfoByPosNo from './getPosPendingInfoByPosNo';
import xmldownload from './xmldownload';
import updateDocumentByTransType from './updateDocumentByTransType';
import saveSnapshot from './saveSnapshot';

export default {
  getClaim,
  getDataForSubmit,
  validateFields,
  getTransactionTypeList,
  getPolicyInfoByPolicyNo,
  getPosDataCapture,
  getDataForSave,
  saveEntry,
  saveEntryEnd,
  saveFormData,
  getQueryPayInStatus,
  getUsTaxInformationByPosNo,
  getDataSaveUsTaxInfo,
  checkDuplicatedTransType,
  initBusinessData,
  getPosPendingInfoByPosNo,
  xmldownload,
  updateDocumentByTransType,
  saveSnapshot,
};
