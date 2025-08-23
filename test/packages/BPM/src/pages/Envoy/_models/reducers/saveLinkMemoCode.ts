import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import { produce } from 'immer';
import { getFieldName } from 'bpm/pages/Envoy/_utils/dataTransferFn';

interface IAction {
  payload: {
    groupId: string;
    dataId: string;
    name: string;
    value: string;
    reasonCode: string;
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

function newReminderList(currentReminder: any, pendingMemoList: any, currentCronList: any) {
  if (currentReminder.length === 0 || lodash.isEmpty(currentCronList)) {
    return currentReminder;
  }

  if (currentCronList[0] > currentReminder[0].cron || pendingMemoList.length === 1) {
    return currentCronList.map((item: number, index: number) => {
      if (lodash.isEmpty(currentReminder[index])) {
        return addReminderList(currentReminder[index - 1], item);
      }
      return {
        ...currentReminder[index],
        cron: item,
      };
    });
  }

  return currentReminder;
}

export default function saveLinkMemoCode(state: any, { payload }: IAction) {
  const { groupId, dataId, name, value, reasonCode } = payload;
  const path = getFieldName(name);
  return produce(state, (draftState: any) => {
    const { listMemos } = draftState;
    const memoDesc = lodash.find(listMemos?.[reasonCode],{memoCode: value})?.memoDesc;
    lodash.forEach(draftState.currentReasonGroups, (reasonGroup: any) => {
      if (reasonGroup?.id === groupId) {
        lodash.forEach(reasonGroup.reasonDetails, (reason: any) => {
          if (reason?.id === dataId) {
            lodash.set(reason, path, value);
            lodash.set(reason, `${path?.split('.')[0]}.subTypeCode`, null);
            lodash.set(reason, `${path?.split('.')[0]}.memoDesc`, memoDesc);
            lodash.set(
              reason,
              `${path?.split('.')[0]}.reminderCode`,
              draftState.listMemoSubType?.[reasonCode]?.[value]?.code
            );
            lodash.set(
              reason,
              'reasonReminders',
              newReminderList(
                reason.reasonReminders,
                reason.pendingMemoList,
                draftState.listMemoSubType?.[reasonCode]?.[value]?.cron
              )
            );
          }
        });
      }
    });
  });
}
