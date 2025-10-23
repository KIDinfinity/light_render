import { produce } from 'immer';

export default (state: any, action: any) => {
  const { loadFacutativeInfoChangeFlag } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.loadFacutativeInfoChangeFlag = loadFacutativeInfoChangeFlag;
  });
  return { ...nextState };
};
