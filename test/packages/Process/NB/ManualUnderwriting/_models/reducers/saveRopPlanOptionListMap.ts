import { produce }  from 'immer';

export default (state: any, action: any) => {
  const { ropPlanOptionListMap } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.ropPlanOptionListMap = ropPlanOptionListMap;
  });
  return { ...nextState };
};
