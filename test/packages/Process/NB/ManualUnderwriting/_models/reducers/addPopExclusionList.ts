import { produce }  from 'immer';
import {v4 as uuidv4 } from 'uuid';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const id = uuidv4();
  const { addPopExclusionList } = state;
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'addPopExclusionList', [
      ...addPopExclusionList,
      {
        id,
      },
    ]);
  });
  return {
    ...nextState,
  };
};
