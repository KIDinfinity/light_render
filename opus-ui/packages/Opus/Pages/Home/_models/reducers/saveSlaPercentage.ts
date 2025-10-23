import { produce } from 'immer';

export default (state: any, action: any) => {
  const { slaPercentage } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.slaPercentage = slaPercentage;
  });
  return { ...nextState };
};
