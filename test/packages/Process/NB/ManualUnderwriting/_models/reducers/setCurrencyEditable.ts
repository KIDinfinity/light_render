import { produce }  from 'immer';

export default (state: any, action: any) => {
  const { currencyEditable } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.currencyEditable = currencyEditable;
  });
  return { ...nextState };
};
