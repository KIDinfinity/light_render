import lodash from 'lodash';
import { produce } from 'immer';

interface IAction {
  payload: {
    groupId: string;
    dataId: string;
  };
}

export default function saveReasonAttachment(state: any, { payload }: IAction) {
  const { groupId, dataId } = payload;
  return produce(state, (draftState: any) => {
    lodash.forEach(draftState.currentReasonGroups, (reasonGroup: any) => {
      if (reasonGroup?.id === groupId) {
        lodash.forEach(reasonGroup.reasonDetails, (reason: any) => {
          if (reason?.id === dataId) {
            reason.attachment?.push('');
          }
        });
      }
    });
  });
}
