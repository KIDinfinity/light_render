import lodash from 'lodash';
import { produce } from 'immer';

interface IAction {
  payload: {
    groupId: string;
    reminderId: string;
    enabelArr: string[];
  };
}

export default function saveReminderEnabelChannel(state: any, { payload }: IAction) {
  const { groupId, reminderId, enabelArr } = payload;

  return produce(state, (draftState: any) => {
    lodash.forEach(draftState.currentReasonGroups, (reasonGroup: any) => {
      if (reasonGroup?.id === groupId) {
        lodash.forEach(reasonGroup.reasonDetails, (reason: any) => {
          lodash.forEach(reason?.reasonReminders, (reminder: any) => {
            if (reminder?.id === reminderId) {
              lodash.forEach(reminder?.channelDataList, (item: any) => {
                if (lodash.includes(enabelArr, item.channel)) {
                  // eslint-disable-next-line no-param-reassign
                  item.enable = true;
                } else {
                  // eslint-disable-next-line no-param-reassign
                  item.enable = false;
                }
              });
            }
          });
        });
      }
    });
  });
}
