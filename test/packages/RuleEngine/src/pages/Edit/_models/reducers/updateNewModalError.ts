import { produce }  from 'immer';

const updateNewModalError = (state: any, action: any) => {
  const { newModalError } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.newModalError = newModalError;
  });

  return { ...nextState };
};

export default updateNewModalError;
