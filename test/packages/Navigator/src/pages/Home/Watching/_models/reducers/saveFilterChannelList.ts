/* eslint-disable no-param-reassign */

import { produce } from 'immer';

const saveFilterChannelList = (state: any, { payload }: any) => {
  const { list } = payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.filterChannelList = list;
  });

  return { ...nextState };
};

export default saveFilterChannelList;
