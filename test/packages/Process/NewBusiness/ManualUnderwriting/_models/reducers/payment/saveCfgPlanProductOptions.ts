import { produce } from 'immer';

export default (state: any, { payload }: any) => {
  const { cfgPlanProductOptions } = payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.cfgPlanProductOptions = cfgPlanProductOptions;
  });
  return {
    ...nextState,
  };
};
