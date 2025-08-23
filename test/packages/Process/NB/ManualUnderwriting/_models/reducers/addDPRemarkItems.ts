import { produce }  from 'immer';
import lodash from 'lodash';
import { v4 as uuid } from 'uuid';

export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'addDPRemarkItems', [
      ...state.addDPRemarkItems,
      {
        id: uuid(),
      },
    ]);
  });
  return { ...nextState };
};
