import { produce }  from 'immer';

export default (state: any, action: any) => {
  const { allBank } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.allBank = allBank;
  });
  return { ...nextState };
};
