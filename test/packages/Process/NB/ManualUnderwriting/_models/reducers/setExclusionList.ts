import { produce }  from 'immer';

export default (state: any, action: any) => {
  const { exclusionList } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.exclusionList = {
      ...draftState.exclusionList,
      ...exclusionList
    };
  });
  return { ...nextState };
};
