import { produce }  from 'immer';

export default (state: any, action: any) => {
  const { ntuDataObject } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.ntuDataObject = ntuDataObject;
  });

  return { ...nextState };
};
