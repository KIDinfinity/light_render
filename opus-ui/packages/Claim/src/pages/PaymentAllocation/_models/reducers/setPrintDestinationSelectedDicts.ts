import { produce } from 'immer';

const setPrintDestinationSelectedDicts = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { printDestinationSelectedDicts } = action.payload;
    draftState.printDestinationSelectedDicts = printDestinationSelectedDicts;
  });
  return { ...nextState };
};

export default setPrintDestinationSelectedDicts;
