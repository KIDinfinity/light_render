import { produce }  from 'immer';

export default (state: any, action: any) => {
  const { totalError } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.totalError = totalError;
  });
  return {
    ...nextState,
  };
};
