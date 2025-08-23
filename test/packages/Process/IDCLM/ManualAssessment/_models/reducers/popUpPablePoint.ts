/* eslint-disable no-param-reassign */

import { produce }  from 'immer';

const popUpPablePoint = (state: any, { payload }: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.popUpPablePoint = {
      ...draftState.popUpPablePoint,
      ...payload,
    };
  });

  return { ...nextState };
};

export default popUpPablePoint;
