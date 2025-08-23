import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const sustainabilityModalBtnVisible = lodash.get(
    action,
    'payload.sustainabilityModalBtnVisible',
    {}
  );
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'sustainabilityModalBtnVisible', sustainabilityModalBtnVisible);
  });
  return {
    ...nextState,
  };
};
