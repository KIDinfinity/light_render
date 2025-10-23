import lodash from 'lodash';
import { produce } from 'immer';

interface IAction {
  payload: {
    groupId: string;
    dataId: string;
    dataPath: string;
    value: string;
  };
}

export default function saveFreeFieldsOfSelectReminderData(state: any, { payload }: IAction) {
  const { groupId, dataId, dataPath, value } = payload;

  return produce(state, (draftState: any) => {
    lodash.forEach(draftState?.currentReasonGroups, (reasonGroup: any) => {
      if (reasonGroup?.id === groupId) {
        lodash.forEach(reasonGroup?.reasonDetails, (reason: any) => {
          lodash.forEach(reason?.reasonReminders, (reminder: any) => {
            if (reminder?.id === dataId) {
              reminder[dataPath] = value;
            }
          });
        });
      }
    });
  });
}
