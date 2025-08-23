import { produce } from 'immer';
import lodash from 'lodash';

interface IPayload {
  name: string;
  value: string;
}

interface IPrams {
  payload: IPayload;
}

export default function savePreivewForm(state: any, { payload }: IPrams) {
  const { name, value, dataId, groupId, channelId } = payload;

  return produce(state, (draftState: any) => {
    lodash.forEach(draftState.currentReasonGroups, (reasonGroup: any) => {
      if (reasonGroup?.id === groupId) {
        lodash.forEach(reasonGroup.reasonDetails, (reason: any) => {
          if (reason?.id === dataId) {
            const channelIdx = lodash.findIndex(reason.channelDataList, { id: channelId });
            const params = lodash
              .chain(reason)
              .get(`channelDataList[${channelIdx}].content.params`, [])
              .map((item: any) => {
                if (item.name === name) {
                  return { ...item, value };
                }
                return item;
              })
              .value();

            lodash.set(reason, `channelDataList[${channelIdx}].content.params`, params);
          }
        });
      }
    });
  });
  return state;
}
