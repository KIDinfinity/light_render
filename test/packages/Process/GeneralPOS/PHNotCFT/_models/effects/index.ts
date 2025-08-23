import validateFields from './validateFields';
import getTransactionTypeList from './getTransactionTypeList';
import getPolicyInfoByPolicyNo from './getPolicyInfoByPolicyNo';
import getPosDataCapture from './getPosDataCapture';
import getDataForSubmit from './getDataForSubmit';
import getDataForSave from './getDataForSave';
import saveEntry from './saveEntry';
import saveEntryEnd from './saveEntryEnd';
import saveFormData from './saveFormData';
import getUsTaxInformationByPosNo from './getUsTaxInformationByPosNo';
import getDataSaveUsTaxInfo from './getDataSaveUsTaxInfo';
import checkDuplicatedTransType from './checkDuplicatedTransType';
import initBusinessData from './initBusinessData';
import getPosPendingInfoByPosNo from './getPosPendingInfoByPosNo';
import updateDocumentByTransType from './updateDocumentByTransType';
import saveSnapshot from './saveSnapshot';
import getSrvCase from './getSrvCase';

export default {
  getDataForSubmit,
  validateFields,
  getTransactionTypeList,
  getPolicyInfoByPolicyNo,
  getPosDataCapture,
  getDataForSave,
  saveEntry,
  saveEntryEnd,
  saveFormData,
  getUsTaxInformationByPosNo,
  getDataSaveUsTaxInfo,
  checkDuplicatedTransType,
  initBusinessData,
  getPosPendingInfoByPosNo,
  updateDocumentByTransType,
  saveSnapshot,
  getSrvCase,
};
