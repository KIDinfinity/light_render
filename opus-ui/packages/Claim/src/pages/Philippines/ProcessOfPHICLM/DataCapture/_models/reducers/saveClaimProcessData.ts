import lodash from 'lodash';
import { createNormalizeData } from '../../utils/normalizrUtils';
import { wholeEntities } from '../dto/EntriesModel';

const saveClaimProcessData = (state: any, action: any) => {
  const claimData = { ...action.payload };
  if (lodash.isEmpty(claimData.incidentList)) {
    claimData.incidentList = [];
  }

  if (!(claimData?.flags && lodash.get(claimData, 'flags', '').toString().indexOf('savePayeeInfo') !== -1)) {
    claimData.payeeList = [];
  }

  if (!claimData.insured) {
    claimData.insured = {};
  }

  if (!claimData.claimant) {
    claimData.claimant = {};
  }
  const result = createNormalizeData(claimData, wholeEntities);

  return {
    ...state,
    ...result,
  };
};

export default saveClaimProcessData;
