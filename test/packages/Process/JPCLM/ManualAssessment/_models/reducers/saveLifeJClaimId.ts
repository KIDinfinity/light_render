import { produce }  from 'immer';
import lodash from 'lodash';

const saveLifeJClaimId = (state: any, { payload }: any) => {
  const { id, incidentId, KLIPClaimNo } = payload;
  const nextState = produce(state, (draftState: any) => {
    const klipCaseInfoList =
      draftState.claimEntities?.incidentListMap?.[incidentId]?.klipCaseInfoList;
    lodash.forEach(klipCaseInfoList, (item: any) => {
      if (item.id === id) {
        item.klipClaimNo = KLIPClaimNo;
      }
    });
  });
  return { ...nextState };
};
export default saveLifeJClaimId;
