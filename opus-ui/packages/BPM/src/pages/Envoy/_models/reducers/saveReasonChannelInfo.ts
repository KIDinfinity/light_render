import lodash from 'lodash';
import { produce } from 'immer';

interface IAction {
  payload: {
    groupId: string;
    dataId: string;
    channelIdx: string;
    ctnKey: string;
    infoValue: string;
  };
}

export default function saveReasonChannelInfo(state: any, { payload }: IAction) {
  const { groupId, dataId, channelIdx, ctnKey, infoValue } = payload;
  return produce(state, (draftState: any) => {
    lodash.forEach(draftState.currentReasonGroups, (reasonGroup: any) => {
      if (reasonGroup?.id === groupId) {
        lodash.forEach(reasonGroup.reasonDetails, (reason: any) => {
          if (reason?.id === dataId) {
            lodash.set(reason, `channelDataList[${channelIdx}].content.info.${ctnKey}`, infoValue);
          }
        });
      }
    });
  });
}
