/* eslint-disable no-param-reassign */
import { produce }  from 'immer';

const saveRoomTypeDict = (state: any, { payload }: any) => {
  const { treatmentId } = payload;

  return produce(state, (draftState: any) => {
    draftState.roomTypeDict = [];
    delete draftState.claimEntities.treatmentListMap[treatmentId].roomType;
  });
};

export default saveRoomTypeDict;
