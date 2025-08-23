import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload: { id } }: any) => {
  const nextState = produce(state, (draftState: any) => {
    // 添加 origin incident
    draftState.originClaimEntities.incidentListMap[id] =
      draftState.targetClaimEntities.incidentListMap?.[id];
    draftState.originClaimProcessData.incidentList = [
      ...draftState.originClaimProcessData.incidentList,
      id,
    ];

    // 删除 target incident
    delete draftState.targetClaimEntities.incidentListMap?.[id];
    draftState.targetClaimProcessData.incidentList = lodash.filter(
      draftState.targetClaimProcessData.incidentList,
      (ids: any) => ids !== id
    );
  });
  return { ...nextState };
};
