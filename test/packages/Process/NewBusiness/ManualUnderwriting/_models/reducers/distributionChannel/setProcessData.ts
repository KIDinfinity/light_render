import { produce } from 'immer';

type TAction = {
  type: any;
  payload: {
    processData: any;
  };
};

export default (state: any, action: TAction) => {
  const { processData } = action.payload;
  console.log('saveProcessData', processData);
  const old = state.modalData.processData;
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.processData = { ...old, ...processData };
  });
  return { ...nextState };
};
