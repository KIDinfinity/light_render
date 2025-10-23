import { produce } from 'immer';

type TAction = {
  type: any;
  payload: {
    clientNameDicts: any[];
  };
};

export default (state: any, action: TAction) => {
  const { clientNameDicts } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.clientNameDicts = clientNameDicts;
  });
  return { ...nextState };
};
