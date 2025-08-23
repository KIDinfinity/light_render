/* eslint-disable no-param-reassign */
import { produce }  from 'immer';

export default (state: any, action: any) =>
  produce(state, (draftState: any) => {
    const whiteObject = action?.payload?.whiteObject;
    draftState.processData = {
      ...whiteObject,
    };
    draftState.entities = {};
  });
