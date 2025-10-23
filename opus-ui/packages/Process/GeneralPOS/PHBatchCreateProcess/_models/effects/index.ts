import getDataForSubmit from './getDataForSubmit';
import getPolicyInfoAsyncLoop from './getPolicyInfoAsyncLoop';
import policyInfoRemoteAsyncEnd from './policyInfoRemoteAsyncEnd';
import policyInfoRemoteAsyncStart from './policyInfoRemoteAsyncStart';
import saveSnapshot from './saveSnapshot';
import saveFormData from './saveFormData';
import saveEntry from './saveEntry';
import saveEntryEnd from './saveEntryEnd';
import changeTransactionTypes from './changeTransactionTypes';
import validateFields from './validateFields';

const effects = {
  getDataForSubmit,
  getPolicyInfoAsyncLoop,
  policyInfoRemoteAsyncEnd,
  policyInfoRemoteAsyncStart,
  saveSnapshot,
  saveFormData,
  saveEntry,
  saveEntryEnd,
  changeTransactionTypes,
  validateFields,
};

export default effects;
