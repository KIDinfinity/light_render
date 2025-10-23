import lodash from 'lodash';
import { colorsPond } from '@/utils/constant';
import { selsctColor } from '@/utils/claimUtils';

const saveClaimProcessDataCallback = (state) => {
  const { claimEntities } = state;
  const policyBackgrounds = {};
  const claimPayableListMap = lodash.get(claimEntities, 'claimPayableListMap', {});
  const claimPayableListEntries = Object.entries(claimPayableListMap);
  lodash.map(claimPayableListEntries, (item: any) => {
    if (item[1].policyNo && !policyBackgrounds[item[1].policyNo]) {
      policyBackgrounds[item[1].policyNo] = selsctColor(policyBackgrounds, colorsPond);
    }
  });

  return {
    ...state,
    policyBackgrounds,
  };
};

export default saveClaimProcessDataCallback;
