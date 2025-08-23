/* eslint-disable no-param-reassign */
import { produce } from 'immer';

export default (state: any, { payload }: any) => {
  const { id } = payload;

  return produce(state, (draftState: any) => {
    draftState.selectedPayeeId = id;
  });
};
