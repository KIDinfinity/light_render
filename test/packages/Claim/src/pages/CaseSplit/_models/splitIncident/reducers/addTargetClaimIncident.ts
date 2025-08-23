import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload: { id } }: any) => {
  const nextState = produce(state, (draftState: any) => {
    // 添加 target incident
    draftState.targetClaimEntities.incidentListMap[id] =
      draftState.originClaimEntities.incidentListMap?.[id];
    draftState.targetClaimProcessData.incidentList = [
      ...draftState.targetClaimProcessData.incidentList,
      id,
    ];

    // 删除 origin incident
    delete draftState.originClaimEntities.incidentListMap?.[id];
    draftState.originClaimProcessData.incidentList = lodash.filter(
      draftState.originClaimProcessData.incidentList,
      (ids: any) => ids !== id
    );
  });
  return { ...nextState };
};
