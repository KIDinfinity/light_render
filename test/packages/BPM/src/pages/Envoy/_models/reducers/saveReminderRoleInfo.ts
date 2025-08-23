import lodash from 'lodash';
import { produce } from 'immer';

interface IAction {
  payload: {
    data: any;
  };
}

export default function saveReminderRoleInfo(state: any, { payload }: IAction) {
  const { data } = payload;
  const { groupId, id } = data;
  return produce(state, (draftState: any) => {
    lodash.forEach(draftState.currentReasonGroups, (reasonGroup: any, groupIdx: number) => {
      if (reasonGroup?.id === groupId) {
        lodash.forEach(reasonGroup.reasonDetails, (reason: any, reasonIdx: number) => {
          lodash.forEach(reason?.reasonReminders, (reminder: any, reminderIdx: number) => {
            if (reminder?.id === id) {
              draftState.currentReasonGroups[groupIdx].reasonDetails[reasonIdx].reasonReminders[
                reminderIdx
              ] = data;
            }
          });
        });
      }
    });
  });
}
