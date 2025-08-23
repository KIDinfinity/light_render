import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const policyListUpdate = (state: any, action: any) => {
  const { policyList } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.policyList = policyList;
    lodash.forEach(draftState?.claimEntities?.incidentListMap, (item, id) => {
      lodash.forEach(item?.klipCaseInfoList, (klip, index) => {
        if (!lodash.includes(policyList, formUtils.queryValue(klip?.policyId))) {
          draftState.claimEntities.incidentListMap[id].klipCaseInfoList[index].policyId = '';
        }
      });
    });
  });

  return { ...nextState };
};

export default policyListUpdate;
