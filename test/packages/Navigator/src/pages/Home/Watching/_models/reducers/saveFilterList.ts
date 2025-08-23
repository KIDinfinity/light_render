/* eslint-disable no-param-reassign */

import { produce } from 'immer';

const saveFilterList = (state: any, { payload }: any) => {
  const { list } = payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.filterList = list;
  });

  return { ...nextState };
};

export default saveFilterList;
