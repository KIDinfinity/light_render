import { produce } from 'immer';

export default (state: any, action: any) => {
  const { sustainabilityValidate } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.sustainabilityValidate = sustainabilityValidate;
  });
  return {
    ...nextState,
  };
};
