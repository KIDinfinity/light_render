import lodash from 'lodash';
import { createNormalizeData } from '@/utils/claimUtils';
import { safeParseUtil } from '@/utils/utils';
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
  const result = createNormalizeData(lodash.cloneDeep(claimData), wholeEntities);
  const originCase = safeParseUtil(
    lodash.get(claimData, 'claimAppealOriginalCase.originalClaimData')
  );

  return {
    ...state,
    ...result,
    originCase: {
      ...createNormalizeData(originCase, wholeEntities),
    },
  };
};

export default saveClaimProcessData;
