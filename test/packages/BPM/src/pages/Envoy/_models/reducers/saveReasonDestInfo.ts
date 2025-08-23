import lodash from 'lodash';
import { produce } from 'immer';

interface IAction {
  payload: {
    data: any;
  };
}

export default function saveReasonDestInfo(state: any, { payload }: IAction) {
  const { data } = payload;
  const { groupId, id } = data;
  return produce(state, (draftState: any) => {
    lodash.forEach(draftState.currentReasonGroups, (reasonGroup: any, groupIdx: number) => {
      if (reasonGroup?.id === groupId) {
        lodash.forEach(reasonGroup.reasonDetails, (reason: any, reasonIdx: number) => {
          if (reason?.id === id) {
            draftState.currentReasonGroups[groupIdx].reasonDetails[reasonIdx] = data;
          }
        });
      }
    });
  });
}
