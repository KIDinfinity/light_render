import { createNormalizeData } from '@/utils/claimUtils';
import { sortApIncidentDecisionList } from 'claim/pages/utils/taskUtils';
import { wholeEntities } from '../dto/EntriesModel';

const saveClaimProcessData = (state: any, action: any) => {
  const claimData = { ...action.payload };
  if (!claimData.incidentList) {
    claimData.incidentList = [];
  }
  if (!claimData.claimPayableList) {
    claimData.claimPayableList = [];
  }

  const result = createNormalizeData(claimData, wholeEntities);
  const newClaimPayableList = sortApIncidentDecisionList(result);
  if (result && result.claimProcessData) {
    result.claimProcessData.apIncidentDecisionList = newClaimPayableList;
  }

  return {
    ...state,
    ...result,
  };
};

export default saveClaimProcessData;
