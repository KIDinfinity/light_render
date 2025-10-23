import lodash from 'lodash';
import { produce } from 'immer';

interface IAction {
  payload: {
    groupId: string;
    dataId: string;
    policyIdx: number;
  };
}

export default function delReasonPolicy(state: any, { payload }: IAction) {
  const { groupId, dataId, policyIdx } = payload;
  return produce(state, (draftState: any) => {
    lodash.forEach(draftState.currentReasonGroups, (reasonGroup: any) => {
      if (reasonGroup?.id === groupId) {
        lodash.forEach(reasonGroup.reasonDetails, (reason: any) => {
          if (reason?.id === dataId) {
            reason.policy = reason?.policy?.filter((_: any, idx: number) => idx !== policyIdx);
          }
        });
      }
    });
  });
}
