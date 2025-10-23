import { createNormalizeData } from '@/utils/claimUtils';
import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { handlePayableRemark } from 'claim/pages/utils/claimUtils';
import { wholeEntities } from '../dto/EntriesModel';
import { getClaimPayableGroupList } from '../functions';

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
  lodash.set(claimData, 'payoutCurrency', payoutCurrency);
  lodash.set(claimData, 'claimDecision', claimDecision);
  lodash.set(claimData, 'checkNumberRefresh', true);

  const result = createNormalizeData(claimData, wholeEntities);

  const claimPayableGroupList = getClaimPayableGroupList(result);

  return {
    ...state,
    claimPayableGroupList,
    ...handlePayableRemark(result, claimPayableGroupList),
  };
};

export default saveClaimProcessData;
