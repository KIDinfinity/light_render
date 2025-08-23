import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { isLoading } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'proposalLoading', isLoading);
  });
  return { ...nextState };
};
