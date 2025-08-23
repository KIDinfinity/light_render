/* eslint-disable no-param-reassign */
import { produce }  from 'immer';

export default (state: any, action: any) =>
  produce(state, (draftState: any) => {
    const { changedFields } = action.payload;

    draftState.claimProcessData = {
      ...draftState.claimProcessData,
      ...changedFields,
    };
  });
