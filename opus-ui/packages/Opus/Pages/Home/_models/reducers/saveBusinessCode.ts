import { produce } from 'immer';

export default (state: any, action: any) => {
  const { businessCode } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.businessCode = businessCode;
  });
  return { ...nextState };
};
