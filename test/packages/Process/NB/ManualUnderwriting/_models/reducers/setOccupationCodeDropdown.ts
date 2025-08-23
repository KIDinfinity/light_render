import lodash from 'lodash';
import { produce }  from 'immer';

export default (state: any, action: any) => {
  const { occupationCodeDicts } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'occupationCodeDicts', occupationCodeDicts);
  });
  return {
    ...nextState,
  };
};
