/* eslint-disable no-param-reassign */

import { produce } from 'immer';

const saveFilterReasonList = (state: any, { payload }: any) => {
  const { list } = payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.filterReasonList = list;
  });

  return { ...nextState };
};

export default saveFilterReasonList;
