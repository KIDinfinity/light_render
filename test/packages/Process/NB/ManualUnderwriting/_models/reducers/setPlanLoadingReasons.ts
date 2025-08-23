import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { planLoadingReasons } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'planLoadingReasons', planLoadingReasons);
  });

  return { ...nextState };
};
