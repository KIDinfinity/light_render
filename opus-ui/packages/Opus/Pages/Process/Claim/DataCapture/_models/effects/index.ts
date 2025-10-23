import getClaim from './getClaim';
import getSnapshot from './getSnapshot';
import validateFields from './validateFields';
import getDataForSubmit from './getDataForSubmit';
import saveEntry from './saveEntry';
import saveEntryEnd from './saveEntryEnd';
import saveFormData from './saveFormData';
import getInsuredInfo from './getInsuredInfo';
import saveSnapshot from './saveSnapshot';
import checkRegisterMcs from './checkRegisterMcs';
import getAgentNoList from './getAgentNoList';
import getPolicyAgentInfo from './getPolicyAgentInfo';
import agentRefresh from './agentRefresh';
import getC360Data from './getC360Data';
import validateClaimType from './validateClaimType';
import searchName from './searchName';
import getPolicyList from './getPolicyList';
import getKLIPClaimNo from './getKLIPClaimNo';
import getPremBankAccount from './getPremBankAccount';
import getPopUpInfo from './getPopUpInfo';
import getPolicyAgent from './getPolicyAgent';
import saveBusinessProcess from './saveBusinessProcess';
import submitIntegration from './submitIntegration';
import getLifeJClaimId from './getLifeJClaimId';
import setIntegrationData from './setIntegrationData';
import getAccountHolderClientId from './getAccountHolderClientId';
import syncFieldData from './syncFieldData';
import getLifeJRefundInfo from './getLifeJRefundInfo';
import getprocedureList from './getprocedureList';
import getotherProcedureList from './getotherProcedureList';

import { getDrugsDetailList } from '../../../Components/Procedure/AntiCancerAndHormone/_models/effects';

export default {
  getClaim,
  getSnapshot,
  validateFields,
  getDataForSubmit,
  saveEntry,
  saveEntryEnd,
  saveFormData,
  getInsuredInfo,
  saveSnapshot,
  checkRegisterMcs,
  getAgentNoList,
  getPolicyAgentInfo,
  agentRefresh,
  getC360Data,
  validateClaimType,
  searchName,
  getPolicyList,
  getKLIPClaimNo,
  getPremBankAccount,
  getPopUpInfo,
  getPolicyAgent,
  saveBusinessProcess,
  submitIntegration,
  getLifeJClaimId,
  setIntegrationData,
  getAccountHolderClientId,
  syncFieldData,
  getLifeJRefundInfo,
  getprocedureList,
  getotherProcedureList,
  ...getDrugsDetailList,
};
