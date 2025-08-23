import { produce } from 'immer';
import lodash from 'lodash';

const setMarkinId = (state: any, { payload }: any) => {
  const { markinId } = payload;

  return produce(state, (draftState: any) => {
    if (lodash.isNil(markinId)) return;

    draftState.claimProcessData.markinId = markinId;
  });
};

export default setMarkinId;
