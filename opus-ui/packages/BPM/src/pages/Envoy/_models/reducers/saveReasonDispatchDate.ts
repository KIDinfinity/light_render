import lodash from 'lodash';
import { produce } from 'immer';

interface IAction {
  payload: {
    groupId: string;
    dataId: string;
    dispatchDate: string;
  };
}

export default function saveReasonDispatchDate(state: any, { payload }: IAction) {
  const { groupId, dataId, dispatchDate } = payload;

  return produce(state, (draftState: any) => {
    lodash.forEach(draftState.currentReasonGroups, (reasonGroup: any) => {
      if (reasonGroup?.id === groupId) {
        lodash.forEach(reasonGroup.reasonDetails, (reason: any) => {
          if (reason?.id === dataId) {
            reason.dispatchDate = dispatchDate;
          }
        });
      }
    });
  });
}
