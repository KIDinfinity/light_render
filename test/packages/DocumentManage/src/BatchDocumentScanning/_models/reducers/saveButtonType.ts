import { produce }  from 'immer';
import set from 'lodash/set';

export default (state: any, { payload }: any) => {
  const { type } = payload;
  const nextState = produce(state, (draftState) => {
    set(draftState, `type`, type);
  });

  return { ...nextState };
};
