import lodash from 'lodash';
import { produce }  from 'immer';

export default (state: any, action: any) => {
  const { occupationFullList } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'occupationFullList', occupationFullList);
  });
  return {
    ...nextState,
  };
};
