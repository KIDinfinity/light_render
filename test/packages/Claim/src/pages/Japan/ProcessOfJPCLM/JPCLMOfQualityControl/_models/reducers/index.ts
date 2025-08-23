import saveCurrentTab from './saveCurrentTab';
import saveClaimProcessData from './saveClaimProcessData';
import saveCurrentDocument from './saveCurrentDocument';
import saveDocumentList from './saveDocumentList';
import saveFormData from './saveFormData';
import clearClaimProcessData from './clearClaimProcessData';
import showConfirmModal from './showConfirmModal';
import hideConfirmModal from './hideConfirmModal';
import lockDocumentStatusChange from './lockDocumentStatusChange';
import unLockDocumentStatusChange from './unLockDocumentStatusChange';
import setDocumentStatusReceived from './setDocumentStatusReceived';
import addFormDataItem from './addFormDataItem';
import saveFormDataItem from './saveFormDataItem';
import deleteFormDataItem from './deleteFormDataItem';
import addSequence from './addSequence';
import clearSequence from './clearSequence';
import saveState from './saveState';
import saveReceiveDate from './saveReceiveDate';
import saveFormDataItemAuto from './saveFormDataItemAuto';
import checkValidators from './checkValidators';
import saveDoneBusinessCheck from './saveDoneBusinessCheck';
import saveExpectPolicy from './saveExpectPolicy';

export default {
  addFormDataItem,
  deleteFormDataItem,
  saveFormDataItem,

  saveCurrentTab,
  saveClaimProcessData,
  saveCurrentDocument,
  saveDocumentList,
  saveFormData,
  saveFormDataItemAuto,

  clearClaimProcessData,
  showConfirmModal,
  hideConfirmModal,
  lockDocumentStatusChange,
  unLockDocumentStatusChange,
  setDocumentStatusReceived,

  addSequence,
  clearSequence,
  saveState,
  saveReceiveDate,

  checkValidators,
  saveDoneBusinessCheck,
  saveExpectPolicy,
};
