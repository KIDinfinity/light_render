import { produce } from 'immer';

export default (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.otherProcedureModal = {
      ...draftState.otherProcedureModal,
      ...action.payload,
    };
  });

  return { ...nextState };
};
