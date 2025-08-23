import lodash from 'lodash';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
import type { TData } from 'bpm/pages/Envoy/type';

interface IAction {
  payload: {
    type: TData;
    tplCtn: any;
  };
}
function addReminderList(prevReminder: any, cron: number) {
  const id = uuidv4();
  return {
    ...prevReminder,
    id,
    cron,
    reminderSequence: prevReminder.reminderSequence + 1,
    reminderIdx: prevReminder.reminderIdx + 1,
  };
}

function newReminderList(currentReminder: any, cronList: any) {
  if (lodash.isEmpty(cronList)) {
    return currentReminder;
  }
  return cronList.map((item: number, index: number) => {
    if (lodash.isEmpty(currentReminder[index])) {
      return addReminderList(currentReminder[index - 1], item);
    }
    return {
      ...currentReminder[index],
      cron: item,
    };
  });
}

const saveTplDetail = (state: any, { payload }: IAction) => {
  const { type, tplCtn } = payload;
  const newTplCtn = lodash.cloneDeep(tplCtn);
  const { groupId, id } = newTplCtn;
  return produce(state, (draftState: any) => {
    const { currentReasonGroups } = draftState;
    lodash.forEach(currentReasonGroups, (reasonGroup: any, groupIdx: number) => {
      if (reasonGroup?.id === groupId) {
        const reasonDetails = reasonGroup?.reasonDetails;
        if (type === 'reason') {
          lodash.forEach(reasonDetails, (reason: any, reasonIdx: number) => {
            if (reason?.id === id) {
              lodash.set(
                draftState.currentReasonGroups,
                `[${groupIdx}].reasonDetails[${reasonIdx}]]`,
                newTplCtn
              );
              if (
                draftState.reasonHaveMemoSubType[
                  lodash.get(
                    draftState.currentReasonGroups,
                    `[${groupIdx}].reasonDetails[${reasonIdx}]].subTypeCode`
                  )
                ]
              ) {
                const maxReminders = lodash.max(
                  lodash
                    .get(
                      draftState.currentReasonGroups,
                      `[${groupIdx}].reasonDetails[${reasonIdx}].pendingMemoList]`,
                      []
                    )
                    .filter((item: any) => item.memoCode)
                    .map(
                      (item: any) =>
                        draftState.listMemoSubType?.[
                          lodash.get(
                            draftState.currentReasonGroups,
                            `[${groupIdx}].reasonDetails[${reasonIdx}]].subTypeCode`
                          )
                        ]?.[item.memoCode]?.cron
                    )
                );

                lodash.set(
                  draftState.currentReasonGroups,
                  `[${groupIdx}].reasonDetails[${reasonIdx}]].reasonReminders`,
                  newReminderList(reason.reasonReminders, maxReminders)
                );
              }

              return false;
            }
          });
        } else {
          lodash.forEach(reasonDetails, (reason: any, reasonIdx: number) => {
            lodash.forEach(reason?.reasonReminders, (reminder: any, reminderIdx: number) => {
              if (reminder?.id === id) {
                lodash.set(
                  draftState.currentReasonGroups,
                  `[${groupIdx}].reasonDetails[${reasonIdx}].reasonReminders[${reminderIdx}]`,
                  newTplCtn
                );
                return false;
              }
            });
          });
        }
        return false;
      }
    });
  });
  // return saveTplDetailSync(newState, {
  //   type: 'saveTplDetailSync',
  //   payload: {
  //     name,
  //     value,
  //     groupId,
  //     id,
  //     type,
  //   },
  // });
};

export default saveTplDetail;
