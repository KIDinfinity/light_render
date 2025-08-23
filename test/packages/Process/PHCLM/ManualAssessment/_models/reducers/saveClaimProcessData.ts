import { createNormalizeData } from '@/utils/claimUtils';
import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { handlePayableRemark } from 'claim/pages/utils/claimUtils';
import { wholeEntities } from '../dto/EntriesModel';
import loadAppealPayables from './loadAppealPayables';

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
  const adjustClaimPayableList = result.claimProcessData?.claimAppealOriginalCase?.adjustClaimPayableList;
  // updatePayables 代表我们是否接受saveClaimProcessData调用者提供的claimPayable数据，如果为false（默认情况下），我们都不接受，而是会优先去覆盖
  if(adjustClaimPayableList) {
    loadAppealPayables(result, { ignoreParsedMark: !action.updatePayables })
  }

  return {
    ...state,
    ...handlePayableRemark(result),
  };
};

export default saveClaimProcessData;
