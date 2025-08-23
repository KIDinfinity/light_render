import lodash from 'lodash';
import { produce } from 'immer';

interface IAction {
  payload: {
    groupId: string;
    reasonId: string;
    enabelArr: string[];
  };
}

export default function saveReasonEnabelChannel(state: any, { payload }: IAction) {
  const { groupId, reasonId, enabelArr } = payload;

  return produce(state, (draftState: any) => {
    lodash.forEach(draftState.currentReasonGroups, (reasonGroup: any) => {
      if (reasonGroup?.id === groupId) {
        lodash.forEach(reasonGroup.reasonDetails, (reason: any) => {
          if (reason?.id === reasonId) {
            lodash.forEach(reason?.channelDataList, (item: any) => {
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
      }
    });
  });
}
