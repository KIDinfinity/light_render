import { createNormalizeData } from '@/utils/claimUtils';
import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { handlePayableRemark } from 'claim/pages/utils/claimUtils';
import { wholeEntities } from '../dto/EntriesModel';
import TaskDefKey from 'enum/TaskDefKey';

const saveClaimProcessData = (state: any, action: any) => {
  const claimData = { ...action.payload };
  const systemCurrency = tenant.currency();
  if (!claimData.incidentList) {
    claimData.incidentList = [];
  }
  if (!claimData.claimPayableList) {
    claimData.claimPayableList = [];
  }
  if (!claimData.payeeList) {
    claimData.payeeList = [];
  }
  if (!claimData.claimPolicyPayableList) {
    claimData.claimPolicyPayableList = [];
  }
  const payoutCurrency = claimData?.claimDecision?.payoutCurrency || systemCurrency;
  const claimDecision = {
    ...claimData?.claimDecision,
    payoutCurrency: claimData?.claimDecision?.payoutCurrency || systemCurrency,
  };

  lodash.set(
    claimData,
    'policyAgent.agentName',
    `${claimData?.policyAgent?.surname || ''} ${claimData?.policyAgent?.givenName || ''}`
  );
  lodash.set(claimData, 'payoutCurrency', payoutCurrency);
  lodash.set(claimData, 'claimDecision', claimDecision);
  lodash.set(claimData, 'checkNumberRefresh', true);
  lodash.set(claimData, 'promptMessages', '');

  const result = createNormalizeData(claimData, wholeEntities);

  return {
    ...state,
    ...(claimData?.taskDefKey === TaskDefKey.HK_CLM_ACT003 ? handlePayableRemark(result) : result),
  };
};

export default saveClaimProcessData;
