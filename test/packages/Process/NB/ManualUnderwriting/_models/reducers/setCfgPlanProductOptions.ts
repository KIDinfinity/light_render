import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const cfgPlanProductOptions = lodash.get(action, 'payload.cfgPlanProductOptions', {});
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'cfgPlanProductOptions', cfgPlanProductOptions);
  });
  return {
    ...nextState,
  };
};
