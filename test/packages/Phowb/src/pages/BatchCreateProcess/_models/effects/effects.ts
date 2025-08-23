import getPolicyInfo from './getPolicyInfo';
import getTransactionTypes from './getTransactionTypes';
import changeSelectedTransactionTypes from './changeSelectedTransactionTypes';
import getProcessByCaseCategory from './getProcessByCaseCategory';
import addProcess from './addProcess';
import removeProcess from './removeProcess';
import getDataForSave from './getDataForSave';
import getDataFromSnapshot from './getDataFromSnapshot';
import setMainData from './setMainData';
import changePosRequestInformation from './changePosRequestInformation';
import validate from './validate';
import getDataForSubmit from './getDataForSubmit';
import saveEntry from './saveEntry';
import saveEntryEnd from './saveEntryEnd';
import saveFormData from './saveFormData';
import saveSnapshot from './saveSnapshot';

const effects = {
  getPolicyInfo,
  getTransactionTypes,
  changeSelectedTransactionTypes,
  getProcessByCaseCategory,
  addProcess,
  removeProcess,
  getDataForSave,
  getDataFromSnapshot,
  setMainData,
  changePosRequestInformation,
  validate,
  getDataForSubmit,
  saveEntry,
  saveEntryEnd,
  saveFormData,
  saveSnapshot,
};

export default effects;
