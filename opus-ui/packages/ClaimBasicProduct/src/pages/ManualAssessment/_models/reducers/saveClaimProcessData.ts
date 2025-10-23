import { createNormalizeData } from '@/utils/claimUtils';
import { wholeEntities } from '../dto/EntriesModel';

const saveClaimProcessData = (state: any, action: any) => {
  const claimData = { ...action.payload };
  if (!claimData.incidentList) {
    claimData.incidentList = [];
  }
  if (!claimData.claimPayableList) {
    claimData.claimPayableList = [];
  }
  if (!claimData.payeeList) {
    claimData.payeeList = [];
  }
  const result = createNormalizeData(claimData, wholeEntities);

  return {
    ...state,
    ...result,
  };
};

export default saveClaimProcessData;
