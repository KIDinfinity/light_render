import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { currentVersionEWS } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, `currentVersionEWS`, currentVersionEWS);
  });
  return { ...nextState };
};
