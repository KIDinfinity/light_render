/* eslint-disable no-param-reassign */
import { produce }  from 'immer';

const saveRoomTypeDict = (state: any, { payload }: any) => {
  const { roomTypeDict } = payload;

  return produce(state, (draftState: any) => {
    draftState.roomTypeDict = roomTypeDict;
  });
};

export default saveRoomTypeDict;
